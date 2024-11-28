<template>
  <q-page padding>
    <div class="q-mb-lg">
      <q-btn
        icon="mdi-plus"
        label="Add User"
        color="primary"
        @click="addUserDialog = true"
        ><q-tooltip>Add User(Admin)</q-tooltip></q-btn
      >
    </div>
    <q-input
      filled
      v-model="search"
      label="Search"
      debounce="1000"
      @input="onSearch"
    />
    <q-table
      title="Admin's List"
      :rows-per-page-options="[5, 10, 20, 50]"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      v-model:pagination="pagination"
      :row-key="(row:usersDataT) => row.id"
      @request="handleRequest"
    >
      <template v-slot:body-cell-actions="props">
        <q-td>
          <q-btn
            v-if="
              authStore.user && authStore.user.username !== props.row.username
            "
            flat
            icon="mdi-pencil-box-outline"
            class="q-mx-xsm"
            @click="openRoleDialog(props.row.id, props.row.role)"
          >
            <q-tooltip>Edit Role</q-tooltip>
          </q-btn>
          <q-btn
            v-if="
              authStore.user && authStore.user.username !== props.row.username
            "
            flat
            icon="mdi-delete-outline"
            class="q-mx-xsm"
            @click="openDeleteDialog(props.row.id)"
          >
            <q-tooltip>Delete User</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
  <q-dialog v-model="editRoleDialog">
    <q-card>
      <q-card-section> Edit Role </q-card-section>
      <q-card-section>
        <q-select
          filled
          label="Select Role"
          v-model="role"
          :options="option"
        ></q-select>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-btn
          flat
          icon="mdi-close"
          @click="editRoleDialog = false"
          class="q-mx-sm"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>
        <q-btn flat icon="mdi-check" class="q-mx-sm" @click="handleUpdateRole">
          <q-tooltip>Save</q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="addUserDialog">
    <q-card>
      <q-card-section>
        <div
          style="font-size: clamp(0.9rem, 1vw + 0.3rem, 1.1rem)"
          class="q-mx-sm"
        >
          Create User
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-mt-lg">
          <q-input
            class="col col-md-11 q-mx-sm"
            filled
            v-model="formData.username"
            label="Username"
          />
        </div>
        <div class="row q-mt-lg">
          <q-input
            class="col col-md-11 q-mx-sm"
            filled
            v-model="formData.password"
            type="password"
            label="Password"
          />
        </div>
        <div class="row q-mt-lg">
          <q-input
            class="col col-md-5 q-mx-sm"
            filled
            v-model="formData.first_name"
            label="Firstname"
          />
          <q-input
            class="col col-md-5 q-mx-sm"
            filled
            v-model="formData.last_name"
            label="Lastname"
          />
        </div>
        <div class="row q-mt-lg">
          <q-select
            class="col col-md-11 q-mx-sm"
            filled
            v-model="formData.gender"
            :options="genderOption"
            label="Gender"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn
          flat
          icon="mdi-close"
          @click="addUserDialog = false"
          class="q-mx-sm"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>
        <q-btn flat icon="mdi-check" class="q-mx-sm" @click="handleCreateUser">
          <q-tooltip>Save</q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="deleteDialog">
    <q-card>
      <q-card-section>Are you sure you want to delete this Row?</q-card-section>
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
          @click="handleDeleteUser(ID)"
        >
          <q-tooltip>Yes</q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import {
  AdminList,
  createUser,
  deleteUser,
  updateRole,
} from 'src/services/api.services';
import {
  TableRequestProps,
  usersDataT,
  createUserT,
} from 'src/components/models';
import { useQuasar } from 'quasar';
import { useAuthStore } from '../../stores/authStore';

const $q = useQuasar();
const search = ref<string>('');
const authStore = useAuthStore();
const editRoleDialog = ref(false);
const addUserDialog = ref(false);
const genderOption = ref(['male', 'female']);
const option = ref(['admin', 'super_admin']);
const loading = ref(false);
const role = ref('');
const rows = ref<Array<usersDataT>>([]);
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
  field: string | ((row: usersDataT) => usersDataT);
  sortable?: boolean;
}
const formData = ref<createUserT>({
  id: 0,
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  gender: '',
});
const clearInputs = () => {
  formData.value.username = '';
  formData.value.password = '';
  formData.value.first_name = '';
  formData.value.last_name = '';
  formData.value.gender = '';
};
const handleCreateUser = async () => {
  if (
    formData.value?.username === '' ||
    formData.value?.password === '' ||
    formData.value?.first_name === '' ||
    formData.value?.last_name === '' ||
    formData.value?.gender === ''
  ) {
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'close',
      message: 'Inputs should be filled',
    });
  }
  loading.value = true;
  await createUser({
    username: formData.value.username,
    password: formData.value.password,
    first_name: formData.value.first_name,
    last_name: formData.value.last_name,
    gender: formData.value.gender,
  })
    .then((response) => {
      loading.value = false;
      clearInputs();
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
};
const openRoleDialog = (val_id: number, val_role: string) => {
  role.value = val_role;
  ID.value = val_id;
  editRoleDialog.value = true;
};

const handleUpdateRole = async () => {
  await updateRole({
    id: ID.value,
    role: role.value,
  })
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
    });
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
    name: 'username',
    label: 'Username',
    align: 'left',
    field: 'username',
    sortable: false,
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: 'status',
    sortable: false,
  },
  {
    name: 'role',
    label: 'Role',
    align: 'left',
    field: 'role',
    sortable: false,
  },
  {
    name: 'fullname',
    label: 'Fullname',
    align: 'left',
    field: 'fullname',
    sortable: false,
  },
  {
    name: 'gender',
    label: 'Gender',
    align: 'left',
    field: 'gender',
    sortable: false,
  },
  {
    name: 'actions',
    label: 'Action',
    align: 'center',
    field: (row: usersDataT) => row, // Example field function
  },
];

const onRequest = async (search = '', page = 0, perpage = 5) => {
  loading.value = true;
  await AdminList({
    params: {
      page,
      per_page: perpage,
      search: search, // Include the search term
    },
  })
    .then((response) => {
      loading.value = false;
      const data = response.data;
      rows.value = data.lists;
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

const handleDeleteUser = async (val_id: number) => {
  loading.value = true;
  await deleteUser({ id: val_id })
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
