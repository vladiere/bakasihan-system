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
export const userCustomersTable = () =>api.get('/user/userCustomersTable')

//user
export const getProductCategories = (val:object) => api.post('/user/userGetProductCategories',val)
export const addUserOrder = (val:object) => api.post('/user/addUserOrder',val)
export const userReciept = (val:object) => api.post('/user/userReciept',val)
export const userCheckIfTheresSameOrderID = (val:object) => api.post('/user/userCheckIfTheresSameOrderID',val)
export const getProducts = (params:object) => api.get('/user/userGetProducts',params)

//exported functions

export const formatToCurrency =(amount:number, currency = 'PHP', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
  }).format(amount);
}

export const generateRandomNumber = (min: number, max: number): string => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString(); // Convert number to string
}
export const humanizeDate = (dateString: string) => {
  const date = new Date(dateString);
  console.log(date , dateString)
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  // Using Intl.DateTimeFormat to format the date in a human-readable way
  return new Intl.DateTimeFormat('en-US', options).format(date);
}


