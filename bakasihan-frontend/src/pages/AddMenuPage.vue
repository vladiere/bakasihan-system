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
        <div
        v-if="addFoodProcess === 1"
        >
          <img
            :src="preview"
            alt="preview"
            height="20%"
            width="20%"
            v-if="preview"
          />
          <img
            src="../assets/logo.png"
            alt="default"
            height="20%"
            width="20%"
            v-else
          />
         <input type="file" name="" id="" accept="image/jpeg,image/png,image/jpg" @change="handleImageChange">
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
          />
          <q-input
            v-model="formdata.product_description"
            color="dark"
            label="Product Description"
          />
          <q-input
            v-model="formdata.price"
            color="dark"
            label="Price"
            type="number"
            :rules="[
              (val) => (!!val && !isNaN(val)) || 'Please enter a valid number',
            ]"
          />
        </div>
        <div v-if="addFoodProcess === 2">
          <q-select
            v-model="newFOrmData.item_id"
            label="Select Item"
            :options="addFoodOption"
            style="margin-bottom: 5%"
            @update:model-value="handleSelectItem"
          />
          <q-input
            v-model="newFOrmData.quantity"
            color="dark"
            label="Quantity"
            type="number"
            :rules="[
              (val) => (!!val && !isNaN(val)) || 'Please enter a valid number',
            ]"
          />

          <q-btn
          label="Add"
          color="positive"
          icon="check"
          :disable="loading"
          :loading="loading"
          @click="AddDatatoTable"
        />
          <q-table
            title="Items's PulledOut lists"
            :rows="PartialRow"
            :columns="PartialColumn"
            :loading="loading"
            :row-key="(row:PartialpullOutInventoryFormDataT) => row.item_id"
            @request="reloadDataTable"
          >
            <template v-slot:body-cell-actions="props">
              <q-td>
                <q-btn
                flat
          icon="mdi-delete-outline"
          class="q-mx-sm"
          @click="removeItem(props.row.item_id)"
        >
          <q-tooltip>Delete</q-tooltip>
        </q-btn>
              </q-td>
            </template>
    </q-table>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="new-buttons">
          <q-btn
          color="negative"
          icon="close"
          :disable="loading"
          :loading="loading"
          v-if="addFoodProcess === 1"
          @click="closeFoodDialog"
        />

        <q-btn
          icon="check"
          color="positive"
          :disable="loading"
          :loading="loading"
          v-if="addFoodProcess === 2 || selectedOption?.label === 'Drinks'"
          @click="handleSubmitProduct"
        />
          <q-btn
            color="warning"
            icon="mdi-chevron-left"
            :disable="loading"
            :loading="loading"
            v-if="addFoodProcess === 2"
            @click.prevent="prevProcess"
          />
          <q-btn
            icon="mdi-chevron-right"
            color="primary"
            :disable="loading"
            :loading="loading"
            v-if="addFoodProcess === 1 && selectedOption?.label !== 'Drinks'"
            @click="nextProcess"
          />
        </div>
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
getAdminItemAll,
} from 'src/services/api.services';
import { categoryT, itemSelectedPulloutDataT, PartialpullOutInventoryDataT, PartialpullOutInventoryFormDataT } from 'src/components/models';
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
const foodDialog = ref(false);
const tableDialog = ref(false);
const addFoodProcess = ref(1)
const selectedOption = ref<optionT | null>(null);
const itemsSelect = ref<Array<itemSelectedPulloutDataT>>([])
  const partialPulloutItems = ref<Array<PartialpullOutInventoryFormDataT>>([])
  const addFoodOption = ref<Array<optionT>>([])
  const selectedAddFoodOption = ref<optionT | null>(null)
  const PartialRow = ref<Array<PartialpullOutInventoryDataT>>([])

const handleSelectItem = (optionData:optionT)=>{
  selectedAddFoodOption.value = 
    addFoodOption.value.findLast((opt)=> opt.value === optionData.value) || null
}
const removeItem = (val: number) => {
  const itemIndex = partialPulloutItems.value.findIndex((newVal) => newVal.item_id === val);
  console.log("itemIndex:", itemIndex);

  if (itemIndex !== -1) { // Check if the item exists
    partialPulloutItems.value.splice(itemIndex, 1); // Remove the item
    reloadDataTable(); // Reload the data table
  } else {
    console.log("Item not found");
  }
};
const reloadDataTable = () => {
  console.log(partialPulloutItems.value)
  PartialRow.value = partialPulloutItems.value.map(data => {
  const matchedItem = itemsSelect.value.find(val => val.id === data.item_id);
      return {
        item_id: data.item_id,
        item_name: matchedItem ? matchedItem.item_name : '', // Fallback to an empty string
        quantity: data.quantity,
      };
    });
};
const newFOrmData = ref({
  item_id:0,
  quantity:0
})

const AddDatatoTable = ()=>{
  newFOrmData.value.item_id = parseInt(`${selectedAddFoodOption.value?.value}`)
  const alreadyExist = partialPulloutItems.value.find(val => val.item_id === newFOrmData.value.item_id)
  if(alreadyExist){
    $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'close',
        message: 'Item Already Exist',
      });
    }else{
      if(newFOrmData.value.quantity === 0 || newFOrmData.value.item_id === null){
        $q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'close',
          message: 'Should not be an Empty Fields',
        });
      }else{
        if(partialPulloutItems.value.push({
            item_id:newFOrmData.value?.item_id,
            quantity:newFOrmData.value.quantity
          })){
            reloadDataTable()
          }
      }
    }
    
}

interface Column {
  name: string;
  label: string;
  align: 'left' | 'center' | 'right';
  field: string | ((row: PartialpullOutInventoryDataT) => PartialpullOutInventoryDataT);
  sortable?: boolean;
}
const PartialColumn:Column[] = [
  {
    name: 'item_id',
    label: 'item_id',
    align: 'left',
    field: 'item_id',
    sortable: false,
  },
  {
    name: 'item_name',
    label: 'Item_name',
    align: 'left',
    field: 'item_name',
    sortable: false,
  },
  {
    name: 'quantity',
    label: 'Quantity',
    align: 'left',
    field: 'quantity',
    sortable: false,
  },
  {
    name: 'actions',
    label: 'Action',
    align: 'center',
    field: (row: PartialpullOutInventoryDataT) => row, // Example field function
  },
]
const nextProcess = ()=>{
  addFoodProcess.value = 2

  addFoodOption.value = []; // Clear previous options to avoid duplicates
  itemsSelect.value.forEach(
    (element: { id: number; item_name: string }) => {
      addFoodOption.value.push({ label: element.item_name, value: element.id });
    }
  );
 
}
const prevProcess = ()=>{
  addFoodProcess.value = 1
}

const handleSelect = (optionData: optionT) => {
  selectedOption.value =
    option.value.find((opt) => opt.value === optionData.value) || null;
};
const foodCategory = ref<Array<categoryT>>([]);
const getItemPullout = async()=>{
  const response = await getAdminItemAll()
  if(response){
    itemsSelect.value = response.data.items
  }
}
const openFoodDialog = async() => {
  foodDialog.value = true;
  option.value = []; // Clear previous options to avoid duplicates
  foodCategory.value.forEach(
    (element: { id: number; category_name: string }) => {
      option.value.push({ label: element.category_name, value: element.id });
    }
    );
    await getItemPullout()
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
  if (selectedOption.value?.label !== 'Drinks'){
    if(partialPulloutItems.value.length < 1){
      $q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'close',
          message: "Ingredients It Should not be empty",
        });
        return
    }
    partialPulloutItems.value.map((val) => {
        const myVal = itemsSelect.value.find((newVal) => newVal.id === val.item_id);

        // Only proceed if myVal and myVal.quantity exist
        if (myVal?.remaining_quantity && myVal.remaining_quantity < val.quantity) {
          $q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'close',
            message: "Quantity is not higher than in the inventory",
          });
          return; // Exit the loop early
        }
      });

      // Append to FormData after the check
      data.append('ingredients', JSON.stringify(partialPulloutItems.value));

  }

  await insertProduct(data)
    .then((response) => {
      if (response) {
        loading.value = false;
        clearFormatData();
        partialPulloutItems.value = []
        newFOrmData.value.item_id = 0
        newFOrmData.value.quantity = 0
        reloadDataTable()
        addFoodProcess.value = 1
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
  console.log("Closing dialog...");
  foodDialog.value = false;
  clearFormatData();

  // Stop any further actions from being triggered, if necessary
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
<style scoped>
.new-buttons{
  display: flex;
  flex-direction: column;
  width: 20%;
  gap: 2%;
}
</style>