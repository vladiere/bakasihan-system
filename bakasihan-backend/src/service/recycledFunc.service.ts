import executeQuery from '../utils/executeQuery.util';
import { Request,Response } from "express";
import { countTable,Category } from '../types/products.types';

export const getProducts = async (req: Request, res: Response) => {
    try {
      // SQL query to retrieve products and categories
      const Query = `
        SELECT DISTINCT 
          c.id AS category_id,
          c.category_name, 
          p.id AS product_id, 
          p.product_image, 
          p.product_name, 
          p.product_description, 
          p.price,
          p.status  
        FROM product_categories_tbl AS c 
        LEFT JOIN products_tbl AS p ON c.id = p.category_id
      `;
  
      // Execute the query
      const result = await executeQuery(Query, []) as Array<any>; // Adjust type if necessary
      if (!result || result.length === 0) {
        return res.status(404).send({ message: "No products found." });
      }
  
      // Transform results into the desired structure
      const data = result.reduce((acc: Array<Category>, row) => {
        let category = acc.find(c => c.id === row.category_id);
        if (!category) {
          category = {
            id: row.category_id,
            category_name: row.category_name,
            products: []
          };
          acc.push(category);
        }
        if (row.product_id) {
          category.products.push({
            id: row.product_id,
            category_id: row.category_id,
            product_image: row.product_image,
            product_name: row.product_name,
            product_description: row.product_description,
            price: row.price,
            status: row.status
          });
        }
        return acc;
      }, []);
  
      // Send the response with the transformed data
      return res.status(200).send({ products: data });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).send({ message: "Something went wrong with the database." });
    }
  };
  
export const getProductCategories = async(req:Request,res:Response)=>{
    try {
        const {category_id} = req.body;
        const search_id = `%${category_id}%`
        const getQuery = 'SELECT DISTINCT id,category_name FROM product_categories_tbl WHERE id LIKE ?'
        const result = await executeQuery(getQuery,[search_id]);
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

export const getAllAdminProducts = async(req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1; // default to page 1
      const limit = parseInt(req.query.per_page as string) || 5; // default limit to 5
      const searchTerm = req.query.search ? `%${req.query.search}%` : '%%'; // if no searchTerm, match all
      const offset = (page - 1) * limit;
  
      // Correct the search pattern to avoid double wildcards
      const searchPattern = searchTerm;
  
      // Query to get the total number of records (without pagination)
      const totalQuery = `
        SELECT COUNT(*) as total 
        FROM products_tbl as product
        LEFT OUTER JOIN product_categories_tbl as category 
        ON category.id = product.category_id 
        WHERE product.product_name LIKE ? 
          OR product.product_description LIKE ? 
          OR category.category_name LIKE ?`;
  
      const totalResult = await executeQuery(totalQuery, [searchPattern, searchPattern, searchPattern]) as Array<countTable>;
  
      const total = totalResult[0].total; // Get total from the result
  
      // Query to get paginated results with search
      const getQuery = `
        SELECT product.id, category.category_name, product.product_image, product.product_name, product.product_description, product.price 
        FROM products_tbl as product 
        LEFT OUTER JOIN product_categories_tbl as category 
        ON category.id = product.category_id 
        WHERE product.product_name LIKE ? 
          OR product.product_description LIKE ? 
          OR category.category_name LIKE ? 
        LIMIT ? OFFSET ?`;
  
      const result = await executeQuery(getQuery, [searchPattern, searchPattern, searchPattern, limit, offset]);
  
      if (!result) {
        return res.status(402).send({ message: "Error fetching." });
      }
  
      // Send the paginated results along with total records
      return res.status(200).send({
        products: result,
        current_page: page,
        per_page: limit,
        total: total, // total number of matching records
      });
    } catch (error) {
      return res.status(500).send({ message: "Server error.", error });
    }
  }

  export const getAllCustomerTable = async(req:Request,res:Response)=>{
    try {
        const selectQuery = 'SELECT id,table_no,order_no,status FROM customer_table_tbl;'
        const result = await executeQuery(selectQuery,[])
        if(!result){
            return res.status(402).send({ message: "Error fetching." });
        }
        return res.status(200).send({
            customer_tables:result
        })
    } catch (error) {
      return res.status(500).send({ message: "Server error.", error });
    }
  }