import express from "express";
import { userGetProductCategories,userGetProducts } from "../controllers/user.controller";
const user = express.Router();

user.post('/userGetProducts',userGetProducts)
user.post('/userGetProductCategories',userGetProductCategories)

export default user;
