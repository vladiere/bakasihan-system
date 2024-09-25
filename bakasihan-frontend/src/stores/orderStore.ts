import { defineStore } from "pinia";
import { ref } from "vue";
import { myOrderT, foodOrder } from "src/components/models";

export const useOrderStore = defineStore('order', () => {
  const myOrder = ref<myOrderT | null>({
    order_no: null,
    foods: [],
    drinks: [],
    table_no: null,
    order_type: null,
    customer_name: null,
    total_amount: 0, // Initialize to 0 instead of null
  });

  const addFoods = (order: foodOrder) => {
    if (!myOrder.value) return; // Exit if myOrder is null

    const existingProduct = myOrder.value.foods.find(prod => prod?.id === order.id);

    if (existingProduct) {
      // Update quantity if the product already exists
      existingProduct.quantity = (existingProduct.quantity || 0) + 1; // Increment quantity
      myOrder.value.total_amount += existingProduct.price
    } else {
      // Add new product if it doesn't exist
      myOrder.value.foods.push(order); // Initialize quantity to 1
      myOrder.value.total_amount += order.price || 0; // Use 0 as a fallback
    }
  };


  const addDrinks = (order: foodOrder) => {
    if (!myOrder.value) return; // Exit if myOrder is null

    const existingProduct = myOrder.value.drinks.find(prod => prod?.id === order.id);

    if (existingProduct) {
      // Update quantity if the product already exists
      existingProduct.quantity = (existingProduct.quantity || 0) + 1; // Increment quantity
      myOrder.value.total_amount += existingProduct.price
    } else {
      // Add new product if it doesn't exist
      myOrder.value.drinks.push(order); // Initialize quantity to 1
      myOrder.value.total_amount += order.price || 0; // Use 0 as a fallback
    }
  };

  const removeDrinks = (order: number) => {
    if (myOrder.value) {
      const index = myOrder.value.drinks.findIndex((drink) => drink?.id === order);
      if (index !== -1) {
        const removedDrink = myOrder.value.drinks.splice(index, 1)[0]; // Remove and get the drink
        myOrder.value.total_amount -= removedDrink?.price || 0; // Subtract its price
      }
    }
  };

  const removeFoods = (order: number) => {
    if (myOrder.value) {
      const index = myOrder.value.foods.findIndex((food) => food?.id === order);
      if (index !== -1) {
        const removedFood = myOrder.value.foods.splice(index, 1)[0]; // Remove and get the food
        myOrder.value.total_amount -= removedFood?.price || 0; // Subtract its price
      }
    }
  };

  const addCustomerName = (input:string)=>{
    if(myOrder.value){
      myOrder.value.customer_name = input
    }
  }

  return { myOrder, addFoods, addDrinks, removeDrinks, removeFoods,addCustomerName }; // Return the state and actions
});
