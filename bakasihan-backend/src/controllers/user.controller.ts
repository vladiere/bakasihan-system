import executeQuery from '../utils/executeQuery.util';
import { checkIfTheresSameOrderID, getAllCustomerTable, getProductCategories,getProducts,getReciept } from '../service/recycledFunc.service';
import { Response,Request } from 'express';
import { customersTableTypes } from '../types/tables.types';


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
export const addUserOrder = async(req:Request,res:Response)=>{
    const {order_no,foods,drinks,table_no,order_type,customer_name,total_amount} = req.body
    const tableQuery = 'SELECT * FROM customer_table_tbl WHERE table_no = ?'
    const insertOrderQuery = `INSERT INTO order_tbl(order_no,foods,drinks,table_no,order_type,customer_name,total_amount)
                        VALUES(?,?,?,?,?,?,?)`
    const updateTableQuery = `UPDATE customer_table_tbl SET order_no = ?, status = 2 WHERE table_no = ?`
    try {
        if(order_type === 'dine in'){
            const tables = await executeQuery(tableQuery,[table_no]) as Array<customersTableTypes>
            if(tables[0].order_no != ''){
                return res.status(403).send({
                    message:'Table is Already Occupied'
                })
            }else{
                const result = await executeQuery(insertOrderQuery,[order_no,foods,drinks,table_no,order_type,customer_name,total_amount])
                if(!result){
                    return res.status(400).send({message:"Something wrong with inserting"})
                }else{
                    await executeQuery(updateTableQuery,[order_no,table_no])
                    return res.status(200).send({message:"Ordered Successfully"})
                }
            }
        }
        if(order_type === 'take out'){
            const result = await executeQuery(insertOrderQuery,[order_no,foods,drinks,table_no,order_type,customer_name,total_amount])
            if(!result){
                return res.status(400).send({message:"Something wrong with inserting"})
            }
            return res.status(200).send({message:"Ordered Successfully"})
        }
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong with the database." });
    }
}