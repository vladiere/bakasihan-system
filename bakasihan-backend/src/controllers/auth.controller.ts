import executeQuery from '../utils/executeQuery.util';
import { Request,Response } from "express";
import bcrypt from 'bcryptjs'
import { userRegT,userLoginT,userDataT } from '@/types/users.types';
import { generateAccessToken,generateRefreshToken,getRefreshTokenValue } from '../utils/generateToken.util';
import { JwtPayload } from 'jsonwebtoken';


export const createUser = async(req:Request,res:Response)=>{
    try {
        const CheckingQuery = 'Select username from user_tbl Where username = ?';
        const insertQuery = 'INSERT INTO user_tbl(username,password)VALUES(?,?)';
        const insertUserInfoQuery = "INSERT INTO userinfo_tbl(user_id,first_name,last_name,gender)VALUES(?,?,?,?)"
        const {username,password,confirm_password,first_name,last_name,gender}:userRegT = req.body;
        if(password !== confirm_password){
            return res.status(403).send({message:"Passwords Doesnot Match"});
        }
        const [existUser] = await executeQuery(CheckingQuery,[username]) as Array<userDataT>;
        if(existUser){
            return res.status(403).send({message:"Username is Already in use"});
        }else{

        if (!password) {
              throw new Error("Password is undefined or null.");
        }
            
        const hashedPassword = await bcrypt.hash(password, 10);
            
        const [response] = await executeQuery(insertQuery,[username,hashedPassword]) as Array<any>
        if(response){
            await executeQuery(insertUserInfoQuery,[response.insertedID,first_name,last_name,gender])
            return res.status(201).send({message:"User Created Successfully"});
        }
        }
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const CheckingQuery = 'SELECT id, username, password, status FROM user_tbl WHERE username = ?';
        const { username, password }: userLoginT = req.body;
        const [user] = await executeQuery(CheckingQuery, [username]) as Array<userDataT>;

        if (!user) {
            return res.status(409).send({ message: "User does not exist!" });
        }

        const isPasswordValid = await bcrypt.compare(password.toString(), user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Password is incorrect" });
        }

        const thisaccessToken = generateAccessToken(user.id);
        const thisrefreshToken = await generateRefreshToken(user.id);

        return res.status(200).send({
            message: 'Login Successful',
            accessToken:thisaccessToken,
            refreshToken:thisrefreshToken,
            user: {
                username: user.username,
            }
        });
    } catch (error) {
        console.error("Database Error: ", error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
};
export const Token = async(req:Request,res:Response)=>{
    try {
        const {refreshToken} = req.body;
        const checkTokenQuery = 'SELECT refresh_token FROM refresh_token WHERE refresh_token = ?'
        const getToken = await executeQuery(checkTokenQuery,[refreshToken]);

        if(!getToken){
            return res.status(404).send({message:'Token Invalid'})
        }
        const decoded = getRefreshTokenValue(refreshToken);
        
        if (typeof decoded === 'string') {
            return res.status(400).send({ message: 'Invalid token format' });
        }

        const payload = decoded as JwtPayload;
        const accessToken = generateAccessToken(payload.id);

        const CheckingQuery = 'SELECT id, username, password, status FROM user_tbl WHERE id = ?';
        const [user] = await executeQuery(CheckingQuery, [payload.id]) as Array<userDataT>;
        if(!accessToken){
            return res.status(404).send({message:'Error Generating AccessToken'})
        }
        return res.status(201).send({
            message: 'Access Token Generated Successfully',
            accessToken:accessToken,
            user: {
                username: user.username,
            }
        })

    } catch (error) {
        console.error("Database Error: ", error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}

export const logout = async(req:Request,res:Response)=>{
    try {
        const userAuth = req.body.user;
        const DeleteQuery = 'DELETE FROM refresh_token WHERE user_id = ?'
        const result = await executeQuery(DeleteQuery,[userAuth.id]);
        if(!result){
            return res.status(404).send({message:'User Not Found'})
        }
        return res.status(200).send({message:'User Successfully Logout'})
    } catch (error) {
        console.error("Database Error: ", error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const getMyProfile = async (req:Request,res:Response)=>{
    try {
        const userAuth = req.body.user;
        const getQuery = `SELECT a.id,a.username,a.status,b.first_name, b.last_name, b.gender FROM user_tbl a LEFT OUTER JOIN userinfo_tbl b ON b.user_id = a.id WHERE a.id = ?`
        const [userData] = await executeQuery(getQuery,[userAuth.id]) as Array<any>

        // Send the paginated results along with total records
        return res.status(200).send({
            userData
        });
    } catch (error) {
        console.error("Database Error: ", error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const UpdateProfile = async(req:Request,res:Response) =>{
    try {
        const userAuth = req.body.user
        const {password,confirm_password,first_name,last_name,gender} = req.body
        const checkQuery = "SELECT password FROM user_tbl WHERE id = ?"
        const checkUserInfoQuery = "SELECT user_id,first_name,last_name,gender FROM userinfo_tbl WHERE user_id = ?"
        const updatePasswordQuery = "UPDATE user_tbl SET password = ? WHERE id = ?"
        const insertQuery = "INSERT INTO userinfo_tbl(user_id,first_name,last_name,gender)VALUES(?,?,?,?)"
        const updateUserinfoQuery = "UPDATE userinfo_tbl SET first_name = ?,last_name = ?,gender = ? WHERE user_id = ?"
        const [userData] = await executeQuery(checkQuery,[userAuth.id]) as Array<any> 
        if(password && confirm_password){
            if(password !== confirm_password){
                return res.status(403).send({message:"Passwords Doesnot Match"});
            }
            const isPasswordValid = await bcrypt.compare(password.toString(), userData.password);
            if (isPasswordValid) {
                return res.status(409).send({ message: "Password Should not be the same with the older one" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newRes = await executeQuery(updatePasswordQuery,[hashedPassword,userAuth.id])
            if(!newRes){
                return res.status(409).send({message:"Error Updating Password"})
            }
        }
        const userInfo = await executeQuery(checkUserInfoQuery,[userAuth.id]) as Array<any>
        if(userInfo.length === 0){
            const result = await executeQuery(insertQuery,[userAuth.id,first_name,last_name,gender])
            if(result){
                return res.status(200).send({message:"Information Successfully Inserted"})
            }
        }else{
            const result = await executeQuery(updateUserinfoQuery,[first_name,last_name,gender,userAuth.id])
            if(result){
                return res.status(200).send({message:"Information Successfully Updated"})
            }
        }
    } catch (error) {
        console.error("Database Error: ", error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}