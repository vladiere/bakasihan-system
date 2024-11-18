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
        :row-key="(row:productsListT) => row.id"
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
              flat
              icon="mdi-pencil-box-outline"
              class="q-mx-xsm"
              @click="openFoodDialog(props.row)"
            >
              <q-tooltip>Edit</q-tooltip>
            </q-btn>
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
    </q-page>
    <q-dialog v-model="foodDialog">
      <q-card>
        <q-card-section>Edit Food Menu</q-card-section>
        <q-separator />
        <q-card-section>
          <q-form
            class="col column q-gutter-y-md full-width"
            @submit="handleSubmitProduct"
          >
            <img
              :src="preview"
              alt="preview"
              height="50%"
              width="50%"
              v-if="preview"
            />
            <img
              :src="getImage(Viewing)"
              alt="default"
              height="50%"
              width="50%"
              v-else
            />
            <input
              type="file"
              name=""
              id=""
              @change="handleImageChange"
              accept="image/jpg,image/png,image/jpeg"
            />

            <q-input
              v-model="formdata.product_name"
              color="dark"
              label="Product Name"
              class="col"
              :readonly="cat_name.toLowerCase() === 'drinks'"
            />
            <q-input
              v-model="formdata.product_description"
              color="dark"
              label="Product Description"
              class="col"
            />
            <q-input
              v-model="formdata.price"
              color="dark"
              label="Price"
              class="col"
              type="number"
              :rules="[
                (val) =>
                  (!!val && !isNaN(val)) || 'Please enter a valid number',
              ]"
            />
            <q-select
              v-model="selectedOption"
              label="Select Status"
              :options="option"
              @update:model-value="handleSelect"
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
            @click="closeFoodDialog"
          /><q-btn
            label="Submit"
            icon="check"
            color="positive"
            :disable="loading"
            :loading="loading"
            @click="handleSubmitProduct"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
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
            @click="handleDeleteProduct(ID || 0)"
          >
            <q-tooltip>Yes</q-tooltip>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { productsListT, TableRequestProps } from 'src/components/models';
import {
  adminGetAllProducts,
  deleteProduct,
  formatToCurrency,
  getImage,
  updateProducts,
} from 'src/services/api.services';
import { ref, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/authStore';

const $q = useQuasar();
const authStore = useAuthStore();
const loading = ref<boolean>(false);
const foodDialog = ref(false);
const search = ref<string>('');
const preview = ref('');
const cat_name = ref('');
const Viewing = ref<string | null>('');
const rows = ref<Array<productsListT>>([]);
const deleteDialog = ref(false);
const openDeleteDialog = (val_id: number) => {
  ID.value = val_id;
  deleteDialog.value = true;
};
type formdataT = {
  product_image: File | null;
  category_name: string;
  category_id: number | null;
  product_name: string | null;
  product_description: string | null;
  price: number | null;
};
type optionT = {
  label: string;
  value: number;
};
const option = ref<Array<optionT>>([]);
const selectedOption = ref<optionT | null>(null);

const handleSelect = (optionData: optionT) => {
  selectedOption.value =
    option.value.find((opt) => opt.value === optionData.value) || null;
};

const foodstatus = ref<Array<{ status: number; status_name: string }>>([
  { status: 1, status_name: 'Active' },
  { status: 2, status_name: 'In Active' },
]);
const ID = ref<number | null>(0);

const openFoodDialog = (val: productsListT | null) => {
  console.log(val);
  ID.value = val?.id || null;
  Viewing.value = val?.product_image || null;
  cat_name.value = `${val?.category_name}`;
  formdata.value.product_name = val?.product_name || null;
  formdata.value.product_description = val?.product_description || null;
  formdata.value.price = val?.price || null;
  foodDialog.value = true;
  option.value = []; // Clear previous options to avoid duplicates

  // Populate options based on foodstatus
  foodstatus.value.forEach((element) => {
    option.value.push({ label: element.status_name, value: element.status });
  });

  // Set selectedOption to the option that matches val.status
  if (val && val.status != null) {
    selectedOption.value =
      option.value.find((optData) => optData.value === val.status) || null;
    console.log(selectedOption.value);
  } else {
    // Fallback to the first option if no status provided
    selectedOption.value = option.value[0] || null;
    console.log(selectedOption.value);
  }
};

const formdata = ref<formdataT>({
  product_image: null,
  category_name: '',
  category_id: null,
  product_name: '',
  product_description: '',
  price: 0,
});
interface Column {
  name: string;
  label: string;
  align: 'left' | 'center' | 'right';
  field: string | ((row: productsListT) => productsListT);
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
    field: (row: productsListT) => row, // Example field function
  },
];

const handleSubmitProduct = async () => {
  let data = new FormData();
  data.append('id', `${ID.value}`);
  if (formdata.value.product_image) {
    data.append('product_image', formdata.value.product_image);
  }
  data.append('picture', `${Viewing.value}`);
  data.append('product_name', `${formdata.value.product_name}`);
  data.append('product_description', `${formdata.value.product_description}`);
  data.append('price', `${formdata.value.price}`);
  data.append('status', `${selectedOption.value?.value}`);
  loading.value = true;
  await updateProducts(data)
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
const closeFoodDialog = () => {
  foodDialog.value = false;
};
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
const handleImageChange = async (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target && target.files && target.files.length > 0) {
    // Check if the selected file is an image
    const file = target.files[0];
    if (file && file.type.startsWith('image/')) {
      preview.value = URL.createObjectURL(file);
      formdata.value.product_image = file;
    }
  }
};
const handleDeleteProduct = async (val_id: number) => {
  await deleteProduct({ id: val_id })
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
    });
};
</script>

<style scoped></style>
