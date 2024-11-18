<template>
  <q-layout view="hHr lpR fFf" class="bg-grey-11">
    <q-header elevated class="bg-accent text-white">
      <q-toolbar>
        <!-- <q-btn-dropdown
          flat
          dense
          rounded
          dropdown-icon="mdi-chevron-double-up"
          v-if="
            orderStore.myOrder &&
            typeof orderStore.myOrder.order_process === 'number' &&
            orderStore.myOrder.order_process === 1
          "
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
        </q-btn-dropdown> -->

        <q-toolbar-title>
          <q-avatar><img src="../assets/logo.png" alt="" /></q-avatar> Entoy's
          Bakasihan
        </q-toolbar-title>

        <q-input
          outlined
          rounded
          dense
          label="Search..."
          label-color="accent"
          bg-color="grey-5"
          class="col-grow"
          v-model="searchItem"
          :debounce="1000"
          v-if="
            orderStore.myOrder &&
            typeof orderStore.myOrder.order_process === 'number' &&
            orderStore.myOrder.order_process === 1 &&
            drawer === false
          "
        />
        <q-space />

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="drawer = !drawer"
          v-if="
            orderStore.myOrder &&
            typeof orderStore.myOrder.order_process === 'number' &&
            orderStore.myOrder.order_process === 1 &&
            drawer === false
          "
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      class="bg-grey-11 drawer-user"
      v-model="drawer"
      :width="390"
      :breakpoint="400"
      side="right"
      bordered
      v-if="
        orderStore.myOrder &&
        typeof orderStore.myOrder.order_process === 'number' &&
        orderStore.myOrder.order_process === 1
      "
    >
      <q-scroll-area
        style="
          height: calc(100% - 230px);
          margin-top: 12%;
          border-right: 1px solid #ddd;
        "
      >
        <q-list
          bordered
          separator
          v-for="order in orderStore.myOrder.orders"
          :key="order?.id"
        >
          <h6 class="text-center">{{ order?.category_name.toUpperCase() }}</h6>
          <q-item v-for="prod in order?.products" :key="prod?.id">
            <q-item-section avatar>
              <q-avatar color="accent" text-color="white">
                <img :src="getImage(prod?.product_image || '')" alt="" />
              </q-avatar>
            </q-item-section>

            <q-item-section>{{ prod?.product_name }}</q-item-section>

            <q-item-section side>
              <div class="row items-center q-gutter-x-sm">
                <q-btn
                  size="sm"
                  flat
                  dense
                  icon="mdi-minus"
                  @click="
                    orderStore.subtractQuantity(order?.id || 0, prod?.id || 0)
                  "
                />
                <span class="text-weight-normal text-body1">{{
                  prod?.quantity
                }}</span>
                <q-btn
                  size="sm"
                  flat
                  dense
                  icon="mdi-plus"
                  @click="orderStore.addQuantity(order?.id || 0, prod?.id || 0)"
                />
                <q-btn
                  size="sm"
                  flat
                  dense
                  icon="mdi-close"
                  @click="
                    orderStore.removeOrders(order?.id || 0, prod?.id || 0)
                  "
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div
        class="absolute-top row items-center justify-between q-pa-xs shadow-8 q-gutter-md"
      >
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="drawer = !drawer"
          v-if="
            orderStore.myOrder &&
            typeof orderStore.myOrder.order_process === 'number' &&
            orderStore.myOrder.order_process === 1 &&
            drawer === true
          "
        />
        <q-input
          dense
          outlined
          v-model="customers_name"
          color="accent"
          label="Provide customer's name"
          class="col q-mr-lg q-col-12 q-col-sm-6 q-col-md-4"
        />
        <div class="row items-center q-gutter-x-sm">
          <q-btn
            flat
            dense
            icon="mdi-plus"
            rounded
            @click="addCustomer(customers_name)"
          >
            <q-tooltip anchor="bottom left" self="center middle">
              Add customer name
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            dense
            icon="mdi-refresh"
            rounded
            @click="orderStore.resetOrders()"
          >
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
            >Total-amount</span
          >
          <span class="col text-weight-bold"
            >:
            {{ formatToCurrency(orderStore.myOrder?.total_amount || 0) }}</span
          >
        </div>
        <div class="row items-center q-gutter-x-md q-pb-sm">
          <q-btn
            dense
            rounded
            icon="skip_next"
            color="accent"
            label="proceed"
            class="col"
            @click="proccedToOrderType"
          />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-card class="q-mx-lg q-mt-lg q-mb-lg">
        <q-card-section>
          <router-view />
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from 'src/stores/orderStore';
import {
  formatToCurrency,
  getImage,
  generateRandomNumber,
  userCheckIfTheresSameOrderID,
} from 'src/services/api.services';
import { useProductStore } from 'src/stores/productStore';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const drawer = ref(false);
const router = useRouter();
const searchItem = ref<string>('');
const customers_name = ref<string>('');
const orderStore = useOrderStore();
let timer: NodeJS.Timeout | undefined;
const productStore = useProductStore();

watch(
  () => router.currentRoute.value.name,
  (newVal, oldVal) => {
    if (newVal !== 'index') {
      drawer.value = !drawer.value;
      console.log(oldVal);
    }
  }
);
const checkFirst = async (orderNo: string) => {
  await userCheckIfTheresSameOrderID({ order_no: orderNo }).then((response) => {
    if (response && response.data && response.data.result.length > 1) {
      return true;
    } else {
      return false;
    }
  });
};
const addCustomer = (customer_name: string) => {
  $q.loading.show({
    message: 'adding Customer order',
  });
  if (customer_name === '') {
    $q.loading.show({
      backgroundColor: 'negative',
      messageColor: 'white',
      message: 'Customer is not been added',
    });
  } else {
    try {
      orderStore.addCustomerName(customer_name);
      timer = setTimeout(() => {
        $q.loading.show({
          backgroundColor: 'positive',
          messageColor: 'white',
          message: 'Customer has been Added',
        });

        timer = setTimeout(() => {
          $q.loading.hide();
          timer = void 0;
        }, 500);
      }, 200);
    } catch (error) {
      console.log(error);
    }
  }
};
const proccedToOrderType = async () => {
  $q.loading.show({
    message: 'proccessing Order',
  });
  let OrderNumber = generateRandomNumber(1, 1000);
  if (
    orderStore.myOrder?.customer_name === '' ||
    orderStore.myOrder?.customer_name == null ||
    orderStore.myOrder.orders.length < 1
  ) {
    timer = setTimeout(() => {
      $q.loading.show({
        backgroundColor: 'negative',
        messageColor: 'white',
        message: 'Your Order is not enough check your order or customer name',
      });

      timer = setTimeout(() => {
        $q.loading.hide();
        timer = void 0;
      }, 500);
    }, 200);
    $q.notify({
      type: 'negative',
      message: 'Your order Input is not enough',
    });
  } else {
    if (orderStore.myOrder.order_no == null) {
      orderStore.addOrderID(`${OrderNumber}`);
    }
    const check = checkFirst(orderStore.myOrder.order_no || '');
    if (typeof check === 'boolean' && check === false) {
      timer = setTimeout(() => {
        $q.loading.show({
          backgroundColor: 'positive',
          messageColor: 'white',
          message: 'Your Order proceeding to Order Type',
        });

        timer = setTimeout(() => {
          $q.loading.hide();
          timer = void 0;
        }, 500);
      }, 200);
      orderStore.proceedOrder();
      router.push('/order-type');
    } else {
      OrderNumber = generateRandomNumber(1, 1000);
      orderStore.addOrderID(`${OrderNumber}`);
      timer = setTimeout(() => {
        $q.loading.show({
          backgroundColor: 'positive',
          messageColor: 'white',
          message: 'Your Order proceeding to Order Type',
        });

        timer = setTimeout(() => {
          $q.loading.hide();
          timer = void 0;
        }, 500);
      }, 200);
      orderStore.proceedOrder();
      router.push('/order-type');
    }
  }
};
onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer);
    $q.loading.hide();
  }
});
watchEffect(() => {
  productStore.search = searchItem.value;
  customers_name.value = orderStore.myOrder?.customer_name || '';
  if (orderStore.myOrder && orderStore.myOrder?.order_process == 2) {
    router.push('/order-type');
  }
  if (orderStore.myOrder && orderStore.myOrder?.order_process == 3) {
    router.push('/tables');
  }
  if (orderStore.myOrder && orderStore.myOrder?.order_process == 4) {
    router.push('/reciept');
  }
  if (orderStore.myOrder && orderStore.myOrder?.order_process === 1) {
    router.push('/');
  }
});
onMounted(() => {
  productStore.getUserProducts('');
});
</script>
<style>
@media screen and(max-width: 400px) {
  .drawer-user {
    width: 100%;
  }
}
@media screen and (min-width: 401px) {
  .drawer-user {
    width: 500px;
  }
}

/* .scroll, .scroll-x, .scroll-y {
    background-image: url(/src/assets/logo.png);
    background-repeat: no-repeat;
    background-position: center;
} */
</style>
