import executeQuery from '../utils/executeQuery.util';
import { Request,Response } from "express";
import { countTable,Category } from '../types/products.types';
import { recieptTypes } from '../types/tables.types';
import { ItemsDataT,amountDataT } from '../types/items.types';

export const getProducts = async (req: Request, res: Response) => {
  console.log(req.query);
  const checkItemsListIfAvailableQuery = "SELECT remaining_quantity FROM items_tbl WHERE LOWER(item_name) = LOWER(?)";
  const updateProduct = "UPDATE products_tbl SET status = ? WHERE product_name = ?";
  const searchTerm = req.query.searchTerm ? `%${req.query.searchTerm}%` : '%%';

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
    WHERE c.category_name LIKE ? OR p.product_name LIKE ? OR p.product_description LIKE ?
  `;

  try {
      // Execute the query
      const check = await executeQuery(Query, [searchTerm, searchTerm, searchTerm]) as Array<any>;

      await Promise.all(check.map(async (e: any) => {
          const [checkRemainingQuantity] = await executeQuery(checkItemsListIfAvailableQuery, [e.product_name]) as Array<any>;
          if (checkRemainingQuantity && checkRemainingQuantity.remaining_quantity === 0) {
              await executeQuery(updateProduct, [2,e.product_name]);
          }else{
            await executeQuery(updateProduct, [1,e.product_name]);
          }
      }));
      const result = await executeQuery(Query, [searchTerm, searchTerm, searchTerm]) as Array<any>;

      // Use Promise.all to handle asynchronous operations

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
      console.error('Error occurred:', error);
      return res.status(500).send({ message: "Something went wrong." });
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
  export const getReciept = async(req:Request,res:Response)=>{
    const {order_no,customer_name} = req.body
    const getQuery = 'SELECT * FROM order_tbl WHERE order_no = ? AND customer_name = ?'

    const reciept = await executeQuery(getQuery,[order_no,customer_name]) as Array<recieptTypes | null>

    return res.status(200).send({reciept:reciept[0]})
  }
  
  export const checkIfTheresSameOrderID = async(req:Request,res:Response)=>{
    const {order_no} = req.body
    const getQuery = 'SELECT order_no FROM order_tbl WHERE order_no = ?'

    const result = await executeQuery(getQuery,[order_no])
    return res.status(200).send({result:result})
  }
  export const getAdminAllNewOrdersUnpaid = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1; // default to page 1
    const limit = parseInt(req.query.per_page as string) || 5; // default limit to 5
    const searchTerm = req.query.searchTerm ? `%${req.query.searchTerm}%` : '%%'; // if no searchTerm, match all
    const currentYear = parseInt(req.query.currentYear as string) || 0;
    const currentMonth = parseInt(req.query.currentMonth as string) || 0;
    const currentDay = parseInt(req.query.currentDay as string) || 0;
    const offset = (page - 1) * limit;

  
    const totalQuery = "SELECT COUNT(*) as total from order_tbl WHERE (order_no LIKE ? OR customer_name LIKE ?) AND status = 'unpaid' AND YEAR(ctime) = ? AND MONTH(ctime) = ? AND DAY(ctime) = ?";
    const totalResult = await executeQuery(totalQuery, [searchTerm, searchTerm, currentYear, currentMonth, currentDay]) as Array<countTable>;
    
    const total = totalResult[0].total; // Get total from the result
  
    const getQuery = "SELECT * from order_tbl WHERE (order_no LIKE ? OR customer_name LIKE ?) AND status = 'unpaid' AND YEAR(ctime) = ? AND MONTH(ctime) = ? AND DAY(ctime) = ? LIMIT ?, ?";
    const result = await executeQuery(getQuery, [searchTerm, searchTerm, currentYear, currentMonth, currentDay, offset, limit]);
  
    return res.status(200).send({
      newOrders: result,
      current_page: page,
      per_page: limit,
      total: total, // total number of matching records
    });
  }
  
  export const getAdminAllNewOrdersPaid = async(req:Request,res:Response)=>{
   const page = parseInt(req.query.page as string) || 1; // default to page 1
      const limit = parseInt(req.query.per_page as string) || 5; // default limit to 5
      const searchTerm = req.query.searchTerm ? `%${req.query.searchTerm}%` : '%%'; // if no searchTerm, match all
      const currentYear = parseInt(req.query.currentYear as string ) || 0
      const currentMonth = parseInt(req.query.currentMonth as string ) || 0
      const currentDay = parseInt(req.query.currentDay as string ) || 0
      const offset = (page - 1) * limit;
  
      // Correct the search pattern to avoid double wildcards
      const searchPattern = searchTerm;
      const totalQuery = "SELECT COUNT(*) as total from order_tbl WHERE (order_no LIKE ? OR customer_name LIKE ?) AND status = 'paid' AND YEAR(ctime) = ? AND MONTH(ctime) = ? AND DAY(ctime) = ?"

      const totalResult = await executeQuery(totalQuery, [searchPattern, searchPattern, currentYear,currentMonth,currentDay]) as Array<countTable>;
  
      const total = totalResult[0].total; // Get total from the result
  
    const getQuery = "SELECT * from order_tbl WHERE (order_no LIKE ? OR customer_name LIKE ?) AND status = 'paid' AND YEAR(ctime) = ? AND MONTH(ctime) = ? AND DAY(ctime) = ? LIMIT ?,?"
    
    const result = await executeQuery(getQuery,[searchPattern, searchPattern,currentYear,currentMonth,currentDay,offset,limit])
    return res.status(200).send({
      newOrders: result,
      current_page: page,
      per_page: limit,
      total: total, // total number of matching records
    });
  }
  export const getAllItemsCategories = async (req: Request, res: Response) => {
    try {
        // Get pagination parameters from request query
        const page = parseInt(req.query.page as string) || 1; // default to page 1
        const limit = parseInt(req.query.per_page as string) || 5; // default limit to 10
        const searchTerm = req.query.searchTerm ? `%${req.query.searchTerm}%` : '%%'; // if no searchTerm, match all

        const offset = (page - 1) * limit;

        // Query to get the total number of records (without pagination)
        const totalQuery = 'SELECT COUNT(*) as total FROM items_category_tbl WHERE category_name LIKE ?';
        const totalResult = await executeQuery(totalQuery, [searchTerm]) as Array<countTable>;

        const total = totalResult[0].total; // Get total from the result

        // Query to get paginated results with search
        const getQuery = 'SELECT id, category_name FROM items_category_tbl WHERE category_name LIKE ? LIMIT ? OFFSET ?';
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
export const getAllItems = async (req: Request, res: Response) => {
  try {
      // Get pagination parameters from request query
      const page = parseInt(req.query.page as string) || 1; // default to page 1
      const limit = parseInt(req.query.per_page as string) || 5; // default limit to 10
      const searchTerm = req.query.searchTerm ? `%${req.query.searchTerm}%` : '%%'; // if no searchTerm, match all

      const offset = (page - 1) * limit;

      // Query to get the total number of records (without pagination)
      const totalQuery = 'SELECT COUNT(*) as total FROM items_tbl a LEFT JOIN items_category_tbl b ON b.id = a.item_category_id WHERE b.category_name LIKE ? AND a.item_name LIKE ?';
      const totalResult = await executeQuery(totalQuery, [searchTerm,searchTerm]) as Array<countTable>;

      const total = totalResult[0].total; // Get total from the result

      // Query to get paginated results with search
      const getQuery = 'SELECT a.id, b.category_name,a.item_picture,a.item_name,a.quantity,a.remaining_quantity,a.price,a.total_amount,a.purchase_date FROM items_tbl a LEFT JOIN items_category_tbl b ON b.id = a.item_category_id WHERE b.category_name LIKE ? AND a.item_name LIKE ? LIMIT ? OFFSET ?';
      const result = await executeQuery(getQuery, [searchTerm,searchTerm, limit, offset]) as Array<ItemsDataT>;

      if (!result) {
          return res.status(402).send({ message: "Error fetching." });
      }

      // Send the paginated results along with total records
      return res.status(200).send({
          items: result,
          current_page:page,
          per_page:limit,
          total:total, // total number of matching records
      });
  } catch (error) {
      return res.status(500).send({ message: "Server error.", error });
  }
};
export const getAllDataDashBoardRequired = async (req: Request, res: Response) => {
  try {
    // Query for today's sales
    const getTodayDataOrders = "SELECT SUM(total_amount) as total_amount FROM order_tbl WHERE status = 'paid' AND DATE(ctime) = CURDATE()";

    // Query for this week's sales
    const getThisWeekDataOrders = "SELECT SUM(total_amount) as total_amount FROM order_tbl WHERE status = 'paid' AND WEEK(ctime, 1) = WEEK(CURDATE(), 1)";

    // Query for this month's sales
    const getThisMonthDataOrders = "SELECT SUM(total_amount) as total_amount FROM order_tbl WHERE status = 'paid' AND MONTH(ctime) = MONTH(CURDATE()) AND YEAR(ctime) = YEAR(CURDATE())";

    // Query for this year's sales
    const getThisYearDataOrders = "SELECT SUM(total_amount) as total_amount FROM order_tbl WHERE status = 'paid' AND YEAR(ctime) = YEAR(CURDATE())";

    // Execute the queries
    const [TodayAmountOrders] = await executeQuery(getTodayDataOrders, []) as Array<amountDataT>;
    
    const [ThisWeekAmountOrders] = await executeQuery(getThisWeekDataOrders, []) as Array<amountDataT>;

    const [ThisMonthAmountOrders] = await executeQuery(getThisMonthDataOrders, []) as Array<amountDataT>;

    const [ThisYearAmountOrders] = await executeQuery(getThisYearDataOrders, []) as Array<amountDataT>;

    // Calculate today's sales
    const TodaySales = TodayAmountOrders.total_amount

    // Calculate this week's sales
    const ThisWeekSales = ThisWeekAmountOrders.total_amount

    // Calculate this month's sales
    const ThisMonthSales = ThisMonthAmountOrders.total_amount

    // Calculate this year's sales
    const ThisYearSales = ThisYearAmountOrders.total_amount

    // Return the sales data
    return res.status(200).send({
      TodaySales,
      ThisWeekSales,
      ThisMonthSales,
      ThisYearSales
    });
  } catch (error) {
    return res.status(500).send({ message: "Server error.", error });
  }
};
