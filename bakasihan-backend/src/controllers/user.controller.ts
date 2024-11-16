import executeQuery from '../utils/executeQuery.util';
import { checkIfTheresSameOrderID, getAllCustomerTable, getProductCategories,getProducts,getReciept } from '../service/recycledFunc.service';
import { Response,Request } from 'express';
import { customersTableTypes } from '../types/tables.types';
import { productsOrderDataT, foodOrder } from '../types/products.types';

type RemainingQuantityResult = {
    remaining_quantity: number;
};

export const userGetProducts = async (req:Request,res:Response)=>{
    return await getProducts(req,res);
}

export const userGetProductCategories = async(req:Request,res:Response)=>{
    return await getProductCategories(req,res);
}
export const userCustomersTable = async(req:Request,res:Response)=>{
    return await getAllCustomerTable(req,res)
}
export const userReciept = async(req:Request,res:Response)=>{
    return await getReciept(req,res)
}
export const userCheckIfTheresSameOrderID = async(req:Request,res:Response)=>{
    return await checkIfTheresSameOrderID(req,res)
}
export const goBackToIndex = async(req:Request,res:Response) =>{
    const {table_no} = req.body
    try {
        const updateQuery = "Update customer_table_tbl SET order_no = '', status = 1 WHERE table_no = ?"
        const response = await executeQuery(updateQuery,[table_no])
        if(response){
            return res.status(200).send({message:"Table is now empty."})
        }
    } catch (error) {
        console.error('Error occurred:', error);
        if (!res.headersSent) {
            return res.status(500).send({ message: error || "Something went wrong with the database." });
        }
    }
}
export const addUserOrder = async (req: Request, res: Response) => {
    const { order_no, orders, table_no, order_type, customer_name, total_amount } = req.body;
    const tableQuery = 'SELECT * FROM customer_table_tbl WHERE table_no = ?';
    const insertOrderQuery = `INSERT INTO order_tbl(order_no, orders, table_no, order_type, customer_name, total_amount)
                              VALUES(?, ?, ?, ?, ?, ?)`;
    const updateTableQuery = `UPDATE customer_table_tbl SET order_no = ?, status = 2 WHERE table_no = ?`;
    const checkItemsListIfAvailableQuery = "SELECT remaining_quantity FROM items_tbl WHERE LOWER(item_name) = LOWER(?)";
    const updateItemsListQuery = 'UPDATE items_tbl SET remaining_quantity = remaining_quantity - ? WHERE LOWER(item_name) = LOWER(?)';

    try {
        const parsedOrders = JSON.parse(orders);

        console.log('Parsed Orders:', parsedOrders);
        if (!Array.isArray(parsedOrders)) {
            return res.status(400).send({ message: 'Orders must be an array.' });
        }

        // Validate item quantities
        const quantityChecks = parsedOrders.flatMap((e: productsOrderDataT) => {
            if (e.category_name.toLowerCase() === "drinks") {
                return e.products.map(prod =>
                    executeQuery(checkItemsListIfAvailableQuery, [prod?.product_name]).then(selectedItems => {
                        const selectedItem = selectedItems as Array<RemainingQuantityResult>; // Assuming we get only one result
                        if (!selectedItem || selectedItem[0].remaining_quantity < (prod?.quantity || 0)) {
                            throw new Error(`Product ${prod?.product_name} has only ${selectedItem[0].remaining_quantity} remaining`);
                        }
                    })
                );
            }
            return [];
        });

        // Await all quantity checks
        await Promise.all(quantityChecks);

        // Proceed if all checks are successful
        if (order_type === 'dine in') {
            const tables = await executeQuery(tableQuery, [table_no]) as Array<customersTableTypes>;
            if (tables[0]?.order_no) {
                return res.status(403).send({ message: 'Table is Already Occupied' });
            }
        }

        // Insert the order
        const result = await executeQuery(insertOrderQuery, [order_no, orders, table_no, order_type, customer_name, total_amount]);
        if (!result) {
            return res.status(400).send({ message: "Something went wrong with inserting" });
        }

        // Update the items list
        await Promise.all(parsedOrders.flatMap((e: productsOrderDataT) => {
            if (e.category_name.toLowerCase() === "drinks") {
                return e.products.map(prod =>
                    executeQuery(updateItemsListQuery, [prod?.quantity, prod?.product_name])
                );
            }
            return [];
        }));

        // Update the table if dine-in
        if (order_type === 'dine in') {
            await executeQuery(updateTableQuery, [order_no, table_no]);
        }

        return res.status(200).send({ message: "Ordered Successfully" });

    } catch (error: any) {
        console.error('Error occurred:', error);
        if (!res.headersSent) {
            return res.status(500).send({ message: error.message || "Something went wrong with the database." });
        }
    }
};


