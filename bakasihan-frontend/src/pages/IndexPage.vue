<template>
  <q-page class="q-pa-md">
    <div
      class="text-center"
      v-for="category in productsMenu"
      :key="category.id"
    >
      <h5>{{ category.category_name }}</h5>
      <div class="row items-center justify-evenly">
        <FoodMenuCard
          v-for="menu in category.products"
          :key="menu.id"
          :products="menu"
          class="menu-item"
          @click="addtoCart(menu)"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import FoodMenuCard from 'components/FoodMenuCard.vue';
import { onMounted, ref, watch } from 'vue';
import { getProducts } from 'src/services/api.services';
import { useRouter } from 'vue-router';
import { productsDataAllT, productT, foodOrder } from 'src/components/models';
import { useOrderStore } from 'src/stores/orderStore';

const router = useRouter();
const orderStore = useOrderStore();
watch(
  () => router.currentRoute.value,
  (newVal, _oldVal) => {
    console.log(newVal.query.search);
  }
);
const productsMenu = ref<Array<productsDataAllT>>([]);
const loading = ref(false);

const getUserProducts = async () => {
  loading.value = true;
  await getProducts()
    .then((response) => {
      if (response) {
        loading.value = true;
        productsMenu.value = response.data.products;
      }
    })
    .catch((err) => {
      loading.value = true;
      console.log(err);
    });
};
const addtoCart = (data: productT) => {
  const NewData: foodOrder = {
    id: data.id,
    category_id: data.category_id,
    product_image: data.product_image,
    product_name: data.product_name,
    product_description: data.product_description,
    price: data.price,
    status: data.status,
    quantity: 1,
  };
  if (data.category_id == 1) {
    orderStore.addFoods(NewData);
  } else {
    orderStore.addDrinks(NewData);
  }
};
onMounted(() => {
  getUserProducts();
});
</script>
<style>
.menu-item:hover {
  cursor: pointer;
  box-shadow: 0 0 10px #000;
}
</style>
