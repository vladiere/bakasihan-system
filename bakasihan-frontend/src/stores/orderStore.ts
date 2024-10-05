import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { myOrderT, foodOrder } from 'src/components/models';

export const useOrderStore = defineStore('order', () => {
  // Initialize order process

  // Retrieve myOrder from localStorage or use default values
  const storedOrder = localStorage.getItem('myOrder');
  const myOrder = ref<myOrderT | null>(storedOrder ? JSON.parse(storedOrder) : {
    order_no: null,
    foods: [],
    drinks: [],
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

  const addFoods = (order: foodOrder) => {
    if (!myOrder.value) return;

    const existingProduct = myOrder.value.foods.find(prod => prod?.id === order.id);
    if (existingProduct) {
      // Update quantity if the product already exists
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
      myOrder.value.total_amount += existingProduct.price || 0;
    } else {
      // Add new product if it doesn't exist
      myOrder.value.foods.push(order);
      myOrder.value.total_amount += order.price || 0;
    }
  };

  const addDrinks = (order: foodOrder) => {
    if (!myOrder.value) return;

    const existingProduct = myOrder.value.drinks.find(prod => prod?.id === order.id);
    if (existingProduct) {
      // Update quantity if the product already exists
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
      myOrder.value.total_amount += existingProduct.price || 0;
    } else {
      // Add new product if it doesn't exist
      myOrder.value.drinks.push(order);
      myOrder.value.total_amount += order.price || 0;
    }
  };

  const removeDrinks = (order: number) => {
    if (myOrder.value) {
      const index = myOrder.value.drinks.findIndex((drink) => drink?.id === order);
      if (index !== -1) {
        const drink = myOrder.value.drinks[index];
        if (drink && drink?.quantity > 1) {
          myOrder.value.total_amount -= drink.price * drink.quantity;
          myOrder.value.drinks.splice(index, 1);
        } else {
          const removedDrink = myOrder.value.drinks.splice(index, 1)[0];
          myOrder.value.total_amount -= removedDrink?.price || 0;
        }
      }
    }
  };

  const removeFoods = (order: number) => {
    if (myOrder.value) {
      const index = myOrder.value.foods.findIndex((food) => food?.id === order);
      if (index !== -1) {
        const food = myOrder.value.foods[index];
        if (food && food?.quantity > 1) {
          myOrder.value.total_amount -= food.price * food.quantity;
          myOrder.value.foods.splice(index, 1);
        } else {
          const removedFood = myOrder.value.foods.splice(index, 1)[0];
          myOrder.value.total_amount -= removedFood?.price || 0;
        }
      }
    }
  };

  const addCustomerName = (input: string) => {
    if (myOrder.value) {
      myOrder.value.customer_name = input;
    }
  };

  const subtractQuantity = (orderID: number, param: string) => {
    if (!myOrder.value) return;

    switch (param) {
      case 'food': {
        const index = myOrder.value.foods.findIndex((food) => food?.id === orderID);
        if (index !== -1) {
          const foodItem = myOrder.value.foods[index];
          if (foodItem) {
            if (foodItem.quantity > 1) {
              foodItem.quantity--;
              myOrder.value.total_amount -= foodItem.price || 0;
            }
          }
        }
        break;
      }
      case 'drink': {
        const index = myOrder.value.drinks.findIndex((drink) => drink?.id === orderID);
        if (index !== -1) {
          const drinkItem = myOrder.value.drinks[index];
          if (drinkItem) {
            if (drinkItem.quantity > 1) {
              drinkItem.quantity--;
              myOrder.value.total_amount -= drinkItem.price || 0;
            }
          }
        }
        break;
      }
      default:
        console.warn(`Unhandled case for param: ${param}`);
        break;
    }
  };

  const addQuantity = (orderId: number, param: string) => {
    if (!myOrder.value) return;

    switch (param) {
      case 'food': {
        const index = myOrder.value.foods.findIndex((food) => food?.id === orderId);
        if (index !== -1) {
          const foodItem = myOrder.value.foods[index];
          if (foodItem) {
            foodItem.quantity++;
            myOrder.value.total_amount += foodItem.price || 0;
          }
        }
        break;
      }
      case 'drink': {
        const index = myOrder.value.drinks.findIndex((drink) => drink?.id === orderId);
        if (index !== -1) {
          const drinkItem = myOrder.value.drinks[index];
          if (drinkItem) {
            drinkItem.quantity++;
            myOrder.value.total_amount += drinkItem.price || 0;
          }
        }
        break;
      }
      default:
        console.warn(`Unhandled case for param: ${param}`);
        break;
    }
  };

  const resetOrders = () => {
    myOrder.value = {
      order_no: null,
      foods: [],
      drinks: [],
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
    addFoods,
    proceedOrder,
    previewProcess,
    addDrinks,
    addOrderID,
    addTableNo,
    removeTable,
    proceedToReciept,
    resetOrders,
    removeDrinks,
    addOrderType,
    removeFoods,
    addCustomerName,
    subtractQuantity,
    addQuantity
  };
});
