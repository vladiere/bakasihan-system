import express from "express";
import { userGetProductCategories,userGetProducts,userCustomersTable,addUserOrder,userReciept,userCheckIfTheresSameOrderID, goBackToIndex } from "../controllers/user.controller";
const user = express.Router();

user.get('/userGetProducts',userGetProducts)
user.get('/userCustomersTable',userCustomersTable)
user.post('/userGetProductCategories',userGetProductCategories)
user.post('/addUserOrder',addUserOrder)
user.post('/userReciept',userReciept)
user.post('/userCheckIfTheresSameOrderID',userCheckIfTheresSameOrderID)
user.post('/goBackToIndex',goBackToIndex)

export default user;
