<template>
  <q-layout view="lHh LpR fFf">
    <q-header elevated class="bg-accent text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>Admin</q-toolbar-title>
        <q-btn-dropdown
          flat
          dense
          rounded
          class="q-px-md"
          :label="authStore.user ? authStore.user.username : 'need to Login'"
        >
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Profile</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <span class="q-mt-lg text-h5 text-weight-bold q-pa-lg text-center"
        >Entoy's Bakasihan</span
      >
      <q-list class="rounded-borders q-mt-lg">
        <q-item clickable v-ripple :to="{ name: 'admin_index' }">
          <q-item-section avatar>
            <q-icon color="accent" name="mdi-view-dashboard" />
          </q-item-section>

          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-expansion-item expand-separator>
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="accent" name="mdi-list-box" />
            </q-item-section>
            <q-item-section>Orders</q-item-section>
          </template>
          <q-list bordered separator>
            <AdminsLayoutListComponent
              v-for="(item, index) in orders_props"
              :key="index"
              v-bind="item"
            />
          </q-list>
        </q-expansion-item>
        <q-expansion-item expand-separator>
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="accent" name="mdi-food" />
            </q-item-section>
            <q-item-section>Food Menu </q-item-section>
          </template>
          <q-list bordered separator>
            <AdminsLayoutListComponent
              v-for="(item, index) in menus_props"
              :key="index"
              v-bind="item"
            />
          </q-list>
        </q-expansion-item>
        <q-expansion-item expand-separator>
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="accent" name="mdi-package" />
            </q-item-section>
            <q-item-section>Inventory</q-item-section>
          </template>
          <q-list bordered separator>
            <AdminsLayoutListComponent
              v-for="(item, index) in inventory_props"
              :key="index"
              v-bind="item"
            />
          </q-list>
        </q-expansion-item>
        <q-expansion-item expand-separator>
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="accent" name="mdi-human" />
            </q-item-section>
            <q-item-section>Admins</q-item-section>
          </template>
          <q-list bordered separator>
            <AdminsLayoutListComponent
              v-for="(item, index) in admin_props"
              :key="index"
              v-bind="item"
            />
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { logout } from 'src/services/api.services';
import { useAuthStore } from 'src/stores/authStore';
import { NotificationOptions } from 'src/components/models';
import { io } from 'socket.io-client';
import AdminsLayoutListComponent, {
  AdminsLayoutListInterface,
} from 'components/AdminsLayoutListComponent.vue';
import { useQuasar, QSpinnerGears } from 'quasar';
import { useRouter } from 'vue-router';
import { useNewOrderStore } from 'src/stores/NewOrdersStore';
import { useDashboardStore } from '../stores/dashboardData';

const dashboardStore = useDashboardStore();
const $q = useQuasar();
const newOrderStore = useNewOrderStore();
const router = useRouter();
const socketServerApiURL = 'http://localhost:7000';
const adminRoom = 'bakasihanAdmin';
const socket = io(socketServerApiURL);
const authStore = useAuthStore();
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const onItemClick = () => {
  router.push({name:'admin_settings'})
};

const handleLogout = async () => {
  $q.loading.show({
    delay: 400, // ms
    spinner: QSpinnerGears,
  });
  await logout({})
    .then((response) => {
      $q.loading.hide();
      $q.notify({
        color: 'positive',
        icon: 'check',
        textColor: 'white',
        position: 'top',
        message: response.data.message,
      });
      authStore.logout();
      router.push('/login');
    })
    .catch((err) => {
      $q.loading.hide();
      $q.notify({
        color: 'negative',
        icon: 'close',
        textColor: 'white',
        position: 'top',
        message: err.response.data.message,
      });
    });
};
const orders_props = ref<AdminsLayoutListInterface[]>([
  {
    title: 'New Orders',
    icon_name: 'mdi-list-status',
    path_name: 'new_orders',
  },
  {
    title: 'Order History',
    icon_name: 'mdi-history',
    path_name: 'order_history',
  },
]);

const menus_props = ref<AdminsLayoutListInterface[]>([
  {
    title: 'List',
    icon_name: 'mdi-format-list-group',
    path_name: 'product_menu',
  },
  {
    title: 'Add new',
    icon_name: 'mdi-hamburger-plus',
    path_name: 'add_menu',
  },
  {
    title: 'Category',
    icon_name: 'mdi-format-list-checkbox',
    path_name: 'menu_category',
  },
  {
    title: 'Tables',
    icon_name: 'mdi-table-column-width',
    path_name: 'table_list',
  },
]);

const inventory_props = ref<AdminsLayoutListInterface[]>([
  {
    title: 'Items List',
    icon_name: 'mdi-list-box',
    path_name: 'items_list',
  },
  {
    title: 'Category',
    icon_name: 'mdi-invoice-list-outline',
    path_name: 'items_category',
  },
]);
const admin_props = ref<AdminsLayoutListInterface[]>([
  {
    title: 'Admin List',
    icon_name: 'mdi-list-box',
    path_name: 'admin_list',
  },
]);
onMounted(() => {
  authStore.getUserAuth();
  newOrderStore.onRequest(
    '',
    newOrderStore.pagination.page,
    newOrderStore.pagination.rowsPerPage
  );
});
const optionsNotifications = (message: string) => {
  const options: NotificationOptions = {
    body: message,
    requireInteraction: true,
    vibrate: [200, 100, 200],
    icon: '',
  };
  return options;
};
watchEffect(() => {
  socket.on('connect', () => {
    console.log('socket is connected successfully');
    socket.emit('joinAdminOrderRoom', adminRoom);
  });
  socket.on('messageFromUser', (data) => {
    if (Notification.permission == 'granted') {
      new Notification('New Message', optionsNotifications(data));
    } else {
      $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'check',
        message: data,
      });
    }
    newOrderStore.onRequest(
      '',
      newOrderStore.pagination.page,
      newOrderStore.pagination.rowsPerPage
    );
    dashboardStore.fetchData()
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
});
</script>
