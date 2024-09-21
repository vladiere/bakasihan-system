import express from "express";
import { createUser,loginUser,Token,logout } from "../controllers/auth.controller";
import verifyToken from '../utils/verifyToken.util';
const auth = express.Router();

auth.post('/register',createUser)
auth.post('/login',loginUser)
auth.post('/refresh-token',Token)
auth.post('/logout',verifyToken,logout)

export default auth

