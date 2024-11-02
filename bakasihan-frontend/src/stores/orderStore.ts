import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { myOrderT, foodOrder } from 'src/components/models';
import { productsDataAllT } from '../components/models';

export const useOrderStore = defineStore('order', () => {
  // Initialize order process

  // Retrieve myOrder from localStorage or use default values
  const storedOrder = localStorage.getItem('myOrder');
  const myOrder = ref<myOrderT | null>(storedOrder ? JSON.parse(storedOrder) : {
    order_no: null,
    orders: [],
    table_no: null,
    order_type: null,
    customer_name: null,
    total_amount: 0,
    order_process:1
  });

  // Watch myOrder changes and save them to localStorage
  watch(myOrder, (newOrder) => {
    localStorage.setItem('myOrder', JSON.stringify(newOrder));
  }, { deep: true });

  const addOrders = (category: productsDataAllT, order: foodOrder) => {
    if (!myOrder.value) return;

    // Find the index of the existing category in the orders array
    const categoryIndex = myOrder.value.orders.findIndex(c => c?.id === category.id);

    if (categoryIndex === -1) {
      // If category doesn't exist, add it with the product
      myOrder.value.orders.push({
        ...category,
        products: [order], // Add the new product in the category
      });
      myOrder.value.total_amount += order.price || 0; // Update the total amount
    } else {
      // Category exists, find the product in this category
      const existingProduct = myOrder.value?.orders[categoryIndex]?.products.find(prod => prod?.id === order.id);

      if (existingProduct) {
        // If product exists, increment its quantity
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
        myOrder.value.total_amount += existingProduct.price || 0;
      } else {
        // If product doesn't exist, add it to the category
        myOrder.value?.orders[categoryIndex]?.products.push(order);
        myOrder.value.total_amount += order.price || 0;
      }
    }
  };

  const removeOrders = (categoryID: number, orderID: number) => {
    if (!myOrder.value) return;

    // Find the category index
    const categoryIndex = myOrder.value.orders.findIndex(c => c?.id === categoryID);
    if (categoryIndex === -1) return; // Exit if the category is not found

    // Find the product index in the category's products array
    const productIndex = myOrder.value.orders[categoryIndex]?.products.findIndex(prod => prod?.id === orderID);
    if (productIndex === -1 || productIndex === undefined) return; // Exit if the product is not found
      // Remove the product from the category if its quantity is 1 or less
      const removedProduct = myOrder.value?.orders[categoryIndex]?.products.splice(productIndex, 1)[0];
      // Adjust the total amount by the removed product's price
      myOrder.value.total_amount -= Math.floor((removedProduct?.price || 0) * (removedProduct?.quantity || 0)) || 0;

    // Optionally, if there are no products left in the category, you can remove the entire category
    if (myOrder.value?.orders[categoryIndex]?.products.length === 0) {
      myOrder.value.orders.splice(categoryIndex, 1);
    }
  };

  const addCustomerName = (input: string) => {
    if (myOrder.value) {
      myOrder.value.customer_name = input;
    }
  };

  const subtractQuantity = (categoryID:number,orderID: number) => {
    if (!myOrder.value) return;

    // Find the category index
    const categoryIndex = myOrder.value.orders.findIndex(c => c?.id === categoryID);
    if (categoryIndex === -1) return; // Exit if the category is not found

    // Find the product index in the category's products array
    const productIndex = myOrder.value.orders[categoryIndex]?.products.findIndex(prod => prod?.id === orderID);
    if (productIndex === -1 || productIndex === undefined) return; // Exit if the product is not found

    const product = myOrder.value?.orders[categoryIndex]?.products[productIndex];

if (product?.quantity && product.quantity > 1) {
      // Decrease the product's quantity
      product.quantity -= 1;
      // Adjust the total amount
      myOrder.value.total_amount -= product.price || 0;
    }
  };

  const addQuantity = (categoryID:number,orderId: number) => {
    if (!myOrder.value) return;

    // Find the category index
    const categoryIndex = myOrder.value.orders.findIndex(c => c?.id === categoryID);
    if (categoryIndex === -1) return; // Exit if the category is not found

    // Find the product index in the category's products array
    const productIndex = myOrder.value.orders[categoryIndex]?.products.findIndex(prod => prod?.id === orderId);
    if (productIndex === -1 || productIndex === undefined) return; // Exit if the product is not found

    const product = myOrder.value?.orders[categoryIndex]?.products[productIndex];
    if (product?.quantity && product.quantity > 0) {
      // Decrease the product's quantity
      product.quantity += 1;
      // Adjust the total amount
      myOrder.value.total_amount += product.price || 0;
    }
  };

  const resetOrders = () => {
    myOrder.value = {
      order_no: null,
      orders: [],
      table_no: null,
      order_type: null,
      customer_name: null,
      total_amount: 0,
      order_process: 1,
    };
  };

  const proceedOrder = () => {
    if (myOrder.value && typeof myOrder.value.order_process === 'number') {
      myOrder.value.order_process++; // Increment order_process by 1
    }
  };

  const previewProcess = () => {
    if (myOrder.value && typeof myOrder.value.order_process === 'number') {
      if (myOrder.value.order_process > 1) {
        myOrder.value.order_process--; // Decrement order_process by 1 if it's greater than 1
      } else {
        myOrder.value.order_process = 1; // Set order_process to 1 if it falls below 1
      }
    }
  };
  const addOrderID = (randN:string)=>{
    if(myOrder.value){
      myOrder.value.order_no = randN
    }
  }
  const addOrderType = (type:string)=>{
    if(myOrder.value){
      myOrder.value.order_type = type
    }
  }
  const proceedToReciept = ()=>{
    if(myOrder.value){
      myOrder.value.order_process = 4
    }
  }
  const addTableNo = (table_no:number)=>{
    if(myOrder.value){
      myOrder.value.table_no = table_no
    }
  }
  const removeTable = ()=>{
    if(myOrder.value){
      myOrder.value.table_no = null
    }
  }

  return {
    myOrder,
    addOrders,
    proceedOrder,
    previewProcess,
    addOrderID,
    addTableNo,
    removeTable,
    proceedToReciept,
    resetOrders,
    removeOrders,
    addOrderType,
    addCustomerName,
    subtractQuantity,
    addQuantity
  };
});
