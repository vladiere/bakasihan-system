<template>
  <q-page padding>
    <q-input
      filled
      v-model="search"
      label="Search"
      debounce="1000"
      @input="onSearch"
    />
    <q-table
      title="Product's Category lists"
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
            v-if="authStore.user && authStore.user.role === 'super_admin'"
            flat
            icon="mdi-delete-outline"
            class="q-mx-xsm"
            @click="openDeleteDialog(props.row.id)"
          >
            <q-tooltip>Delete</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section
          >Are you sure you want to delete this Row?</q-card-section
        >
        <q-card-section>
          <q-btn
            flat
            icon="mdi-close"
            @click="deleteDialog = false"
            class="q-mx-sm"
          >
            <q-tooltip>No</q-tooltip>
          </q-btn>
          <q-btn
            flat
            icon="mdi-check"
            class="q-mx-sm"
            @click="handleDeleteCategory(ID)"
          >
            <q-tooltip>Yes</q-tooltip>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import {
  adminGetAllProductsCategories,
  deleteProductCategory,
} from 'src/services/api.services';
import { TableRequestProps, categoryDataT } from 'src/components/models';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/authStore';

const $q = useQuasar();
const authStore = useAuthStore();
const search = ref<string>('');
const loading = ref(false);
const rows = ref<Array<categoryDataT>>([]);
const ID = ref(0);
const deleteDialog = ref(false);
const openDeleteDialog = (val_id: number) => {
  ID.value = val_id;
  deleteDialog.value = true;
};
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

const handleDeleteCategory = async (val_id: number) => {
  loading.value = true;
  await deleteProductCategory({ id: val_id })
    .then((response) => {
      onRequest(
        search.value,
        pagination.value.page,
        pagination.value.rowsPerPage
      );
      $q.notify({
        color: 'positive',
        textColor: 'white',
        position: 'top',
        icon: 'check',
        message: response.data.message,
      });
      deleteDialog.value = false;
    })
    .catch((error) => {
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'close',
        message: error.response.data.message,
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped></style>
