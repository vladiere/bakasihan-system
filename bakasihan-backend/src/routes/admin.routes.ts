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
    adminGetAllDataDashBoardRequired,
    adminOrderHistoryData,
    emptyTable,
    addQuantity,
    subtractQuantity,
    updateItems,
    deleteItems,
    deleteItemsCategory,
    deleteProduct,
    updateProducts,
    deleteProductCategory,
    AdminAllCustomerTable,
    deleteTable,
    AdminList,
    deleteUser,
    updateRole,
    getAdminItemAll
 } from "../controllers/admin.controller";
import { upload } from "../middleware/uploadImage.middleware";
const admin = express.Router();

admin.get('/adminGetAllProductsCategories',verifyToken,adminGetAllProductsCategories)
admin.get('/adminGetAllItemsCategories',verifyToken,adminGetAllItemsCategories)
admin.get('/adminGetAllItems',verifyToken,adminGetAllItems)
admin.get('/adminOrderHistoryData',verifyToken,adminOrderHistoryData)
admin.get('/adminGetAllProducts',verifyToken,adminGetAllProducts)
admin.get('/AdminAllCustomerTable',verifyToken,AdminAllCustomerTable)
admin.get('/adminNewOrdersUnpaid',verifyToken,adminNewOrdersUnpaid)
admin.get('/adminGetAllDataDashBoardRequired',verifyToken,adminGetAllDataDashBoardRequired)
admin.get('/adminNewOrdersPaid',verifyToken,adminNewOrdersPaid)
admin.get('/AdminList',verifyToken,AdminList)
admin.get('/getAdminItemAll',verifyToken,getAdminItemAll)
admin.get('/getAdminItemDistictCategory',verifyToken,getAdminItemDistictCategory)
admin.get('/adminCustomersTable',verifyToken,adminCustomersTable)
admin.post('/insertProduct',upload.single('product_image'),verifyToken,insertProduct)
admin.post('/updateProducts',upload.single('product_image'),verifyToken,updateProducts)
admin.post('/insertItems',upload.single('item_picture'),verifyToken,insertItems)
admin.post('/updateItems',upload.single('item_picture'),verifyToken,updateItems)
admin.post('/insertProductCategory',verifyToken,insertProductCategory)
admin.post('/insertItemCategory',verifyToken,insertItemCategory)
admin.post('/emptyTable',verifyToken,emptyTable)
admin.post('/insertCustomerTables',verifyToken,insertCustomerTables)
admin.post('/checkOutOrder',verifyToken,checkOutOrder)
admin.post('/subtractQuantity',verifyToken,subtractQuantity)
admin.post('/addQuantity',verifyToken,addQuantity)
admin.post('/deleteItems',verifyToken,deleteItems)
admin.post('/deleteItemsCategory',verifyToken,deleteItemsCategory)
admin.post('/deleteProduct',verifyToken,deleteProduct)
admin.post('/deleteProductCategory',verifyToken,deleteProductCategory)
admin.post('/deleteTable',verifyToken,deleteTable)
admin.post('/deleteUser',verifyToken,deleteUser)
admin.post('/updateRole',verifyToken,updateRole)

export default admin