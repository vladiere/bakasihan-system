import { getProductCategories,getProducts } from '../service/recycledFunc.service';
import { Response,Request } from 'express';


export const userGetProducts = async (req:Request,res:Response)=>{
    return await getProducts(req,res);
}

export const userGetProductCategories = async(req:Request,res:Response)=>{
    return await getProductCategories(req,res);
}