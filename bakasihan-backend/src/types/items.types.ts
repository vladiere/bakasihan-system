export interface ItemsDataT {
    id:number
    category_name:string
    item_picture:string
    item_name:string
    quantity:number
    price:number
    total_amount:number
    purchase_date:string
}
export interface amountDataT{
    total_amount:number
  }
  export interface countDataT{
    total_number:number
  }

export interface salesDataT{
    data_date:string
    sales:number
}
export interface usersDataT {
  id:number
  username:string
  status:string
  role:string
  fullname:string
  gender:string
}