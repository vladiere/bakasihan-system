<template>
    <q-page padding>
        <div class="row q-gutter-md">
  <div class="col-12 col-md-5 col-sm-12">
    <q-input
      filled
      v-model="search"
      label="Search"
      debounce="1000"
      @input="onSearch"
    />
  </div>

  <div class="col-12 col-md-3 col-sm-12">
    <q-select
      v-model="order_type"
      dense
      :options="orderTypeOption"
      label="Order Type"
    />
  </div>

  <div class="col-12 col-md-3 col-sm-12">
    <q-select
      v-model="status"
      dense
      :options="statusOption"
      label="Status"
    />
  </div>
</div>

      <q-table
        title="Order's History"
        :rows-per-page-options="[5, 10, 20, 50]"
        :rows="newOrders"
        :columns="columns"
        :loading="loading"
        v-model:pagination="pagination"
        :row-key="(row:myOrderhistoryT) => row.id"
        @request="handleRequest"
      >
      <template v-slot:body-cell-row_number="props">
  <q-td :props="props">
    {{ (pagination.page - 1) * pagination.rowsPerPage + props.pageIndex + 1 }}
  </q-td>
</template>
        <template v-slot:body-cell-total_amount="props">
          <q-td :props="props">
            <span>{{ formatToCurrency(props.row.total_amount || 0) }}</span>
          </q-td>
        </template>
        <template v-slot:body-cell-customer_cash="props">
          <q-td :props="props">
            <span>{{ formatToCurrency(props.row.customer_cash || 0) }}</span>
          </q-td>
        </template>
        <template v-slot:body-cell-customer_change="props">
          <q-td :props="props">
            <span>{{ formatToCurrency(props.row.customer_change || 0) }}</span>
          </q-td>
        </template>
        <template v-slot:body-cell-ctime="props">
          <q-td :props="props">
            <span>{{ humanizeDate(props.row.ctime) }}</span>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
            flat
    icon="visibility"
    class="q-mx-xsm"
    @click="viewOrders(props.row.orders)"
  >
    <q-tooltip>View Orders</q-tooltip>
  </q-btn>
            <q-btn
            flat
              icon="check"
              @click="checkoutOrder(props.row.order_no, props.row.customer_name)"
            >
        <q-tooltip>Check Orders</q-tooltip>
        </q-btn>
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
  import { ref, onMounted, watch } from 'vue';
  import { myOrderhistoryT, productsOrderDataT, TableRequestProps } from 'src/components/models';
  import { adminOrderHistoryData, formatToCurrency, getImage,humanizeDate } from 'src/services/api.services';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const Orders = ref<Array<productsOrderDataT | null>>([]);
    const newOrders = ref<Array<myOrderhistoryT | null>>([])
  const ordersDialog = ref(false);
  const statusOption = ['paid','unpaid']
  const orderTypeOption = ['dine in','take out']
  const status = ref('')
  const order_type = ref('')
  const loading = ref(false);
  interface Column {
    name: string;
    label: string;
    align: 'left' | 'center' | 'right';
    field: string | ((row: myOrderhistoryT) => myOrderhistoryT);
    sortable?: boolean;
  }
  const checkoutOrder = (orderNO: string, customername: string) => {
    router.push(`/admin/check-out-order/${orderNO}/${customername}`);
  };
  
  const columns: Column[] = [
    {
      name: 'row_number',
      label: 'Row Number',
      align: 'left',
      field: '',
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
      name: 'customer_cash',
      label: 'Customer Cash',
      align: 'left',
      field: 'customer_cash',
      sortable: false,
    },
    {
      name: 'customer_change',
      label: 'Customers Change',
      align: 'left',
      field: 'customer_change',
      sortable: false,
    },
    {
      name: 'ctime',
      label: 'Date Order',
      align: 'left',
      field: 'ctime',
      sortable: false,
    },
    {
      name: 'actions',
      label: 'Action',
      align: 'center',
      field: (row: myOrderhistoryT) => row, // Example field function
    },
  ];
  watch([order_type, status], () => {
    onRequest(search.value, pagination.value.page, pagination.value.rowsPerPage,order_type.value,status.value);
});
  const viewOrders = (data: Array<productsOrderDataT | null>) => {
    Orders.value = data; // Merge with existing Orders
    ordersDialog.value = true;
  };
  const search = ref('');
  const pagination = ref({
    page: 1,
    rowsPerPage: 5,
    sortBy: 'id',
    descending: false,
    rowsNumber: 0,
  });
  watch(search, () => {
    onSearch()
  });

  const onRequest = async (search:string,currentpage:number,limit:number,order_type:string,status:string) => {
    loading.value = true;
    await adminOrderHistoryData({ params: { searchTerm: search,page:currentpage,per_page:limit,order_type:order_type,status:status } })
      .then((response) => {
        if (response) {
          loading.value = false;
          newOrders.value = Array.isArray(response.data.items) ? response.data.items : [];
          pagination.value.page = response.data.current_page;
          pagination.value.rowsNumber = response.data.total;
          pagination.value.rowsPerPage = response.data.per_page;
        }
      })
      .catch((err) => {
        loading.value = false;
        console.log(err);
      });
  };
  const handleRequest = (props: TableRequestProps) => {
    pagination.value.rowsPerPage = props.pagination.rowsPerPage;
    onRequest(search.value, props.pagination.page, props.pagination.rowsPerPage,order_type.value,status.value);
  };
  const onSearch = () => {
    pagination.value.page = 1; // Reset to the first page
    onRequest(search.value, pagination.value.page, pagination.value.rowsPerPage,order_type.value,status.value);
  };
  onMounted(() => {
    order_type.value = orderTypeOption[0]
    status.value = statusOption[0]
    onRequest(
      '',
      pagination.value.page,
      pagination.value.rowsPerPage,order_type.value,status.value
    );
  });
  </script>
  
  <style scoped></style>
  