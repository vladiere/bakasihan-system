import executeQuery from '../utils/executeQuery.util';
import { getAllProductsCategories,
    getAllAdminProducts,
     getAllCustomerTable, 
     getAdminAllNewOrdersUnpaid, 
     getAdminAllNewOrdersPaid,
     getAllItemsCategories,
     getAllItems,
     getAllDataDashBoardRequired
    } from '../service/recycledFunc.service';
import { Request,Response } from "express";
import { ItemsDataT } from '@/types/items.types';

type categories = {
    category_name:string
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

        const imagePath = `images/${product_image.originalname}`;
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
        console.log(req.body)
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
          const imagePath = `images/${item_picture.originalname}`;

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