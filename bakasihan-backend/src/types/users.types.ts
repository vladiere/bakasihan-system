export interface userRegT {
    username:string;
    password:string;
    confirm_password:string;
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