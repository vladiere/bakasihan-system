import executeQuery from '../utils/executeQuery.util';
import { getAllProductsCategories,
    getAllAdminProducts,
     getAllCustomerTable, 
     getAdminAllNewOrdersUnpaid, 
     getAdminAllNewOrdersPaid,
     getAllItemsCategories,
     getAllItems,
     getAllDataDashBoardRequired,
     getOrderHistoryData,
     getAdminCustomerTable,
     getAdminList
    } from '../service/recycledFunc.service';
import { Request,Response } from "express";
import { ItemsDataT } from '@/types/items.types';

type categories = {
    category_name:string
}
export const deleteProductCategory = async(req:Request,res:Response)=>{
    try {
        const {id} = req.body
        const deleteQuery = "DELETE FROM product_categories_tbl WHERE id = ?"
        const deleteProductQuery = "DELETE FROM products_tbl WHERE category_id = ?"
        await executeQuery(deleteQuery,[id]).then(async()=>{
            const result = await executeQuery(deleteProductQuery,[id])
            if(result){
        return res.status(200).send({ message: "Successfully deleted." });
            }
        })
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const deleteProduct =async (req:Request,res:Response ) => {
    try {
        const {id} = req.body
        const deleteQuery = "DELETE FROM products_tbl WHERE id = ?"
        const result = await executeQuery(deleteQuery,[id])
        if(result){
        return res.status(200).send({ message: "Successfully deleted." });
        } 
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}

export const updateProducts = async(req: Request, res: Response) =>{
    try {
        const product_image = req.file as Express.Multer.File | undefined;
        const {id,picture,product_name,product_description,price,status} = req.body;
        console.log(req.body)
        const updateQuery = "UPDATE products_tbl SET product_image = ?, product_name = ?, product_description = ?,price = ?, status = ? WHERE id = ?"
        let pictureData
        if (!product_image){
            pictureData = picture
        }else{
            pictureData = `images/${product_image.filename}`
        }
        const result = await executeQuery(updateQuery,[pictureData,product_name,product_description,price,status,id])
        if(result){
            return res.status(200).send({message:"Successfully Updated"})
        }
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const insertProduct = async (req: Request, res: Response) => {
    const checkProductQueryDrinks = "SELECT category_name FROM product_categories_tbl WHERE id = ?";
    const checkItemsIfExistQuery = "SELECT a.id, b.category_name, a.item_picture, a.item_name, a.quantity, a.remaining_quantity, a.price, a.total_amount, a.purchase_date FROM items_tbl a LEFT JOIN items_category_tbl b ON b.id = a.item_category_id WHERE LOWER(b.category_name) = LOWER(?) AND LOWER(a.item_name) = LOWER(?)";
    const checkProductNameExistsQuery = "SELECT * FROM products_tbl WHERE LOWER(product_name) = LOWER(?)"; // New query to check for existing product name

    try {
        const product_image = req.file as Express.Multer.File | undefined;
        const { category_id, product_name, product_description, price } = req.body;

        if (!product_image) {
            return res.status(400).send({ message: 'No file uploaded.' });
        }

        // Check if product name already exists
        const existingProduct = await executeQuery(checkProductNameExistsQuery, [product_name]) as Array<any>;
        if (existingProduct.length > 0) {
            return res.status(409).send({ message: "Product with this name already exists." });
        }

        const [getProductCategory] = await executeQuery(checkProductQueryDrinks, [category_id]) as Array<categories>;
        
        if (getProductCategory.category_name.toLowerCase() === "drinks") {
            const checkIfDrinkExist = await executeQuery(checkItemsIfExistQuery, [getProductCategory.category_name, product_name]) as Array<ItemsDataT>;
            if (checkIfDrinkExist.length < 1) {
                return res.status(409).send({ message: "Product Drink does not exist in the inventory." });
            }
        }

        const imagePath = `images/${product_image.filename}`;
        const insertQuery = 'INSERT INTO products_tbl (category_id, product_image, product_name, product_description, price) VALUES (?, ?, ?, ?, ?)';
        const result = await executeQuery(insertQuery, [category_id, imagePath, product_name, product_description, price]);

        if (!result) {
            return res.status(402).send({ message: "Error inserting product." });
        }

        return res.status(200).send({ message: "Successfully inserted." });
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const deleteItemsCategory = async(req:Request,res:Response)=>{
    try {
        const {id,category_name} = req.body
        const deleteQuery = "DELETE FROM items_category_tbl WHERE id = ?"
        const deleteItemQuery = "DELETE FROM items_tbl WHERE item_category_id = ?"
        if(category_name.toLowerCase() === 'drinks'){
            return res.status(409).send({message:"This Category is not deletable"})
        }else{
            await executeQuery(deleteQuery,[id]).then(async()=>{
                const result = await executeQuery(deleteItemQuery,[id])
                if(result){
                    return res.status(200).send({message:"Successfully Deleted"})
                }
            })
           
        }
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const insertCustomerTables = async(req:Request,res:Response)=>{
    try {
        const {table_no} = req.body
        const insertQuery = 'INSERT INTO customer_table_tbl(table_no)VALUES(?)'
        const result = await executeQuery(insertQuery,[table_no])
        if(!result){
        return res.status(402).send({ message: "Error Inserting." });
        }
        return res.status(200).send({ message: "Success Fully Inserted." });
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const insertProductCategory = async(req:Request,res:Response)=>{
    try {
        const {category_name} = await req.body;
        console.log(req.body)
        const insertCategoryQuery = 'INSERT INTO product_categories_tbl(category_name) VALUES(?)'
        const result = await executeQuery(insertCategoryQuery,[category_name]);
        if(!result){
        return res.status(402).send({ message: "Error Inserting." });
        }
        return res.status(200).send({ message: "Success Fully Inserted." });
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const insertItemCategory = async(req:Request,res:Response)=>{
    try {
        const {category_name} = await req.body;
        const checkQuery = "SELECT category_name FROM items_category_tbl WHERE category_name = ?"

        const check = await executeQuery(checkQuery,[category_name])

        if(check){
            return res.status(409).send({message:"category Already exist!!!!"})
        }
        const insertCategoryQuery = 'INSERT INTO items_category_tbl(category_name) VALUES(?)'
        const result = await executeQuery(insertCategoryQuery,[category_name]);
        if(!result){
        return res.status(402).send({ message: "Error Inserting." });
        }
        return res.status(200).send({ message: "Success Fully Inserted." });
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const adminGetAllProductsCategories = async(req:Request,res:Response)=>{
    return await getAllProductsCategories(req,res);
}
export const adminGetAllItemsCategories = async(req:Request,res:Response)=>{
    return await getAllItemsCategories(req,res);
}
export const adminGetAllItems = async(req:Request,res:Response)=>{
    return await getAllItems(req,res);
}
export const adminGetAllDataDashBoardRequired = async(req:Request,res:Response)=>{
    return await getAllDataDashBoardRequired(req,res)
}
export const adminGetAllProducts = async(req:Request,res:Response)=>{
    return await getAllAdminProducts(req,res)
}
export const adminCustomersTable = async(req:Request,res:Response)=>{
    return await getAllCustomerTable(req,res)
}
export const adminNewOrdersUnpaid = async (req:Request,res:Response) => {
    return await getAdminAllNewOrdersUnpaid(req,res)
}
export const adminNewOrdersPaid = async (req:Request,res:Response) => {
    return await getAdminAllNewOrdersPaid(req,res)
}
export const adminOrderHistoryData = async (req:Request,res:Response) => {
    return await getOrderHistoryData(req,res)
}
export const AdminAllCustomerTable = async (req:Request,res:Response) => {
    return await getAdminCustomerTable(req,res)
}
export const AdminList = async (req:Request,res:Response) => {
    return await getAdminList(req,res)
}
export const deleteTable = async(req:Request,res:Response)=>{
    try {
        const {id} = req.body
        const deleteQuery = "DELETE FROM customer_table_tbl WHERE id = ?"
        const result = await executeQuery(deleteQuery,[id])
        if(result){
            return res.status(200).send({message:"Successfully Deleted"})
        }
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const updateRole = async(req:Request,res:Response) => {
    try {
        const {id,role} = req.body
        const updateQuery = "UPDATE user_tbl SET role = ? WHERE id = ?"
        const result = await executeQuery(updateQuery,[role,id])
        if(result){
            return res.status(200).send({message:"Successfully Updated"})
        }
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const deleteUser = async(req:Request,res:Response)=>{
    const {id} = req.body
    try {
        const transaction = "START TRANSACTION"
        const deleteUserQuery = "DELETE FROM user_tbl WHERE id = ?"
        const deleteUserInfo = "DELETE FROM userinfo_tbl WHERE user_id = ?"
        const deleteToken = "DELETE FROM refresh_token WHERE user_id = ?"
        const rollBack = "ROLLBACK"
        const commit = "COMMIT"

        await executeQuery(transaction,[])
            const FirstDelete = await executeQuery(deleteUserQuery,[id])
            if(!FirstDelete){
                return res.status(409).send({message:"Error Deleting User"})
            }

            const secondDelete = await executeQuery(deleteUserInfo,[id])
            if(!secondDelete){
                await executeQuery(rollBack,[])
                    return res.status(409).send({message:"Error Deleting UserInfo"})
                
            }

            const thirdDelete = await executeQuery(deleteToken,[id])
            if(!thirdDelete){
                await executeQuery(rollBack,[])
                    return res.status(409).send({message:"Error Deleting Token"})
              
            }

                await executeQuery(commit,[])
                return res.status(200).send({message:"Successfully Deleted"})
    } catch (error) {
        await executeQuery("ROLLBACK",[])
         console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const emptyTable = async(req:Request,res:Response)=>{
    const {order_no,customer_name} = req.body
    try{
        const checkQuery = 'SELECT * FROM order_tbl WHERE order_no = ? AND customer_name = ?'
        const updateQuery = "UPDATE customer_table_tbl SET order_no = '', status = 1 WHERE table_no = ?"  
        const [checkData] = await executeQuery(checkQuery,[order_no,customer_name]) as Array<any>

        if(checkData.order_type === 'dine in'){
            const result = await executeQuery(updateQuery,[checkData.table_no])
            if(result){
                return res.status(200).send({message:"Successfully Updated"})
            }
        }
    }catch(error){
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const checkOutOrder = async (req:Request,res:Response) => {
    const {order_no,customer_name,cash,total_amount} = req.body
    try {
        let totalChange
        const UpdateQuery = "UPDATE order_tbl SET customer_cash = ?,customer_change = ?,status = 'paid' WHERE order_no = ? AND customer_name = ?"
        const change = Math.floor(total_amount - parseInt(cash))
        if(change === 0){
            totalChange = 0
        }else{
            const stringChange = change.toString()
            const SubstringChange = stringChange.substring(1,stringChange.length)
            totalChange = parseInt(SubstringChange)
        }
        console.log(totalChange)
        const result = await executeQuery(UpdateQuery,[parseInt(cash),totalChange,order_no,customer_name])
        if(!result)return res.status(402).send({ message: "Error Inserting." });
        return res.status(200).send({ message: "Success Fully Updated." });
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}

export const insertItems = async(req:Request, res:Response)=>{
    try {
        const item_picture = req.file as Express.Multer.File | undefined;
        const {item_category_id,item_name,quantity,price} = req.body;
        if (!item_picture) {
            return res.status(400).send({ message: 'No file uploaded.' });
          }
          //total amount = price multiplied by quantity
          const total_amount = Math.ceil(price * quantity)
          const imagePath = `images/${item_picture.filename}`;

        const insertQuery = 'INSERT INTO items_tbl(item_category_id,item_picture,item_name,quantity,remaining_quantity,price,total_amount,purchase_date)VALUES(?,?,?,?,?,?,?,now())'
        const result = await executeQuery(insertQuery,[item_category_id,imagePath,item_name,quantity,quantity,price,total_amount]);
        if(!result){
        return res.status(402).send({ message: "Error Inserting." });
        }
        return res.status(200).send({ message: "Success Fully Inserted." });
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const deleteItems = async(req:Request, res:Response) =>{
    try {
        const {id,category_name} = req.body
        const deleteQuery = "DELETE FROM items_tbl WHERE id = ?"
        const updateQuery = "UPDATE items_tbl SET quantity = 0, remaining_quantity = 0, price = 0,total_amount = 0 WHERE id = ?"
        if(category_name.toLowerCase() === 'drinks'){
            const secondRes = await executeQuery(updateQuery,[id])
            if(secondRes){
                return res.status(200).send({message:"Successfully Reseted"})
            }
        }else{
            const result = await executeQuery(deleteQuery,[id])
            if(result){
                return res.status(200).send({message:"Successfully Deleted"})
            }
        }
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const updateItems = async(req:Request, res:Response)=>{
    try {
        const item_picture = req.file as Express.Multer.File | undefined;
        const {id,picture,item_name,quantity,price} = req.body;
        console.log(req.body)
        const selectQuery = "SELECT * FROM items_tbl WHERE id = ?"
        const updateQuery = "UPDATE items_tbl SET item_picture = ?, item_name = ?, quantity = ?, remaining_quantity = ?,price = ?, total_amount = ? WHERE id = ?"
        const [checkData] = await executeQuery(selectQuery,[id]) as Array<any>
        let remainders
        let total_amount
        let dataRemain
        console.log(checkData)
        if(checkData.quantity > quantity){
            remainders = Math.ceil(checkData.quantity - quantity)
            dataRemain = Math.ceil(checkData.remaining_quantity - remainders)
            if (dataRemain < 0){
                return res.status(409).send({message:"remaining Quantity should not less than 0"})
            }
        }else{
            remainders = Math.ceil(quantity - checkData.quantity)
            dataRemain = Math.ceil(checkData.remaining_quantity + remainders)
        }
        let pictureData
        if (!item_picture){
            pictureData = picture
        }else{
            pictureData = `images/${item_picture.filename}`
        }
        total_amount = quantity * price
        const result = await executeQuery(updateQuery,[pictureData,item_name,quantity,dataRemain,price,total_amount,id])
        if(result){
            return res.status(200).send({message:"Successfully Updated"})
        }
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const getAdminItemDistictCategory = async(req:Request,res:Response)=>{
    try {
        const selectQuery = "SELECT DISTINCT id,category_name FROM items_category_tbl"
        const result = await executeQuery(selectQuery,[]);
        return res.status(200).send({
            categories:result
        })
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const subtractQuantity =async (req:Request,res:Response) => {
    try {
        const {id} = req.body
        const selectQuery = "SELECT * FROM items_tbl WHERE id = ?"
        const updateQuery = "UPDATE items_tbl SET quantity = ?, remaining_quantity = ?, total_amount = ? WHERE id = ?"
        const [item] = await executeQuery(selectQuery,[id]) as Array<any>

        if(item && item.quantity){
            let subtractedQuantity = item.quantity
            let subtractedRemainingQuantity = item.remaining_quantity

            if (item.remaining_quantity !== 0 ){
                subtractedRemainingQuantity--
                subtractedQuantity--
            }else{
                return res.status(409).send({message:"remaining Quantity cannot be Subtracted"})
            }
            const total_amount = Math.ceil(item.price * subtractedQuantity)

          const result = await executeQuery(updateQuery,[subtractedQuantity,subtractedRemainingQuantity,total_amount,id])
          if(result){
            return res.status(200).send({message:"Quantity Subtracted Successfully"})
          }
        }
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const addQuantity =async (req:Request,res:Response) => {
    try {
        const {id} = req.body
        const selectQuery = "SELECT * FROM items_tbl WHERE id = ?"
        const updateQuery = "UPDATE items_tbl SET quantity = ?, remaining_quantity = ?, total_amount = ? WHERE id = ?"
        const [item] = await executeQuery(selectQuery,[id]) as Array<any>

        if(item && item.quantity){
            let addedQuantity = item.quantity
            let addedRemainingQuantity = item.remaining_quantity

                addedRemainingQuantity++
                addedQuantity++
            const total_amount = Math.ceil(item.price * addedQuantity)

          const result = await executeQuery(updateQuery,[addedQuantity,addedRemainingQuantity,total_amount,id])
          if(result){
            return res.status(200).send({message:"Quantity added Successfully"})
          }
        }
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}