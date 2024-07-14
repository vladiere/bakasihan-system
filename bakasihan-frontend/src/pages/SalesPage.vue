<template>
  <q-page padding class="fit">

    <div class="row">
      <div class="col column">
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-2 text-grey-7"
          active-color="accent"
          indicator-color="accent"
          align="left"
        >
          <q-tab name="drawer" label="Cash Drawer" />
          <q-tab name="today" label="Today's Sale" />
          <q-tab name="history" label="Sales History" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>

          <q-tab-panel name="drawer">
            <div class="text-h6 text-uppercase">drawer amount salary</div>
            <div class="column q-gutter-y-md">
              <q-input filled color="accent" label-color="accent" label="Opening drawer amount" />
              <q-input filled color="accent" label-color="accent" label="Cash payment sale" />
              <q-input filled color="accent" label-color="accent" label="Expected drawer amount" />
              <div class="row items-center">
                <q-btn align="left" class="q-px-md" color="accent" label="close drawer" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="today">
            <div class="row items-center justify-start q-gutter-x-md q-mb-md">
              <div class="q-pa-md col column text-center shadow-10" style="border-radius: 10px;">
                <span class="text-body1 text-weight-normal">Cash Drawer Amount</span>
                <span class="text-body1 text-weight-normal bg-accent q-py-sm q-px-md" style="border-radius: 15px">90233</span>
              </div>
              <div class="q-pa-md col column text-center shadow-10" style="border-radius: 10px;">
                <span class="text-body1 text-weight-normal">Cash Drawer Amount</span>
                <span class="text-body1 text-weight-normal bg-accent q-py-sm q-px-md" style="border-radius: 15px">90233</span>
              </div>
            </div>
            <TodaysSaleComponent />
          </q-tab-panel>

          <q-tab-panel name="history">
            <SalesHistory />
          </q-tab-panel>

        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { ref, defineAsyncComponent } from 'vue';

  import LoadersComponent from 'components/LoadersComponent.vue';

  const TodaysSaleComponent = defineAsyncComponent({
    loader: () => import('components/TodaysSalesComponent.vue'),
    loadingComponent: LoadersComponent,
    delay: 500,
    timeout: 3000,
  });
  const SalesHistory = defineAsyncComponent({
    loader: () => import('components/SalesHistoryComponent.vue'),
    loadingComponent: LoadersComponent,
    delay: 500,
    timeout: 3000,
  });

  const tab = ref('drawer');

</script>
