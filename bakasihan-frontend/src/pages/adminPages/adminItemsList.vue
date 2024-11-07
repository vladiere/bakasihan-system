<template>
  <q-page padding>
    <q-btn
      color="primary"
      icon="add"
      label="Add Item"
      style="margin-bottom: 2%"
      @click="openItemsAddDialog()"
    />
    <q-input
      filled
      v-model="search"
      label="Search"
      debounce="1000"
      @input="onSearch"
    />
    <q-table
      title="Items's lists"
      :rows-per-page-options="[5, 10, 20, 50]"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      v-model:pagination="pagination"
      :row-key="(row:ItemsDataT) => row.id"
      @request="handleRequest"
    >
      <template v-slot:body-cell-item_picture="props">
        <q-td>
          <img
            :src="getImage(props.row.item_picture)"
            alt=""
            style="width: 100%; height: 100%"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-price="props">
        <q-td>
          <span>{{ formatToCurrency(props.row.price | 0) }}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-total_amount="props">
        <q-td>
          <span>{{ formatToCurrency(props.row.total_amount | 0) }}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td class="q-mx-sm">
  <q-btn
  flat
    icon="mdi-minus"
    class="q-mx-xsm"
    @click="subtractQuantityItem(props.row.id)"
  >
    <q-tooltip>Decrease</q-tooltip>
  </q-btn>
  
  <q-btn
  flat
    icon="mdi-plus"
    class="q-mx-xsm"
    @click="addQuantityItem(props.row.id)"
  >
    <q-tooltip>Increase</q-tooltip>
  </q-btn>
  
  <q-btn
  flat
    icon="mdi-pencil-box-outline"
    class="q-mx-xsm"
    @click="openEditDialog(props.row)"
  >
    <q-tooltip>Edit</q-tooltip>
  </q-btn>
  
    <q-btn
  flat
    :icon="props.row.category_name.toLowerCase() === 'drinks' ? 'mdi-restart': 'mdi-delete-outline'"
    class="q-mx-xsm"
    @click="openDeleteDialog(props.row.id,props.row.category_name)"
  >
    <q-tooltip><span v-if="props.row.category_name.toLowerCase() === 'drinks'">Reset</span><span v-else>Delete</span></q-tooltip>
  </q-btn>
</q-td>

      </template>
    </q-table>
  </q-page>
  <q-dialog v-model="ItemsAddDialog">
    <q-card>
      <q-card-section>Add Item</q-card-section>
      <q-separator />
      <q-card-section>
        <q-form
          class="col column q-gutter-y-md full-width"
          @submit="handleInsertItem(param)"
        >
          <img
            :src="preview"
            alt="preview"
            height="50%"
            width="50%"
            v-if="preview"
          />
          <img
            src="../../assets/logo.png"
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
          <q-select
            v-model="dataInputs.item_category_id"
            label="Select Category"
            :options="option"
            style="margin-bottom: 5%"
            @update:model-value="handleSelect"
          />
          <q-input
            v-model="dataInputs.item_name"
            color="dark"
            label="Item Name"
            class="col"
          />
          <q-input
            v-model="dataInputs.quantity"
            color="dark"
            label="Quantity"
            class="col"
            type="number"
            :rules="[
              (val) => (!!val && !isNaN(val)) || 'Please enter a valid number',
            ]"
          />
          <q-input
            v-model="dataInputs.price"
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
          @click="ItemsAddDialog = false"
        /><q-btn
          label="Submit"
          icon="check"
          color="positive"
          :disable="loading"
          :loading="loading"
          @click="handleInsertItem(param)"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="ItemsEditDialog">
    <q-card>
      <q-card-section>Edit Item</q-card-section>
      <q-separator />
      <q-card-section>
        <q-form
          class="col column q-gutter-y-md full-width"
          @submit="handleInsertItem(param)"
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
            v-model="dataInputs.item_name"
            color="dark"
            label="Item Name"
            class="col"
            :readonly="cat_name.toLowerCase() === 'drinks'"
          />
          <q-input
            v-model="dataInputs.quantity"
            color="dark"
            label="Quantity"
            class="col"
            type="number"
            :rules="[
              (val) => (!!val && !isNaN(val)) || 'Please enter a valid number',
            ]"
          />
          <q-input
            v-model="dataInputs.price"
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
          @click="closeEditDialog"
        /><q-btn
          label="Submit"
          icon="check"
          color="positive"
          :disable="loading"
          :loading="loading"
          @click="handleInsertItem(param)"
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
                <q-btn flat icon="mdi-check" class="q-mx-sm" @click="handleDeleteItems(ID,cat_name)">
                    <q-tooltip>Yes</q-tooltip>
                </q-btn>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import {
  adminGetAllItems,
  insertItems,
  getAdminItemDistictCategory,
  getImage,
  formatToCurrency,
addQuantity,
subtractQuantity,
updateItems,
deleteItems,
} from 'src/services/api.services';
import {
  TableRequestProps,
  ItemsDataT,
  ItemsT,
  categoryT,
} from 'src/components/models';
import { useQuasar } from 'quasar';

const search = ref<string>('');
const loading = ref(false);
const ItemsAddDialog = ref(false);
const ItemsEditDialog = ref(false);
const param = ref('')
const $q = useQuasar();
const viewData = ref<ItemsT | null>(null);
const rows = ref<Array<ItemsDataT>>([]);
  const option = ref<Array<optionT>>([]);
    const selectedOption = ref<optionT | null>(null);
    const itemCategory = ref<Array<categoryT>>([]);
      const preview = ref('');
      const cat_name = ref('')
const deleteDialog = ref(false)
    const openDeleteDialog = (val_id:number,val_cat_name:string)=>{
        ID.value = val_id
        cat_name.value = val_cat_name
        deleteDialog.value = true
    } 
type formdataT = {
  item_category_id: number | null;
  item_picture: File | null;
  item_name: string;
  quantity: number;
  price: number;
};
type optionT = {
  label: string;
  value: number;
};
interface Column {
  name: string;
  label: string;
  align: 'left' | 'center' | 'right';
  field: string | ((row: ItemsDataT) => ItemsDataT);
  sortable?: boolean;
}
const dataInputs = ref<formdataT>({
  item_category_id: null,
  item_picture: null,
  item_name: '',
  quantity: 0,
  price: 0,
});
const handleSelect = (optionData: optionT) => {
  selectedOption.value =
    option.value.find((opt) => opt.value === optionData.value) || null;
};

const openItemsAddDialog = () => {
  ItemsAddDialog.value = true;
  param.value = 'Insert'
  option.value = []; // Clear previous options to avoid duplicates
  itemCategory.value.forEach(
    (element: { id: number; category_name: string }) => {
      option.value.push({ label: element.category_name, value: element.id });
    }
  );
};
const handleImageChange = async (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target && target.files && target.files.length > 0) {
    // Check if the selected file is an image
    const file = target.files[0];
    if (file && file.type.startsWith('image/')) {
      preview.value = URL.createObjectURL(file);
      dataInputs.value.item_picture = file;
    }
  }
};
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
    name: 'item_picture',
    label: 'Item Picture',
    align: 'left',
    field: 'item_picture',
    sortable: false,
  },
  {
    name: 'item_name',
    label: 'Item Name',
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
    name: 'remaining_quantity',
    label: 'Remaining Quantity',
    align: 'left',
    field: 'remaining_quantity',
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
    field: (row: ItemsDataT) => row, // Example field function
  },
];

const onRequest = async (search = '', page = 0, perpage = 5) => {
  loading.value = true;
  await adminGetAllItems({
    params: {
      page,
      per_page: perpage,
      search: search, // Include the search term
    },
  })
    .then((response) => {
      loading.value = false;
      const data = response.data;
      rows.value = data.items;
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
  getCategories();
});

const Viewing = ref('')
const ID = ref(0)
const openEditDialog = (data: ItemsT) => {
  param.value = 'Edit'
  viewData.value = { ...data };
  Viewing.value = viewData.value.item_picture
  cat_name.value = viewData.value.category_name
  dataInputs.value.item_name = viewData.value.item_name
  dataInputs.value.quantity = viewData.value.quantity
  dataInputs.value.price = viewData.value.price
  ID.value = viewData.value.id
  ItemsEditDialog.value = true
};
const clearInputs = ()=>{
  dataInputs.value.item_category_id = null
  preview.value = ''
  dataInputs.value.item_picture = null
  dataInputs.value.item_name = ''
  dataInputs.value.quantity = 0
  dataInputs.value.price = 0
}
const checkDataInputs = ()=>{
  if ( dataInputs.value.item_category_id === null ||dataInputs.value.item_picture === null || dataInputs.value.item_name === '' ||  dataInputs.value.price === 0) return true
}
const closeEditDialog = ()=>{
  clearInputs()
  ItemsEditDialog.value = false
}
const handleInsertItem = async ( param: string) => {
  let data = new FormData();
  data.append('item_category_id', `${selectedOption.value?.value}`);
  if (dataInputs.value.item_picture) {
    data.append('item_picture', dataInputs.value.item_picture);
  }
  data.append('id', `${ID.value}`);
  data.append('picture', Viewing.value);
  data.append('item_name', dataInputs.value.item_name);
  data.append('quantity', `${dataInputs.value.quantity}`);
  data.append('price', `${dataInputs.value.price}`);
  switch (param) {
    case "Insert":
      loading.value = true;
      if (checkDataInputs()) {
        $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'close',
        message: "inputs should not be empty",
      });
    }else{
      await insertItems(data)
      .then((response) => {
        loading.value = false;
        ItemsAddDialog.value = false;
        clearInputs()
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
        loading.value = false;
  
        $q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'close',
          message: error.response.data.message,
        });
      });
      }
        break;
        case "Edit":
      loading.value = true;
        await updateItems(data)
      .then((response) => {
        loading.value = false;
        ItemsAddDialog.value = false;
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
        loading.value = false;
  
        $q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'close',
          message: error.response.data.message,
        });
      });
        break;

    }
    
};

const handleDeleteItems = async(val_id:number,val_cat_name:string)=>{
  loading.value = true
  await deleteItems({id:val_id,category_name:val_cat_name}).then(response =>{
    deleteDialog.value = false
    $q.notify({
        color: 'positive',
        textColor: 'white',
        position: 'top',
        icon: 'check',
        message: response.data.message,
      });
      onRequest(search.value, pagination.value.page, pagination.value.rowsPerPage)
  }).catch(err =>{
    $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'close',
        message: err.response.data.message,
      });
  }).finally(()=>{
    loading.value = false
  })
}
const getCategories = async () => {
  loading.value = true;
  await getAdminItemDistictCategory().then((res) => {
    loading.value = false;
    itemCategory.value = res.data.categories;
  });
};
const addQuantityItem = async(val:number) =>{
  await addQuantity({id:val}).then(response =>{
    $q.notify({
        color: 'positive',
        textColor: 'white',
        position: 'top',
        icon: 'check',
        message: response.data.message,
      });
      onRequest(search.value, pagination.value.page, pagination.value.rowsPerPage)
  }).catch(err =>{
    $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'close',
        message: err.response.data.message,
      });
  })
}
const subtractQuantityItem = async(val:number) =>{
  await subtractQuantity({id:val}).then(response =>{
    $q.notify({
        color: 'positive',
        textColor: 'white',
        position: 'top',
        icon: 'check',
        message: response.data.message,
      });
      onRequest(search.value, pagination.value.page, pagination.value.rowsPerPage)
  }).catch(err =>{
    $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'close',
        message: err.response.data.message,
      });
  })
}
</script>

<style scoped></style>
