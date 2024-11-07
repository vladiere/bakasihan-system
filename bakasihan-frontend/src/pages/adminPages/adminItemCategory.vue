<template>
  <q-page padding>
    <q-btn
      color="primary"
      icon="add"
      label="Add Item's Category"
      style="margin-bottom: 2%"
      @click="categoryDialog = true"
    />
    <q-input
      filled
      v-model="search"
      label="Search"
      debounce="1000"
      @input="onSearch"
    />
    <q-table
      title="Items's Category lists"
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
          v-if="props.row.category_name.toLowerCase() !== 'drinks' && authStore.user && authStore.user.role === 'super_admin'"
          flat
    icon="mdi-delete-outline"
    class="q-mx-sm"
    @click="openDeleteDialog(props.row.id,props.row.category_name)"
  >
    <q-tooltip>Delete</q-tooltip>
  </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
  <q-dialog v-model="categoryDialog">
    <q-card>
      <q-card-section>Add Category</q-card-section>
      <q-separator />
      <q-card-section>
        <q-form
          class="col column q-gutter-y-md full-width"
          @submit="handleInsertItemCategory"
        >
          <q-input
            v-model="formdata.category_name"
            color="dark"
            label="Category name"
            class="col"
          />
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-btn
          label="close"
          color="negative"
          icon="close"
          :disable="loading"
          :loading="loading"
          @click="categoryDialog = false"
        /><q-btn
          label="Submit"
          icon="check"
          color="positive"
          :disable="loading"
          :loading="loading"
          @click="handleInsertItemCategory"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="deleteDialog">
        <q-card>
            <q-card-section>Are you sure you want to <span v-if="cat_name.toLowerCase() === 'drinks'">reset</span><span v-else>delete</span> this Row?</q-card-section>
            <q-card-section>
                <q-btn flat icon="mdi-close" @click="deleteDialog = false" class="q-mx-sm">
                    <q-tooltip>No</q-tooltip>
                </q-btn>
                <q-btn flat icon="mdi-check" class="q-mx-sm" @click="handleDeleteCategory(ID,cat_name)">
                    <q-tooltip>Yes</q-tooltip>
                </q-btn>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import {
  adminGetAllItemsCategories,
  deleteItemsCategory,
  insertItemCategory,
} from 'src/services/api.services';
import {
  TableRequestProps,
  categoryDataT,
  categoryT,
} from 'src/components/models';
import { useQuasar } from 'quasar';
import {useAuthStore} from 'src/stores/authStore'

const search = ref<string>('');
const authStore = useAuthStore()
const loading = ref(false);
const categoryDialog = ref(false);
const $q = useQuasar();
const viewData = ref<categoryT | null>(null);
const rows = ref<Array<categoryDataT>>([]);
const formdata = ref({
  category_name: '',
});
interface Column {
  name: string;
  label: string;
  align: 'left' | 'center' | 'right';
  field: string | ((row: categoryDataT) => categoryDataT);
  sortable?: boolean;
}
const ID = ref(0)
const cat_name = ref('')
const deleteDialog = ref(false)
    const openDeleteDialog = (val_id:number,val_cat_name:string)=>{
        ID.value = val_id
        cat_name.value = val_cat_name
        deleteDialog.value = true
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
  await adminGetAllItemsCategories({
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

const handleInsertItemCategory = async () => {
  loading.value = true;
  await insertItemCategory({ category_name: formdata.value.category_name })
    .then((response) => {
      loading.value = false;
      formdata.value.category_name = '';
      categoryDialog.value = false;
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
    })
    .catch((error) => {
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'close',
        message: error.response.data.message,
      });
    });
};

const handleDeleteCategory = async(val_id:number,val_cat_name:string)=>{
  await deleteItemsCategory({id:val_id,category_name:val_cat_name}).then(response =>{
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
  }).catch(error =>{
    $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'close',
        message: error.response.data.message,
      });
  })
}

</script>

<style scoped></style>
