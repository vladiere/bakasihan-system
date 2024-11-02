<template>
  <q-page padding class="fit column">
    <div class="justify-start">
      <q-btn
        label="Goback"
        icon="undo"
        color="secondary"
        @click="orderStore.previewProcess()"
      />
      <q-btn
        label="Refresh"
        icon="refresh"
        @click="handleGetCustomerTables"
        color="primary"
      />
    </div>
    <!-- content -->
    <div
      class="col row items-center justify-center flex-wrap q-gutter-x-lg full-height"
    >
      <TableComponent
        v-for="table in customerTables"
        :key="table.id"
        :table_no="table.table_no"
        :order_no="table.order_no ?? ''"
        :status="table.status"
        @click="tableSelected(table.table_no)"
      />
    </div>
    <div class="col row items-end justify-between q-px-lg">
      <div class="row items-center q-gutter-x-lg">
        <div class="row items-center q-gutter-x-sm">
          <div class="q-pa-md bg-green" style="border-radius: 50%"></div>
          <span class="text-body1 text-weight-normal">Vacant</span>
        </div>
        <div class="row items-center q-gutter-x-sm">
          <div class="q-pa-md bg-red-5" style="border-radius: 50%"></div>
          <span class="text-body1 text-weight-normal">Occupied</span>
        </div>
        <div class="row items-center q-gutter-x-sm">
          <div class="q-pa-md bg-grey-8" style="border-radius: 50%"></div>
          <span class="text-body1 text-weight-normal">On hold</span>
        </div>
      </div>
      <div class="row items-center q-gutter-x-md">
        <q-btn
          dense
          flat
          v-if="isSelected"
          color="grey-6"
          label="cancel"
          @click="cancelSelect"
          class="q-px-md"
        />
        <q-btn
          dense
          :disabled="!isSelected"
          :color="isSelected ? 'positive' : 'grey-6'"
          label="select & place order"
          @click="clicked"
          class="q-px-md"
        />
      </div>
    </div>
  </q-page>
  <q-dialog v-model="processDialog">
    <q-card>
      <q-card-section class="text-center">
        Are you sure you want to place the order?
      </q-card-section>
      <q-card-section>
        <div class="flex justify-evenly">
          <q-btn
            label="No"
            icon="close"
            color="negative"
            @click="processDialog = false"
          />
          <q-btn
            label="Yes"
            icon="check"
            color="positive"
            @click="ProceedtoReciept"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { addUserOrder, userCustomersTable } from 'src/services/api.services';
import TableComponent from 'components/TableComponent.vue';
import { io } from 'socket.io-client';
import { customersTableDataT } from 'src/components/models';
import { useOrderStore } from 'src/stores/orderStore';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const customerTables = ref<Array<customersTableDataT>>([]);
const socketServerApiURL = 'http://localhost:7000';
const adminRoom = 'bakasihanAdmin';
const socket = io(socketServerApiURL);
const isSelected = ref(false);
const processDialog = ref(false);
const orderStore = useOrderStore();

const handleGetCustomerTables = async () => {
  await userCustomersTable()
    .then((response) => {
      if (response) {
        customerTables.value = response.data.customer_tables;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const ProceedtoReciept = async () => {
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
      processDialog.value = false;
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
const cancelSelect = () => {
  isSelected.value = false;
  orderStore.removeTable();
};
const tableSelected = (table_no: number) => {
  isSelected.value = true;
  orderStore.addTableNo(table_no);
};

const clicked = () => {
  processDialog.value = true;
};
onMounted(() => {
  handleGetCustomerTables();
});
watchEffect(() => {
  socket.on('connect', () => {
    console.log('socket is connected successfully');
    socket.emit('joinAdminOrderRoom', adminRoom);
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
});
</script>
