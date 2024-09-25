import express from "express";
import { userGetProductCategories,userGetProducts } from "../controllers/user.controller";
const user = express.Router();

user.get('/userGetProducts',userGetProducts)
user.post('/userGetProductCategories',userGetProductCategories)

export default user;
