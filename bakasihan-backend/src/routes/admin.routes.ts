import express from "express";
import verifyToken from '../utils/verifyToken.util';
import { insertProduct,
    insertProductCategory,
    adminGetAllProductsCategories,
    adminGetAllProducts,
    insertCustomerTables,
    adminCustomersTable,
    adminNewOrdersUnpaid,
    adminNewOrdersPaid,
    adminGetAllItemsCategories,
    checkOutOrder,
    adminGetAllItems,
    insertItemCategory,
    insertItems,
    getAdminItemDistictCategory,
    adminGetAllDataDashBoardRequired
 } from "../controllers/admin.controller";
import { upload } from "../middleware/uploadImage.middleware";
const admin = express.Router();

admin.get('/adminGetAllProductsCategories',verifyToken,adminGetAllProductsCategories)
admin.get('/adminGetAllItemsCategories',verifyToken,adminGetAllItemsCategories)
admin.get('/adminGetAllItems',verifyToken,adminGetAllItems)
admin.get('/adminGetAllProducts',verifyToken,adminGetAllProducts)
admin.get('/adminNewOrdersUnpaid',verifyToken,adminNewOrdersUnpaid)
admin.get('/adminGetAllDataDashBoardRequired',verifyToken,adminGetAllDataDashBoardRequired)
admin.get('/adminNewOrdersPaid',verifyToken,adminNewOrdersPaid)
admin.get('/getAdminItemDistictCategory',verifyToken,getAdminItemDistictCategory)
admin.get('/adminCustomersTable',verifyToken,adminCustomersTable)
admin.post('/insertProduct',upload.single('product_image'),verifyToken,insertProduct)
admin.post('/insertItems',upload.single('item_picture'),verifyToken,insertItems)
admin.post('/insertProductCategory',verifyToken,insertProductCategory)
admin.post('/insertItemCategory',verifyToken,insertItemCategory)
admin.post('/insertCustomerTables',verifyToken,insertCustomerTables)
admin.post('/checkOutOrder',verifyToken,checkOutOrder)

export default admin