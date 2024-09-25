<template>
  <q-layout view="hHr lpR fFf" class="bg-grey-11">
    <q-header elevated class="bg-accent text-white">
      <q-toolbar>
        <q-btn-dropdown
          flat
          dense
          rounded
          dropdown-icon="mdi-chevron-double-up"
        >
          <q-list style="width: 250px" class="q-py-md">
            <q-item clickable v-close-popup :to="{ name: 'index' }">
              <q-item-section avatar>
                <q-avatar icon="mdi-home" color="accent" text-color="grey-11" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Home</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup :to="{ name: 'customers' }">
              <q-item-section avatar>
                <q-avatar
                  icon="mdi-account-group"
                  color="accent"
                  text-color="grey-11"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>Customers</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup :to="{ name: 'tables' }">
              <q-item-section avatar>
                <q-avatar
                  icon="mdi-table-furniture"
                  color="accent"
                  text-color="grey-11"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>Tables</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup :to="{ name: 'orders' }">
              <q-item-section avatar>
                <q-avatar
                  icon="mdi-order-bool-ascending"
                  color="accent"
                  text-color="grey-11"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>Orders</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup :to="{ name: 'sales' }">
              <q-item-section avatar>
                <q-avatar
                  icon="mdi-point-of-sale"
                  color="accent"
                  text-color="grey-11"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>Sales</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section avatar>
                <q-avatar
                  icon="mdi-logout"
                  color="accent"
                  text-color="grey-11"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-toolbar-title> Entoy's Bakasihan </q-toolbar-title>

        <q-input
          outlined
          rounded
          dense
          label="Search..."
          label-color="accent"
          bg-color="grey-5"
          class="col-grow"
          @keydown.enter="onSearchItem"
          v-model="searchItem"
        />
        <q-space />

        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      class="bg-grey-11"
      v-model="drawer"
      :width="420"
      :breakpoint="400"
      side="right"
      bordered
    >
      <q-scroll-area
        style="
          height: calc(100% - 230px);
          margin-top: 12%;
          border-right: 1px solid #ddd;
        "
      >
        <q-list bordered separator>
          <h6 class="text-center">Food</h6>
          <q-item v-for="food in orderStore.myOrder?.foods" :key="food?.id">
            <q-item-section avatar>
              <q-avatar color="accent" text-color="white" icon="mdi-food" />
            </q-item-section>

            <q-item-section>{{ food?.product_name }}</q-item-section>

            <q-item-section side>
              <div class="row items-center q-gutter-x-sm">
                <q-btn size="sm" flat dense icon="mdi-minus" />
                <span class="text-weight-normal text-body1">{{
                  food?.quantity
                }}</span>
                <q-btn size="sm" flat dense icon="mdi-plus" />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list bordered separator>
          <h6 class="text-center">Drinks</h6>
          <q-item v-for="drink in orderStore.myOrder?.drinks" :key="drink?.id">
            <q-item-section avatar>
              <q-avatar color="accent" text-color="white" icon="mdi-drink" />
            </q-item-section>

            <q-item-section>{{ drink?.product_name }}</q-item-section>

            <q-item-section side>
              <div class="row items-center q-gutter-x-sm">
                <q-btn size="sm" flat dense icon="mdi-minus" />
                <span class="text-weight-normal text-body1">{{
                  drink?.quantity
                }}</span>
                <q-btn size="sm" flat dense icon="mdi-plus" />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div
        class="absolute-top row items-center justify-between q-pa-xs shadow-8"
      >
        <q-input
          dense
          outlined
          v-model="customers_name"
          color="accent"
          label="Provide customer's name"
          class="col q-mr-lg"
        />
        <div class="row items-center q-gutter-x-sm">
          <q-btn flat dense icon="mdi-plus" rounded>
            <q-tooltip anchor="bottom left" self="center middle">
              Add customer name
            </q-tooltip>
          </q-btn>
          <q-btn flat dense icon="mdi-refresh" rounded>
            <q-tooltip anchor="bottom left" self="center middle">
              Reset order
            </q-tooltip>
          </q-btn>
        </div>
      </div>

      <div
        class="absolute-bottom column justify-center q-pa-xs"
        style="border-top: 1px solid #bbc1bd"
      >
        <div class="row items-center q-px-md">
          <span
            class="col text-weight-normal"
            style="font-size: 14px; font-weight: 500"
            >Sub-total</span
          >
          <span class="col text-weight-bold"
            >:
            {{ formatToCurrency(orderStore.myOrder?.total_amount || 0) }}</span
          >
        </div>
        <div class="row items-center q-px-md">
          <span
            class="col text-weight-normal"
            style="font-size: 14px; font-weight: 500"
            >Tax</span
          >
          <span class="col text-weight-bold">: 13,000</span>
        </div>
        <div class="row items-center q-px-md">
          <span
            class="col text-weight-normal"
            style="font-size: 14px; font-weight: 500"
            >Payable Amount</span
          >
          <span class="col text-weight-bold">: 13,000</span>
        </div>
        <div class="row items-center q-gutter-x-md q-pb-sm">
          <q-btn dense rounded color="grey-8" label="hold" class="col" />
          <q-btn dense rounded color="accent" label="proceed" class="col" />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from 'src/stores/orderStore';
import { formatToCurrency } from 'src/services/api.services';
const drawer = ref(false);
const router = useRouter();
const searchItem = ref('');
const customers_name = ref('');
const orderStore = useOrderStore();

const onItemClick = () => {
  console.log('Clicked');
};
const onSearchItem = () => {
  if (searchItem.value === '') {
    return;
  }

  router.replace({ name: 'index', query: { search: searchItem.value } });
};

watch(
  () => router.currentRoute.value.name,
  (newVal, oldVal) => {
    if (newVal !== 'index') {
      drawer.value = !drawer.value;
    }
  }
);
</script>
