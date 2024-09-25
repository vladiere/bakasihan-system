import executeQuery from '../utils/executeQuery.util';
import { getAllProductsCategories,getAllAdminProducts, getAllCustomerTable } from '../service/recycledFunc.service';
import { Request,Response } from "express";

export const insertProduct = async(req:Request, res:Response)=>{
    try {
        const product_image = req.file as Express.Multer.File | undefined;
        const {category_id,product_name,product_description,price} = req.body;
        if (!product_image) {
            return res.status(400).send({ message: 'No file uploaded.' });
          }
          // Construct the image path
          const imagePath = `images/${product_image.originalname}`;
        const insertQuery = 'INSERT INTO products_tbl(category_id,product_image,product_name,product_description,price)VALUES(?,?,?,?,?)'
        const result = await executeQuery(insertQuery,[category_id,imagePath,product_name,product_description,price]);
        if(!result){
        return res.status(402).send({ message: "Error Inserting." });
        }
        return res.status(200).send({ message: "Success Fully Inserted." });
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
export const adminGetAllProductsCategories = async(req:Request,res:Response)=>{
    return await getAllProductsCategories(req,res);
}
export const adminGetAllProducts = async(req:Request,res:Response)=>{
    return await getAllAdminProducts(req,res)
}
export const adminCustomersTable = async(req:Request,res:Response)=>{
    return await getAllCustomerTable(req,res)
}