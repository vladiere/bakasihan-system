export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}


export interface userAuthT{
  username:string
  role:string
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
export interface productsListT{
  actions:productsListT
  id:number
  category_name:string
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
    products: Array<productT | null>;
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

export interface myOrderT{
  order_no:string|null
  orders:Array<productsOrderDataT | null>
  table_no:number|null
  order_type:string|null
  customer_name:string|null
  total_amount:number
  order_process:number
}
export interface recieptTypes{
  order_no:string|null
  orders:Array<productsOrderDataT | null>
  table_no:number|null
  order_type:string|null
  customer_name:string|null
  total_amount:number
  customer_cash:number
  customer_change:number
  status:string
  ctime:string
}
export interface newOrdersDataT{
  actions:newOrdersDataT
  id:number
  order_no:string|null
  orders:Array<productsOrderDataT | null>
  table_no:number|null
  order_type:string|null
  customer_name:string
  total_amount:number
  order_process:number
}
export interface NotificationOptions {
  body:string
  icon:string
  requireInteraction:boolean
  vibrate?: number[]; // Optional vibrate property
}
export interface ItemsDataT{
  actions:ItemsDataT
  id:number
  category_name:string
  item_picture:string
  item_name:string
  quantity:number
  price:number
  total_amount:number
  purchase_date:string
}
export interface ItemsT{
  id:number
  category_name:string
  item_picture:string
  item_name:string
  quantity:number
  price:number
  total_amount:number
  purchase_date:string
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
export interface myOrderhistoryDataT{
  actions:myOrderhistoryT
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
export interface usersDataT {
  actions:usersDataT
  id:number
  username:string
  status:string
  role:string
  fullname:string
  gender:string
}
export interface usersT {
  id:number
  username:string
  status:string
  first_name:string
  last_name:string
  gender:string
}
export interface createUserT{
  id:number
  username:string
  password:string
  first_name:string
  last_name:string
  gender:string
}