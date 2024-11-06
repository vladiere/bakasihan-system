export interface userRegT {
    username:string;
    password:string;
    confirm_password:string;
    first_name:string
    last_name:string
    gender:string
}
export interface userLoginT {
    username:string;
    password:string;
}
export interface userDataT{
    id:number;
    username:string;
    password:string;
    status:number
}