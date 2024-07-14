<template>
  <q-page padding>
    <div class="row q-gutter-x-md">
      <CustomersTable class="col" @on-item-click="onItemClick" />
      <RecentOrders v-if="data_payload" class="col-4" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import CustomersTable from 'components/CustomersTable.vue';
  import RecentOrders from 'components/RecentOrders.vue';

  const data_payload = ref(null);

  const onItemClick = (payload) => {
    data_payload.value = payload;
  }
</script>
