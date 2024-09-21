import executeQuery from '../utils/executeQuery.util';
import { Request,Response } from "express";
import { countTable } from '@/types/products.types';


export const getProducts = async(req:Request,res:Response)=>{
    try {
        const {category_id,searchValue} = req.body;
        const Query = 'SELECT id,category_id,product_image,product_name,product_description,price,status FROM products_tbl WHERE category_id LIKE %?% AND product_name LIKE %?%'
        const result = executeQuery(Query,[category_id,searchValue]);
        if(!result){
        return res.status(402).send({ message: "Error fetching." });
        }
        return res.status(200).send({ products: result });
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}
export const getProductCategories = async(req:Request,res:Response)=>{
    try {
        const {category_id} = req.body;
        const getQuery = 'SELECT id,category_name FROM product_categories_tbl WHERE id LIKE %?%'
        const result = executeQuery(getQuery,[category_id]);
        if(!result){
        return res.status(402).send({ message: "Error fetching." });
        }
        return res.status(200).send({ categories: result });
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}

export const getAllProductsCategories = async (req: Request, res: Response) => {
    try {
        // Get pagination parameters from request query
        const page = parseInt(req.query.page as string) || 1; // default to page 1
        const limit = parseInt(req.query.per_page as string) || 5; // default limit to 10
        const searchTerm = req.query.searchTerm ? `%${req.query.searchTerm}%` : '%%'; // if no searchTerm, match all

        const offset = (page - 1) * limit;

        // Query to get the total number of records (without pagination)
        const totalQuery = 'SELECT COUNT(*) as total FROM product_categories_tbl WHERE category_name LIKE ?';
        const totalResult = await executeQuery(totalQuery, [searchTerm]) as Array<countTable>;

        const total = totalResult[0].total; // Get total from the result

        // Query to get paginated results with search
        const getQuery = 'SELECT id, category_name FROM product_categories_tbl WHERE category_name LIKE ? LIMIT ? OFFSET ?';
        const result = await executeQuery(getQuery, [searchTerm, limit, offset]);

        if (!result) {
            return res.status(402).send({ message: "Error fetching." });
        }

        // Send the paginated results along with total records
        return res.status(200).send({
            categories: result,
            current_page:page,
            per_page:limit,
            total:total, // total number of matching records
        });
    } catch (error) {
        return res.status(500).send({ message: "Server error.", error });
    }
};
