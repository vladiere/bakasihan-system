import express from "express";
import verifyToken from '../utils/verifyToken.util';
import { insertProduct,insertProductCategory,adminGetAllProductsCategories } from "../controllers/admin.controller";
import { upload } from "../middleware/uploadImage.middleware";
const admin = express.Router();

admin.get('/adminGetAllProductsCategories',verifyToken,adminGetAllProductsCategories)
admin.post('/insertProduct',upload.single('product_image'),verifyToken,insertProduct)
admin.post('/insertProductCategory',verifyToken,insertProductCategory)

export default admin