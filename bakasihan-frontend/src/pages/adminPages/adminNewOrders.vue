<template>
  <q-page padding>
    <q-input
      filled
      v-model="newOrderStore.search"
      label="Search"
      debounce="1000"
      @input="newOrderStore.onSearch"
    />
    <q-table
      title="New Orders"
      :rows-per-page-options="[5, 10, 20, 50]"
      :rows="newOrderStore.newOrders"
      :columns="columns"
      :loading="newOrderStore.loading"
      v-model:pagination="newOrderStore.pagination"
      :row-key="(row:newOrdersDataT) => row.id"
      @request="newOrderStore.handleRequest"
    >
      <template v-slot:body-cell-total_amount="props">
        <q-td :props="props">
          <span>{{ formatToCurrency(props.row.total_amount || 0) }}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="visibility"
            label="View Orders"
            color="positive"
            @click="viewOrders(props.row.orders)"
          />
          <q-btn
            icon="check"
            label="Checkout Order"
            color="primary"
            @click="checkoutOrder(props.row.order_no, props.row.customer_name)"
          />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="ordersDialog">
      <q-card>
        <q-card-section>
          <div class="flex justify-end">
            <span
              ><q-btn flat icon="close" @click="ordersDialog = false"
            /></span>
          </div>
          <h6 class="text-center">Orders</h6>
        </q-card-section>
        <q-card-section>
          <q-list
            bordered
            separator
            v-for="order in JSON.parse(`${Orders}`)"
            :key="order?.id"
          >
            <p class="text-center">{{ order?.category_name }}</p>
            <q-item v-for="prod in order?.products" :key="prod?.id">
              <q-item-section avatar>
                <q-avatar color="accent" text-color="white">
                  <img :src="getImage(prod?.product_image || '')" alt="" />
                </q-avatar>
              </q-item-section>

              <q-item-section>{{ prod?.product_name }}</q-item-section>
              <q-item-section>{{
                formatToCurrency(prod?.price || 0)
              }}</q-item-section>
              <q-item-section>*{{ prod?.quantity }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <q-btn
            icon="check"
            color="positive"
            label="Okay"
            @click="ordersDialog = false"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNewOrderStore } from 'src/stores/NewOrdersStore';
import { newOrdersDataT, productsOrderDataT } from 'src/components/models';
import { formatToCurrency, getImage } from 'src/services/api.services';
import { useRouter } from 'vue-router';

const newOrderStore = useNewOrderStore();
const router = useRouter();
const Orders = ref<Array<productsOrderDataT | null>>([]);
const ordersDialog = ref(false);
interface Column {
  name: string;
  label: string;
  align: 'left' | 'center' | 'right';
  field: string | ((row: newOrdersDataT) => newOrdersDataT);
  sortable?: boolean;
}
const checkoutOrder = (orderNO: string, customername: string) => {
  router.push(`/admin/check-out-order/${orderNO}/${customername}`);
};

const columns: Column[] = [
  {
    name: 'id',
    label: 'ID',
    align: 'left',
    field: 'id',
    sortable: false,
  },
  {
    name: 'order_no',
    label: 'Order No.',
    align: 'left',
    field: 'order_no',
    sortable: false,
  },
  {
    name: 'table_no',
    label: 'Table No.',
    align: 'left',
    field: 'table_no',
    sortable: false,
  },
  {
    name: 'order_type',
    label: 'Order Type',
    align: 'left',
    field: 'order_type',
    sortable: false,
  },
  {
    name: 'customer_name',
    label: 'Customer Name',
    align: 'left',
    field: 'customer_name',
    sortable: false,
  },
  {
    name: 'total_amount',
    label: 'Total Amount',
    align: 'left',
    field: 'total_amount',
    sortable: false,
  },
  {
    name: 'actions',
    label: 'Action',
    align: 'center',
    field: (row: newOrdersDataT) => row, // Example field function
  },
];

const viewOrders = (data: Array<productsOrderDataT | null>) => {
  Orders.value = data; // Merge with existing Orders
  ordersDialog.value = true;
};
onMounted(() => {
  newOrderStore.onRequest(
    '',
    newOrderStore.pagination.page,
    newOrderStore.pagination.rowsPerPage
  );
});
</script>

<style scoped></style>
