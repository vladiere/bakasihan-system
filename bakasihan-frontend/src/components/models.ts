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
