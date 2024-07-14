<template>
  <q-table
    flat bordered
    title="Recent Customers"
    :rows="rows"
    :columns="columns"
    row-key="name"
    :filter="filter"
    separator="vertical"
    virtual-scroll
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    style="height: calc(100vh - 85px)"
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
    { name: 'KitKat', calories: 518, }
  ]
</script>
