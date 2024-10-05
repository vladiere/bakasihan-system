import { Product } from "./products.types"
export interface customersTableTypes {
    id:number
    table_no:number
    order_no:string|null
    status:number
}
export interface recieptTypes{
        order_no:string|null
        foods:Array<Product|null>
        drinks:Array<Product|null>
        table_no:number|null
        order_type:string|null
        customer_name:string|null
        total_amount:number
        status:string,
        ctime:string
}