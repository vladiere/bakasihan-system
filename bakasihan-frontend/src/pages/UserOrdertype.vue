<template>
  <q-page>
    <div
      class="justify-center btns"
      v-if="
        orderStore.myOrder &&
        typeof orderStore.myOrder.order_process === 'number' &&
        orderStore.myOrder.order_process === 2
      "
    >
      <q-select
        v-model="order_type"
        dense
        label="select Order Type"
        :options="options"
      />
      <div class="btns flex justify-evenly">
        <q-btn
          icon="arrow-right"
          label="go back"
          color="negative"
          @click="orderStore.previewProcess"
        />
        <q-btn
          icon="arrow-left"
          label="Proceed"
          color="positive"
          @click="proceedToOrder"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { useOrderStore } from 'src/stores/orderStore';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { addUserOrder } from 'src/services/api.services';
const router = useRouter();
const $q = useQuasar();
const orderStore = useOrderStore();
const order_type = ref<string | null>(null);
const options = ['dine in', 'take out'];
const proceedToOrder = () => {
  if (order_type.value) {
    if (order_type.value === 'dine in') {
      orderStore.proceedOrder();
      router.push('/tables');
    }
    if (order_type.value === 'take out') {
      Reciept();
    }
  } else {
    $q.notify({
      type: 'negative',
      message: 'Please Select your Order Type',
    });
  }
};

const Reciept = async () => {
  const postData = {
    order_no: orderStore.myOrder?.order_no,
    foods: JSON.stringify(orderStore.myOrder?.foods),
    drinks: JSON.stringify(orderStore.myOrder?.drinks),
    table_no: orderStore.myOrder?.table_no,
    order_type: orderStore.myOrder?.order_type,
    customer_name: orderStore.myOrder?.customer_name,
    total_amount: orderStore.myOrder?.total_amount,
  };

  await addUserOrder(postData)
    .then((response) => {
      $q.notify({
        type: 'positive',
        message: response.data.message,
      });
      orderStore.proceedToReciept();
      router.push('/reciept');
    })
    .catch((err) => {
      $q.notify({
        type: 'negative',
        message: err.response.data.message,
      });
    });
};
watch(order_type, () => {
  orderStore.addOrderType(order_type.value || '');
});
watchEffect(() => {
  order_type.value = orderStore.myOrder?.order_type || '';
});
</script>

<style scoped>
.btns {
  margin-top: 2%;
}
</style>
