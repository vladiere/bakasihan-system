<template>
  <q-page padding>
    <!-- content -->
    <h4 class="text-center">Add Menu</h4>
    <div class="flex justify-evenly">
      <q-btn
        icon="mdi-food"
        color="warning"
        label="Add Food"
        :disable="loading"
        :loading="loading"
        @click="openFoodDialog"
      />
      <q-btn
        icon="list"
        color="secondary"
        label="Add Category"
        :disable="loading"
        :loading="loading"
        @click="categoryDialog = true"
      />
      <q-btn
        icon="mdi-table-column-width"
        color="accent"
        label="Add Table"
        :disable="loading"
        :loading="loading"
        @click="tableDialog = true"
      />
    </div>
  </q-page>
  <q-dialog v-model="categoryDialog">
    <q-card>
      <q-card-section>Add Category</q-card-section>
      <q-separator />
      <q-card-section>
        <q-form
          class="col column q-gutter-y-md full-width"
          @submit="handleInsertProductCategory"
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
          @click="handleInsertProductCategory"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="foodDialog">
    <q-card>
      <q-card-section>Add Food</q-card-section>
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
            src="../assets/logo.png"
            alt="default"
            height="50%"
            width="50%"
            v-else
          />
          <q-file
            v-model="formdata.product_image"
            @change="handleImageChange"
            label="Logo"
            accept="image/jpeg,image/png,image/jpg"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <q-select
            v-model="formdata.category_id"
            label="Select Category"
            :options="option"
            style="margin-bottom: 5%"
            @update:model-value="handleSelect"
          />
          <q-input
            v-model="formdata.product_name"
            color="dark"
            label="Product Name"
            class="col"
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
              (val) => (!!val && !isNaN(val)) || 'Please enter a valid number',
            ]"
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
  <q-dialog v-model="tableDialog">
    <q-card>
      <q-card-section>Add Table</q-card-section>
      <q-separator />
      <q-card-section>
        <q-form
          class="col column q-gutter-y-md full-width"
          @submit="handleInsertCustomerTable"
        >
          <q-input
            v-model="table_no"
            color="dark"
            label="Table Number"
            class="col"
            type="number"
            :rules="[
              (val) => (!!val && !isNaN(val)) || 'Please enter a valid number',
            ]"
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
          @click="tableDialog = false"
        /><q-btn
          label="Submit"
          icon="check"
          color="positive"
          :disable="loading"
          :loading="loading"
          @click="handleInsertCustomerTable"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  getProductCategories,
  insertProduct,
  insertProductCategory,
  insertCustomerTables,
} from 'src/services/api.services';
import { categoryT } from 'src/components/models';
import { useQuasar } from 'quasar';

type formdataT = {
  product_image: File | null;
  category_name: string;
  category_id: number | null;
  product_name: string;
  product_description: string;
  price: number | null;
};
type optionT = {
  label: string;
  value: number;
};
const table_no = ref<number | null>(null);
const option = ref<Array<optionT>>([]);
const $q = useQuasar();
const categoryDialog = ref(false);
const foodDialog = ref<boolean>(false);
const tableDialog = ref(false);

const selectedOption = ref<optionT | null>(null);

const handleSelect = (optionData: optionT) => {
  selectedOption.value =
    option.value.find((opt) => opt.value === optionData.value) || null;
};
const foodCategory = ref<Array<categoryT>>([]);

const openFoodDialog = () => {
  foodDialog.value = true;
  option.value = []; // Clear previous options to avoid duplicates
  foodCategory.value.forEach(
    (element: { id: number; category_name: string }) => {
      option.value.push({ label: element.category_name, value: element.id });
    }
  );
};

const formdata = ref<formdataT>({
  product_image: null,
  category_name: '',
  category_id: null,
  product_name: '',
  product_description: '',
  price: 0,
});
const preview = ref('');

const handleGetFoodCategory = async () => {
  loading.value = true;
  await getProductCategories({ category_id: '' }).then((response) => {
    loading.value = false;
    foodCategory.value = response.data.categories;
  });
};

const loading = ref(false);
const handleInsertProductCategory = async () => {
  loading.value = true;
  await insertProductCategory({ category_name: formdata.value.category_name })
    .then((response) => {
      loading.value = false;
      formdata.value.category_name = '';
      categoryDialog.value = false;
      handleGetFoodCategory();
      $q.notify({
        color: 'positive',
        textColor: 'white',
        position: 'top',
        icon: 'check',
        message: response.data.message,
      });
    })
    .catch((error) => {
      loading.value = false;
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'close',
        message: error.response.data.message,
      });
    });
};

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
const handleSubmitProduct = async () => {
  loading.value = true;
  let data = new FormData();
  data.append('category_id', `${selectedOption.value?.value}`);
  if (formdata.value.product_image) {
    data.append('product_image', formdata.value.product_image);
  }
  data.append('product_name', formdata.value.product_name);
  data.append('product_description', formdata.value.product_description);
  data.append('price', `${formdata.value.price}`);

  await insertProduct(data)
    .then((response) => {
      if (response) {
        loading.value = false;
        clearFormatData();
        $q.notify({
          color: 'positive',
          textColor: 'white',
          position: 'top',
          icon: 'check',
          message: response.data.message,
        });
      }
    })
    .catch((err) => {
      loading.value = false;
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'close',
        message: err.response.data.message,
      });
    });
};
const closeFoodDialog = () => {
  clearFormatData();
  foodDialog.value = false;
};
onMounted(async () => {
  await handleGetFoodCategory();
});
const clearFormatData = () => {
  formdata.value.category_id = null;
  preview.value = '';
  formdata.value.product_image = null;
  formdata.value.product_name = '';
  formdata.value.product_description = '';
  formdata.value.price = 0;
};

const handleInsertCustomerTable = async () => {
  loading.value = true;
  await insertCustomerTables({ table_no: table_no.value })
    .then((response) => {
      if (response) {
        loading.value = false;
        table_no.value = null;
        $q.notify({
          color: 'positive',
          textColor: 'white',
          position: 'top',
          icon: 'check',
          message: response.data.message,
        });
      }
    })
    .catch((err) => {
      loading.value = false;
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'close',
        message: err.response.data.message,
      });
    });
};
</script>
