<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 280px
</style>

<template>
  <q-card class="my-card q-ma-sm" bordered v-if="props.products">
    <img :src="getImage(props.products.product_image)" />
    <q-list>
      <q-item>
        <q-item-section avatar>
          <q-item-label>{{ props.products.product_name }}</q-item-label>
          <q-item-label caption>{{
            props.products.product_description
          }}</q-item-label>
        </q-item-section>
        <q-item-section
          >{{ formatToCurrency(props.products.price) }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import { getImage, formatToCurrency } from 'src/services/api.services';
import { productT } from './models';
import { PropType } from 'vue';

const props = defineProps({
  products: {
    type: Object as PropType<productT>,
  },
});
console.log(props.products);
</script>
