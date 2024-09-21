import jwt from 'jsonwebtoken'
import executeQuery from "./executeQuery.util";
import config from "./config.util";



export const generateRefreshToken = async(thisid:number)=>{
    try {
        const refreshToken = jwt.sign(
            { id: thisid },
            config.server.token.refreshSecret,
            { expiresIn: config.server.token.refreshTokenExpireTime }
        );
    
    
        const insertRefreshTokenQuery = 'INSERT INTO refresh_token(user_id, refresh_token) VALUES (?, ?)';
        await executeQuery(insertRefreshTokenQuery, [thisid, refreshToken]);
    
        return refreshToken;
    } catch (error) {
        console.error('Error generating refresh token:', error);
        throw error; // or handle the error as needed
    }
    
}

export const generateAccessToken = (thisid:number)=>{
    return jwt.sign(
        {id:thisid},config.server.token.accessSecret,
        {expiresIn:config.server.token.accessTokenExpireTime}
    );
}

export const getRefreshTokenValue = (token:string)=>{
    return jwt.verify(token,config.server.token.refreshSecret)
}