<template>
  <q-layout view="lHh LpR fFf">
    <q-header elevated class="bg-accent text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>Admin</q-toolbar-title>
        <q-btn-dropdown flat dense rounded class="q-px-md" label="Settings">
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
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="accent" name="mdi-view-dashboard" />
          </q-item-section>

          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-expansion-item expand-separator>
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="accent" name="mdi-table-account" />
            </q-item-section>
            <q-item-section>Cashiers</q-item-section>
          </template>
          <q-list bordered separator>
            <AdminsLayoutListComponent
              v-for="(item, index) in casheirs_props"
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
              <q-icon color="accent" name="mdi-chart-bar" />
            </q-item-section>
            <q-item-section>Sales</q-item-section>
          </template>
          <q-list bordered separator>
            <AdminsLayoutListComponent
              v-for="(item, index) in sales_props"
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
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { logout } from 'src/services/api.services';
import { useAuthStore } from 'src/stores/authStore';
import AdminsLayoutListComponent, {
  AdminsLayoutListInterface,
} from 'components/AdminsLayoutListComponent.vue';
import { useQuasar, QSpinnerGears } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar();

const router = useRouter();
const authStore = useAuthStore();
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const onItemClick = () => {
  console.log('Clicked');
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

const casheirs_props = ref<AdminsLayoutListInterface[]>([
  {
    title: 'Cashiers',
    icon_name: 'mdi-account-supervisor',
    path_name: 'view',
  },
  {
    title: 'Add new',
    icon_name: 'mdi-account-multiple-plus',
    path_name: 'add',
  },
  {
    title: 'Tables',
    icon_name: 'mdi-table-column-width',
    path_name: 'tables',
  },
]);

const menus_props = ref<AdminsLayoutListInterface[]>([
  {
    title: 'List',
    icon_name: 'mdi-format-list-group',
    path_name: 'view',
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
    path_name: 'tables',
  },
]);

const sales_props = ref<AdminsLayoutListInterface[]>([
  {
    title: 'Total Sales',
    icon_name: 'mdi-printer-pos-plus',
    path_name: 'view',
  },
  {
    title: 'Trends',
    icon_name: 'mdi-trending-up',
    path_name: 'trend',
  },
  {
    title: 'Tables',
    icon_name: 'mdi-table-column-width',
    path_name: 'tables',
  },
]);

const inventory_props = ref<AdminsLayoutListInterface[]>([
  {
    title: 'Items List',
    icon_name: 'mdi-list-box',
    path_name: 'list',
  },
  {
    title: 'Category',
    icon_name: 'mdi-invoice-list-outline',
    path_name: 'category',
  },
  {
    title: 'Tables',
    icon_name: 'mdi-table-column-width',
    path_name: 'tables',
  },
]);
</script>
