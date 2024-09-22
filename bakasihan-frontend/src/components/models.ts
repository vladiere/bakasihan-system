export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}


export interface userAuthT{
  username:string
}
export interface loginT{
  username:string
  password:string
}
export interface PaginationProps {
  page: number;
  rowsPerPage: number;
  sortBy: string;
  descending: boolean;
}
export interface TableRequestProps {
  pagination: PaginationProps;
}
export interface categoryDataT {
  actions:categoryT;
  id:number;
  category_name:string;
}
export interface categoryT {
  id:number;
  category_name:string;
}
export interface productsDataT{
  actions:productsDataT
  id:number
  category_id:number
  product_image:string
  product_name:string
  product_description:string
  price:number
  status:number
}
export interface productT{
  id:number
  category_id:number
  product_image:string
  product_name:string
  product_description:string
  price:number
  status:number
}
export interface customersTableDataT{
  id:number
  table_no:number
  order_no:string|null
  status:number
}

export interface productsDataAllT{
  id: number;
    category_name: string;
    products: productT[];
}
