import html2canvas from 'html2canvas';
import { api } from 'src/boot/axios';
const base_url = 'http://localhost:4000/getImage/';

export const getImage = (val: string | null) => `${base_url}${val}`;

//auth
export const login = (val:object) => api.post('/auth/login',val)
export const logout = (val:object) => api.post('/auth/logout',val)
export const getMyProfile = () => api.post('/auth/getMyProfile')
export const UpdateProfile = (val:object) => api.post('/auth/UpdateProfile',val)
export const createUser = (val:object) => api.post('/auth/createUser',val)

//admin
export const insertProduct = (val:FormData) => api.post('/admin/insertProduct',val)
export const updateProducts = (val:FormData) => api.post('/admin/updateProducts',val)
export const insertItems = (val:FormData) => api.post('/admin/insertItems',val)
export const updateItems = (val:FormData) => api.post('/admin/updateItems',val)
export const insertProductCategory = (val:object) => api.post('/admin/insertProductCategory',val)
export const insertItemCategory = (val:object) => api.post('/admin/insertItemCategory',val)
export const insertCustomerTables = (val:object) => api.post('/admin/insertCustomerTables',val)
export const checkOutOrder = (val:object) => api.post('/admin/checkOutOrder',val)
export const emptyTable = (val:object) => api.post('/admin/emptyTable',val)
export const deleteUser = (val:object) => api.post('/admin/deleteUser',val)
export const updateRole = (val:object) => api.post('/admin/updateRole',val)
export const subtractQuantity = (val:object) => api.post('/admin/subtractQuantity',val)
export const deleteItems = (val:object) => api.post('/admin/deleteItems',val)
export const deleteProduct = (val:object) => api.post('/admin/deleteProduct',val)
export const deleteProductCategory = (val:object) => api.post('/admin/deleteProductCategory',val)
export const deleteTable = (val:object) => api.post('/admin/deleteTable',val)
export const addQuantity = (val:object) => api.post('/admin/addQuantity',val)
export const deleteItemsCategory = (val:object) => api.post('/admin/deleteItemsCategory',val)
export const adminGetAllProductsCategories = (param:object) =>api.get('/admin/adminGetAllProductsCategories',param)
export const adminGetAllItemsCategories = (param:object) =>api.get('/admin/adminGetAllItemsCategories',param)
export const adminOrderHistoryData = (param:object) =>api.get('/admin/adminOrderHistoryData',param)
export const adminGetAllItems = (param:object) =>api.get('/admin/adminGetAllItems',param)
export const AdminList = (param:object) =>api.get('/admin/AdminList',param)
export const adminGetAllProducts = (param:object) =>api.get('/admin/adminGetAllProducts',param)
export const AdminAllCustomerTable = (param:object) =>api.get('/admin/AdminAllCustomerTable',param)
export const adminNewOrdersUnpaid = (param:object) =>api.get('/admin/adminNewOrdersUnpaid',param)
export const adminNewOrdersPaid = (param:object) =>api.get('/admin/adminNewOrdersPaid',param)
export const adminCustomersTable = () =>api.get('/admin/adminCustomersTable')
export const getAdminItemDistictCategory = () =>api.get('/admin/getAdminItemDistictCategory')
export const adminGetAllDataDashBoardRequired = () =>api.get('/admin/adminGetAllDataDashBoardRequired')
export const userCustomersTable = () =>api.get('/user/userCustomersTable')

//user
export const getProductCategories = (val:object) => api.post('/user/userGetProductCategories',val)
export const addUserOrder = (val:object) => api.post('/user/addUserOrder',val)
export const userReciept = (val:object) => api.post('/user/userReciept',val)
export const userCheckIfTheresSameOrderID = (val:object) => api.post('/user/userCheckIfTheresSameOrderID',val)
export const getProducts = (params:object) => api.get('/user/userGetProducts',params)
export const resetOrdersGoBacktoIndex = (val:object) => api.post('/user/goBackToIndex',val)

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
export const humanizeDateMonthlyDate = (dateString: string) => {
  const date = new Date(dateString);
  console.log(date , dateString)
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  };

  // Using Intl.DateTimeFormat to format the date in a human-readable way
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export const downloadReciept = async ( reciept: HTMLDataElement) => {
  if (reciept) {
    try {
      const canvas = await html2canvas(reciept);
      const imageData = canvas.toDataURL('image/png');

      //create an image element or download the image

      const imgElement = document.createElement('img');
      imgElement.src = imageData;
      document.body.appendChild(imgElement);

      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'reciept.png';
      link.click();
    } catch (error) {
      console.error('Error capturing element:', error);
    }
  } else {
    console.error('Element not found');
  }
};

