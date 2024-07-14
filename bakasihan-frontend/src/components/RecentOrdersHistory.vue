<template>
  <div class="column justify-center">
    <q-table
      flat bordered
      style="height: calc(100vh - 310px);"
      title="Recent Customers"
      :rows="rows"
      :columns="columns"
      row-key="index"
      separator="vertical"
      hide-bottom
      hide-header
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top>
        <div class="row items-center full-width">
          <div class="row items-center">
            <span class="text-h6 text-weight-bold">ORDER ID #</span>
            <span class="text-body1 text-weight-normal">65</span>
          </div>
          <q-space />
          <span class="text-body1 text-weight-normal">Take out</span>
        </div>
      </template>

      <template v-slot:body-cell="props">
        <q-td :props="props">
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
    <div class="col column justify-center">
      <div class="row items-center q-px-md">
        <span class="col">Sub-total</span>
        <span class="col text-weight-bold">: 13,000</span>
      </div>
      <div class="row items-center q-px-md">
        <span class="col">Cash</span>
        <span class="col text-weight-bold">: 13,000</span>
      </div>
      <div class="row items-center q-px-md">
        <span class="col text-weight-normal" style="font-size: 14px; font-weight: 500;">Change</span>
        <span class="col text-weight-bold">: 13,000</span>
      </div>
      <q-btn dense rounded color="accent" label="print invoice" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const pagination = ref({ rowsPerPage: 0 });
  const columns = [
    { name: 'name', required: true, label: 'Dessert (100g serving)', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
    { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  ]

  const rows = [
    { name: 'Frozen Yogurt', calories: 159, },
    { name: 'Ice cream sandwich', calories: 237, },
    { name: 'Eclair', calories: 262, },
    { name: 'Cupcake', calories: 305, },
    { name: 'Gingerbread', calories: 356, },
    { name: 'Jelly bean', calories: 375, },
    { name: 'Lollipop', calories: 392, },
    { name: 'Honeycomb', calories: 408, },
    { name: 'Donut', calories: 452, },
    { name: 'KitKat', calories: 518, },
    { name: 'Frozen Yogurt', calories: 159, },
    { name: 'Ice cream sandwich', calories: 237, },
    { name: 'Eclair', calories: 262, },
    { name: 'Cupcake', calories: 305, },
    { name: 'Gingerbread', calories: 356, },
    { name: 'Jelly bean', calories: 375, },
    { name: 'Lollipop', calories: 392, },
    { name: 'Honeycomb', calories: 408, },
    { name: 'Donut', calories: 452, },
    { name: 'KitKat', calories: 518, },
    { name: 'Frozen Yogurt', calories: 159, },
    { name: 'Ice cream sandwich', calories: 237, },
    { name: 'Eclair', calories: 262, },
    { name: 'Cupcake', calories: 305, },
    { name: 'Gingerbread', calories: 356, },
    { name: 'Jelly bean', calories: 375, },
    { name: 'Lollipop', calories: 392, },
    { name: 'Honeycomb', calories: 408, },
    { name: 'Donut', calories: 452, },
    { name: 'KitKat', calories: 518, },
    { name: 'Frozen Yogurt', calories: 159, },
    { name: 'Ice cream sandwich', calories: 237, },
    { name: 'Eclair', calories: 262, },
    { name: 'Cupcake', calories: 305, },
    { name: 'Gingerbread', calories: 356, },
    { name: 'Jelly bean', calories: 375, },
    { name: 'Lollipop', calories: 392, },
    { name: 'Honeycomb', calories: 408, },
    { name: 'Donut', calories: 452, },
    { name: 'KitKat', calories: 518, },
    { name: 'Frozen Yogurt', calories: 159, },
    { name: 'Ice cream sandwich', calories: 237, },
    { name: 'Eclair', calories: 262, },
    { name: 'Cupcake', calories: 305, },
    { name: 'Gingerbread', calories: 356, },
    { name: 'Jelly bean', calories: 375, },
    { name: 'Lollipop', calories: 392, },
    { name: 'Honeycomb', calories: 408, },
    { name: 'Donut', calories: 452, },
    { name: 'KitKat', calories: 518, },
    { name: 'Frozen Yogurt', calories: 159, },
    { name: 'Ice cream sandwich', calories: 237, },
    { name: 'Eclair', calories: 262, },
    { name: 'Cupcake', calories: 305, },
    { name: 'Gingerbread', calories: 356, },
    { name: 'Jelly bean', calories: 375, },
    { name: 'Lollipop', calories: 392, },
    { name: 'Honeycomb', calories: 408, },
    { name: 'Donut', calories: 452, },
    { name: 'KitKat', calories: 518, },
    { name: 'Frozen Yogurt', calories: 159, },
    { name: 'Ice cream sandwich', calories: 237, },
    { name: 'Eclair', calories: 262, },
    { name: 'Cupcake', calories: 305, },
    { name: 'Gingerbread', calories: 356, },
    { name: 'Jelly bean', calories: 375, },
    { name: 'Lollipop', calories: 392, },
    { name: 'Honeycomb', calories: 408, },
    { name: 'Donut', calories: 452, },
    { name: 'KitKat', calories: 518, },
    { name: 'Frozen Yogurt', calories: 159, },
    { name: 'Ice cream sandwich', calories: 237, },
    { name: 'Eclair', calories: 262, },
    { name: 'Cupcake', calories: 305, },
    { name: 'Gingerbread', calories: 356, },
    { name: 'Jelly bean', calories: 375, },
    { name: 'Lollipop', calories: 392, },
    { name: 'Honeycomb', calories: 408, },
    { name: 'Donut', calories: 452, },
    { name: 'KitKat', calories: 518, },
    { name: 'Frozen Yogurt', calories: 159, },
    { name: 'Ice cream sandwich', calories: 237, },
    { name: 'Eclair', calories: 262, },
    { name: 'Cupcake', calories: 305, },
    { name: 'Gingerbread', calories: 356, },
    { name: 'Jelly bean', calories: 375, },
    { name: 'Lollipop', calories: 392, },
    { name: 'Honeycomb', calories: 408, },
    { name: 'Donut', calories: 452, },
    { name: 'KitKat', calories: 518, },
    { name: 'Frozen Yogurt', calories: 159, },
    { name: 'Ice cream sandwich', calories: 237, },
    { name: 'Eclair', calories: 262, },
    { name: 'Cupcake', calories: 305, },
    { name: 'Gingerbread', calories: 356, },
    { name: 'Jelly bean', calories: 375, },
    { name: 'Lollipop', calories: 392, },
    { name: 'Honeycomb', calories: 408, },
    { name: 'Donut', calories: 452, },
    { name: 'KitKat', calories: 518, },
  ]
</script>
