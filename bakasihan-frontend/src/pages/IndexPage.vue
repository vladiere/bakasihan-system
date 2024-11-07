<template>
  <q-page class="q-pa-md">
    <div class="flex justify-center" v-if="productStore.loading == true">
      <h5 class="text-center"><strong>Loading....</strong></h5>
    </div>
    <div
      class="flex justify-center"
      v-if="productStore.productsMenu.length < 1"
    >
      <h5 class="text-center">
        <strong>Product {{ productStore.search }} result 0.</strong>
      </h5>
    </div>
    <div
      v-else
      class="text-center"
      v-for="category in productStore.productsMenu"
      :key="category?.id"
    >
      <h5>{{ category?.category_name.toUpperCase() }}</h5>

      <div class="row items-center justify-evenly">
        <span v-if="category && category.products.length < 1"
          >No Data Available</span
        >
        <FoodMenuCard
          v-else
          v-for="menu in category?.products"
          :key="menu?.id"
          :products="menu"
          class="menu-item"
          @click="addtoCart(category, menu)"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import FoodMenuCard from 'components/FoodMenuCard.vue';
import { onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';
import { productT, foodOrder, productsDataAllT } from 'src/components/models';
import { useOrderStore } from 'src/stores/orderStore';
import { useProductStore } from 'src/stores/productStore';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();
const orderStore = useOrderStore();
const productStore = useProductStore();
watch(
  () => router.currentRoute.value,
  (newVal, _oldVal) => {
    console.log(newVal.query.search);
    console.log(_oldVal)
  }
);

let timer: NodeJS.Timeout | undefined;
const addtoCart = (
  category: productsDataAllT | null,
  data: productT | null
) => {
  $q.loading.show({
    message: 'proccessing order',
  });
  const newCategory: productsDataAllT | null = {
    id: category?.id || 0,
    category_name: category?.category_name || '',
    products: [],
  };
  const NewData: foodOrder | null = {
    id: data?.id || 0,
    category_id: data?.category_id || 0,
    product_image: data?.product_image || '',
    product_name: data?.product_name || '',
    product_description: data?.product_description || '',
    price: data?.price || 0,
    status: data?.status || 0,
    quantity: 1,
  };
  timer = setTimeout(() => {
    $q.loading.show({
      backgroundColor: 'positive',
      messageColor: 'white',
      message: 'Food successfully added to card',
    });

    timer = setTimeout(() => {
      $q.loading.hide();
      timer = void 0;
    }, 1000);
  }, 500);
  orderStore.addOrders(newCategory, NewData);
};
onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer);
    $q.loading.hide();
  }
});
</script>
<style>
.menu-item:hover {
  cursor: pointer;
  box-shadow: 0 0 10px #000;
}
</style>
