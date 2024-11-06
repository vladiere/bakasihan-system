import express from "express";
import { createUser,loginUser,Token,logout, getMyProfile, UpdateProfile } from "../controllers/auth.controller";
import verifyToken from '../utils/verifyToken.util';
const auth = express.Router();

auth.post('/register',createUser)
auth.post('/login',loginUser)
auth.post('/refresh-token',Token)
auth.post('/logout',verifyToken,logout)
auth.post('/getMyProfile',verifyToken,getMyProfile)
auth.post('/UpdateProfile',verifyToken,UpdateProfile)

export default auth

