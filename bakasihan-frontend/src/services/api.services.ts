import { api } from 'src/boot/axios';
const base_url = 'http://localhost:4000/getImage/';

export const getImage = (val: string | null) => `${base_url}${val}`;

//auth
export const login = (val:object) => api.post('/auth/login',val)
export const logout = (val:object) => api.post('/auth/logout',val)

//admin
export const insertProduct = (val:FormData) => api.post('/admin/insertProduct',val)
export const insertProductCategory = (val:object) => api.post('/admin/insertProductCategory',val)
export const insertCustomerTables = (val:object) => api.post('/admin/insertCustomerTables',val)
export const adminGetAllProductsCategories = (param:object) =>api.get('/admin/adminGetAllProductsCategories',param)
export const adminGetAllProducts = (param:object) =>api.get('/admin/adminGetAllProducts',param)
export const adminCustomersTable = () =>api.get('/admin/adminCustomersTable')

//user
export const getProductCategories = (val:object) => api.post('/user/userGetProductCategories',val)
export const getProducts = () => api.get('/user/userGetProducts')

//exported functions

export const formatToCurrency =(amount:number, currency = 'PHP', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
  }).format(amount);
}
