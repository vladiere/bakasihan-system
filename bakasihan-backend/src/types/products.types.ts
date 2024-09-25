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