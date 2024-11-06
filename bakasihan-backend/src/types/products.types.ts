export interface countTable{
    total:number
}

export interface Product {
    id:number
    category_id:number
    product_image:string
    product_name:string
    product_description:string
    price:number
    status:number
  }
  
 export interface Category {
    id: number;
    category_name: string;
    products: Product[];
  }

  export interface myOrderhistoryT{
    id:number
    order_no:string|null
    orders:Array<productsOrderDataT | null>
    table_no:number|null
    customer_name:string|null
    total_amount:number
    customer_cash:number|null
    customer_change:number|null
    ctime:string|null
  }
  
  export interface myOrderT{
    order_no:string|null
    orders:Array<productsOrderDataT | null>
    table_no:number|null
    order_type:string|null
    customer_name:string|null
    total_amount:number
    order_process:number
  }
  export interface productsOrderDataT{
    id: number;
    category_name: string;
    products: Array<foodOrder | null>;
  }
  export interface foodOrder{
    id:number
    category_id:number
    product_image:string
    product_name:string
    product_description:string
    price:number
    status:number
    quantity:number
  }