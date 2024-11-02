<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 280px
  &.disabled
    opacity: 0.5
    pointer-events: none
</style>

<template>
  <q-card
    class="my-card q-ma-sm"
    bordered
    v-if="props.products"
    :class="{ disabled: props.products.status !== 1 }"
  >
    <img
      v-if="props.products.product_image"
      :src="getImage(props.products.product_image)"
    />
    <div v-if="props.products.status !== 1" class="not-available">
      Not Available
    </div>
    <q-list v-else>
      <q-item>
        <q-item-section avatar>
          <q-item-label>{{ props.products.product_name }}</q-item-label>
          <q-item-label caption>
            {{ props.products.product_description }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          {{ formatToCurrency(props.products.price) }}
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
    type: Object as PropType<productT | null>,
  },
});
console.log(props.products);
</script>

<style lang="sass" scoped>
.not-available
  text-align: center
  font-weight: bold
  color: red
</style>
