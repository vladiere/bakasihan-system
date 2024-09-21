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
        const {username,password,confirm_password}:userRegT = req.body;
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
            
        const response = await executeQuery(insertQuery,[username,hashedPassword]);
        if(response){
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