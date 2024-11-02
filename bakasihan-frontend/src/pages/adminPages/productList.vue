<template>
  <div>
    <q-page padding>
      <h4 class="text-center">Menu List</h4>
      <q-input
        filled
        v-model="search"
        label="Search"
        debounce="1000"
        @input="onSearch"
      />
      <q-table
        title="Product's Lists"
        :rows-per-page-options="[5, 10, 20, 50]"
        :rows="rows"
        :columns="columns"
        :loading="loading"
        v-model:pagination="pagination"
        :row-key="(row:productsDataT) => row.id"
        @request="handleRequest"
      >
        <template v-slot:body-cell-product_image="props">
          <q-td :props="props">
            <img
              :src="getImage(props.row.product_image)"
              width="100dvw"
              height="100dvh%"
              alt="product_image"
              srcset=""
            />
          </q-td>
        </template>
        <template v-slot:body-cell-price="props">
          <q-td :props="props">
            <span>{{ formatToCurrency(props.row.price) }}</span>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td>
            <q-btn
              color="green-7"
              icon="visibility"
              label="View"
              @click="view(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import {
  productsDataT,
  TableRequestProps,
  productT,
} from 'src/components/models';
import {
  adminGetAllProducts,
  formatToCurrency,
  getImage,
} from 'src/services/api.services';
import { ref, onMounted, watch } from 'vue';

const loading = ref<boolean>(false);
const search = ref<string>('');
const rows = ref<Array<productsDataT>>([]);
interface Column {
  name: string;
  label: string;
  align: 'left' | 'center' | 'right';
  field: string | ((row: productsDataT) => productsDataT);
  sortable?: boolean;
}
const viewData = ref<productT | null>(null);
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
  sortBy: 'id',
  descending: false,
  rowsNumber: 0,
});
const columns: Column[] = [
  {
    name: 'id',
    label: 'ID',
    align: 'left',
    field: 'id',
    sortable: false,
  },
  {
    name: 'category_name',
    label: 'Category Name',
    align: 'left',
    field: 'category_name',
    sortable: false,
  },
  {
    name: 'product_image',
    label: 'Product image',
    align: 'left',
    field: 'product_image',
    sortable: false,
  },
  {
    name: 'product_name',
    label: 'Product Name',
    align: 'left',
    field: 'product_name',
    sortable: false,
  },
  {
    name: 'product_description',
    label: 'Product Description',
    align: 'left',
    field: 'product_description',
    sortable: false,
  },
  {
    name: 'price',
    label: 'Price',
    align: 'left',
    field: 'price',
    sortable: false,
  },
  {
    name: 'actions',
    label: 'Action',
    align: 'center',
    field: (row: productsDataT) => row, // Example field function
  },
];

const onRequest = async (search = '', page = 0, perpage = 5) => {
  loading.value = true;
  await adminGetAllProducts({
    params: {
      page,
      per_page: perpage,
      search: search, // Include the search term
    },
  })
    .then((response) => {
      loading.value = false;
      const data = response.data;
      rows.value = data.products;
      pagination.value.page = data.current_page;
      pagination.value.rowsNumber = data.total;
      pagination.value.rowsPerPage = data.per_page;
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
    });
};

const handleRequest = (props: TableRequestProps) => {
  pagination.value.rowsPerPage = props.pagination.rowsPerPage;
  onRequest(search.value, props.pagination.page, props.pagination.rowsPerPage);
};
const onSearch = () => {
  pagination.value.page = 1; // Reset to the first page
  onRequest(search.value, pagination.value.page, pagination.value.rowsPerPage);
};
watch(search, () => {
  onSearch();
});
onMounted(() => {
  onRequest(search.value, pagination.value.page, pagination.value.rowsPerPage);
});
const view = (data: productT) => {
  viewData.value = { ...data };
};
</script>

<style scoped></style>
