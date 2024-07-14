<template>
  <q-table
    flat bordered
    title="Sales History"
    :rows="rows"
    :columns="columns"
    row-key="index"
    separator="vertical"
    :pagination="pagination"
    :filter="filter"
  >
    <template v-slot:top>
      <span class="text-h6 text-weight-bold">Sales History</span>
      <q-space />
      <q-input dense outlined rounded color="accent" v-model="filter" label="Search..." />
    </template>
  </q-table>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const pagination = ref({ rowsPerPage: 6 });
  const filter = ref(null);

  const columns = [
    { name: 'name', required: true, label: 'Dessert (100g serving)', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
    { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
    { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
    { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  ]

  const rows = [
    { name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, },
    { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 23, },
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, },
    { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, },
    { name: 'Jelly bean', calories: 375, fat: 0.0, carbs: 94, },
    { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, },
    { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, },
    { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, },
    { name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, }
  ]
</script>
