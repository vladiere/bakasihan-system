<template>
  <q-page padding>
    <h4 class="text-center">Users Verified</h4>
    <q-input
      filled
      v-model="search"
      label="Search"
      debounce="1000"
      @input="onSearch"
    />
    <q-table
      title="Residents Profiles"
      :rows-per-page-options="[5, 10, 20, 50]"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      v-model:pagination="pagination"
      :row-key="(row:categoryDataT) => row.id"
      @request="handleRequest"
    >
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
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { adminGetAllProductsCategories } from 'src/services/api.services';
import {
  TableRequestProps,
  categoryDataT,
  categoryT,
} from 'src/components/models';

const search = ref<string>('');
const loading = ref(false);
const viewData = ref<categoryT | null>(null);
const rows = ref<Array<categoryDataT>>([]);
interface Column {
  name: string;
  label: string;
  align: 'left' | 'center' | 'right';
  field: string | ((row: categoryDataT) => categoryDataT);
  sortable?: boolean;
}
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
    name: 'actions',
    label: 'Action',
    align: 'center',
    field: (row: categoryDataT) => row, // Example field function
  },
];

const onRequest = async (search = '', page = 0, perpage = 5) => {
  loading.value = true;
  await adminGetAllProductsCategories({
    params: {
      page,
      per_page: perpage,
      search: search, // Include the search term
    },
  })
    .then((response) => {
      loading.value = false;
      const data = response.data;
      rows.value = data.categories;
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

const view = (data: categoryT) => {
  console.log(data);
  viewData.value = { ...data };
};
</script>

<style scoped></style>
