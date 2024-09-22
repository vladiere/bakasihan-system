<template>
  <q-page padding class="fit column">
    <!-- content -->
    <div
      class="col row items-center justify-center flex-wrap q-gutter-x-lg full-height"
    >
      <TableComponent
        v-for="table in customersTables"
        :key="table.id"
        :table_no="table.table_no"
        :order_no="table.order_no ?? ''"
        :status="table.status"
      />
    </div>
    <div class="col row items-end justify-between q-px-lg">
      <div class="row items-center q-gutter-x-lg">
        <div class="row items-center q-gutter-x-sm">
          <div class="q-pa-md bg-green" style="border-radius: 50%"></div>
          <span class="text-body1 text-weight-normal">Vacant</span>
        </div>
        <div class="row items-center q-gutter-x-sm">
          <div class="q-pa-md bg-red-5" style="border-radius: 50%"></div>
          <span class="text-body1 text-weight-normal">Occupied</span>
        </div>
        <div class="row items-center q-gutter-x-sm">
          <div class="q-pa-md bg-grey-8" style="border-radius: 50%"></div>
          <span class="text-body1 text-weight-normal">On hold</span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { customersTableDataT } from 'src/components/models';
import TableComponent from 'components/TableComponent.vue';
import { adminCustomersTable } from 'src/services/api.services';

const customersTables = ref<Array<customersTableDataT>>([]);
const handleTables = async () => {
  await adminCustomersTable()
    .then((response) => {
      if (response) {
        customersTables.value = response.data.customer_tables;
      }
    })
    .then((err) => {
      console.log(err);
    });
};
onMounted(() => {
  handleTables();
});
</script>
