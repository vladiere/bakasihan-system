<template>
  <q-page padding>
    <!-- content -->
    <h4 class="text-center">Add Menu</h4>
    <div class="flex justify-evenly">
      <q-btn
        icon="mdi-food"
        color="warning"
        label="Add Food"
        @click="foodDialog = true"
      />
      <q-btn
        icon="list"
        color="secondary"
        label="Add Category"
        @click="categoryDialog = true"
      />
      <q-btn
        icon="mdi-table-column-width"
        color="accent"
        label="Add Table"
        @click="tableDialog = true"
      />
    </div>
  </q-page>
  <q-dialog v-model="categoryDialog">
    <q-card>
      <q-card-section>Add Category</q-card-section>
      <q-separator />
      <q-card-section>
        <q-form class="col column q-gutter-y-md full-width">
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
          @click="categoryDialog = false"
        /><q-btn
          label="Submit"
          icon="check"
          color="positive"
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
        <q-form class="col column q-gutter-y-md full-width">
          <img :src="preview" alt="preview" v-if="preview" />
          <img src="../assets/logo.png" alt="default" v-else />
          <q-file
            outlined
            v-model="formdata.product_image"
            @input="handleImageChange"
            label="Logo"
            accept="image/jpeg,image/png,image/jpg"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-btn
          label="close"
          color="negative"
          icon="close"
          @click="foodDialog = false"
        /><q-btn label="Submit" icon="check" color="positive" />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="tableDialog">
    <q-card>
      <q-card-section>Add Table</q-card-section>
      <q-separator />
      <q-card-section>
        <q-form class="col column q-gutter-y-md full-width"> </q-form>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-btn
          label="close"
          color="negative"
          icon="close"
          @click="tableDialog = false"
        /><q-btn label="Submit" icon="check" color="positive" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { insertProductCategory } from 'src/services/api.services';
import { useQuasar } from 'quasar';

type formdataT = {
  product_image: File | null;
  category_name: string;
  category_id: number | null;
  product_name: string;
  product_description: string;
  price: number | null;
};
const $q = useQuasar();
const categoryDialog = ref(false);
const foodDialog = ref(false);
const tableDialog = ref(false);
const formdata = ref<formdataT>({
  product_image: null,
  category_name: '',
  category_id: null,
  product_name: '',
  product_description: '',
  price: null,
});
const preview = ref('');

const loading = ref(false);
const handleInsertProductCategory = async () => {
  loading.value = true;
  await insertProductCategory({ category_name: formdata.value.category_name })
    .then((response) => {
      loading.value = false;
      formdata.value.category_name = '';
      categoryDialog.value = false;
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

const handleImageChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files) {
    preview.value = URL.createObjectURL(files[0]);
    formdata.value.product_image = files[0];
  }
};
</script>
