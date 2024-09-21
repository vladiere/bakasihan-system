import { api } from 'src/boot/axios';
const base_url = 'http://localhost:4000/api';

export const getImage = (val: string | null) => `${base_url}/images/${val}`;

//auth
export const login = (val:object) => api.post('/auth/login',val)
export const logout = (val:object) => api.post('/auth/logout',val)

//admin
export const insertProduct = (val:FormData) => api.post('/admin/insertProduct',val)
export const insertProductCategory = (val:object) => api.post('/admin/insertProductCategory',val)
export const adminGetAllProductsCategories = (param:object) =>api.get('/admin/adminGetAllProductsCategories',param)

//user
export const getProductCategories = (val:object) => api.post('/user/getProductCategories',val)
export const getProducts = (val:object) => api.post('/user/getProducts',val)
