import express from "express";
import verifyToken from '../utils/verifyToken.util';
import { insertProduct,
    insertProductCategory,
    adminGetAllProductsCategories,
    adminGetAllProducts,
    insertCustomerTables,
    adminCustomersTable
 } from "../controllers/admin.controller";
import { upload } from "../middleware/uploadImage.middleware";
const admin = express.Router();

admin.get('/adminGetAllProductsCategories',verifyToken,adminGetAllProductsCategories)
admin.get('/adminGetAllProducts',verifyToken,adminGetAllProducts)
admin.get('/adminCustomersTable',verifyToken,adminCustomersTable)
admin.post('/insertProduct',upload.single('product_image'),verifyToken,insertProduct)
admin.post('/insertProductCategory',verifyToken,insertProductCategory)
admin.post('/insertCustomerTables',verifyToken,insertCustomerTables)

export default admin