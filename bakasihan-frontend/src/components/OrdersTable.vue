<template>
  <q-table
    flat bordered
    title="ORDER HISTORY"
    :rows="rows"
    :columns="columns"
    row-key="name"
    :filter="filter"
    separator="vertical"
    virtual-scroll
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    style="height: calc(100vh - 155px)"
  >
    <template v-slot:top>
      <q-input dense outlined rounded color="accent" label="Search" v-model="filter" />
    </template>

    <template v-slot:body-cell="props">
      <q-td :props="props" @click="$emit('onItemClick', props.row)" class="cursor-pointer">
        {{ props.value }}
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const pagination = ref({ rowsPerPage: 0 });
  const filter = ref(null);
  const columns = [
    { name: 'name', required: true, label: 'Dessert (100g serving)', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
    { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
    { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  ]

  const rows = [
    { name: 'Frozen Yogurt', calories: 159, fat: 6.0, },
    { name: 'Ice cream sandwich', calories: 237, fat: 9.0, },
    { name: 'Eclair', calories: 262, fat: 16.0, },
    { name: 'Cupcake', calories: 305, fat: 3.7, },
    { name: 'Gingerbread', calories: 356, fat: 16.0, },
    { name: 'Jelly bean', calories: 375, fat: 0.0, },
    { name: 'Lollipop', calories: 392, fat: 0.2, },
    { name: 'Honeycomb', calories: 408, fat: 3.2, },
    { name: 'Donut', calories: 452, fat: 25.0, },
    { name: 'KitKat', calories: 518, fat: 26.0, }
  ]
</script>
