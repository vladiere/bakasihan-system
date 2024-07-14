<template>
  <q-page padding class="fit">
    <!-- content -->
    <div class="row">
      <div class="col column">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="accent"
          indicator-color="accent"
          align="left"
        >
          <q-tab name="history" label="Order History" />
          <q-tab name="onhold" label="Order On Hold" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>

          <q-tab-panel name="history" class="row q-gutter-x-md">
            <OrdersTable class="col" @on-item-click="onItemClick" />
            <RecentOrdersHistory v-if="data_payload" class="col-4" />
          </q-tab-panel>

          <q-tab-panel name="onhold">
            <div class="fit row wrap justify-start q-gutter-md">
              <OrderOnHold v-for="n in 15" :key="n" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { ref, defineAsyncComponent } from 'vue';

  import LoadersComponent from 'components/LoadersComponent.vue';

  const OrderOnHold = defineAsyncComponent({
    loader: () => import('components/OrderOnHold.vue'),
    loadingComponent: LoadersComponent,
    delay: 500,
    timeout: 3000,
  });
  const RecentOrdersHistory = defineAsyncComponent({
    loader: () => import('components/RecentOrdersHistory.vue'),
    loadingComponent: LoadersComponent,
    delay: 500,
    timeout: 3000,
  });
  const OrdersTable = defineAsyncComponent({
    loader: () => import('components/OrdersTable.vue'),
    loadingComponent: LoadersComponent,
    delay: 500,
    timeout: 3000,
  });

  const tab = ref('history');
  const data_payload = ref(null);
  const onItemClick = (payload) => {
    data_payload.value = payload;
  }
</script>
