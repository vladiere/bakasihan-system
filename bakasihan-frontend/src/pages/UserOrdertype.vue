<template>
  <q-page padding>
    <div
    class="justify-center items-center btns center"
    v-if="
        orderStore.myOrder &&
        typeof orderStore.myOrder.order_process === 'number' &&
        orderStore.myOrder.order_process === 2
        "
    >
    <h5 class="header text-center">Order Type</h5>
      <q-select
        v-model="order_type"
        dense
        label="select Order Type"
        class="select"
        :options="options"
      />
      <div class="flex justify-evenly buttons">
        <q-btn
          icon="undo"
          label="go back"
          color="negative"
          @click="orderStore.previewProcess"
        />
        <q-btn
          icon="skip_next"
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
import { io } from 'socket.io-client';
import { useQuasar } from 'quasar';
import { addUserOrder } from 'src/services/api.services';
const router = useRouter();
const $q = useQuasar();
const orderStore = useOrderStore();
const socketServerApiURL = 'http://localhost:7000';
const adminRoom = 'bakasihanAdmin';
const socket = io(socketServerApiURL);
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
    orders: JSON.stringify(orderStore.myOrder?.orders),
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
      const newNotifaction = {
        room: adminRoom,
        message: 'New Order Has Arrived',
      };
      socket.emit('messageAdminOrder', newNotifaction);
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

  socket.on('connect', () => {
    console.log('socket is connected successfully');
    socket.emit('joinAdminOrderRoom', adminRoom);
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
});
</script>

<style scoped>
@media screen and (max-width:768px){
  .btns {
 width: 100%;
 margin-top: 50%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
}
.buttons{
  margin-top: 2%;
}
.select{
  width: inherit;
}
}
@media screen and (min-width:768px){
  .btns {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.buttons{
  margin-top: 2%;
}
.select{
  width: inherit;
}
}

</style>
