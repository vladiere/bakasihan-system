<template>
  <ul class="menu menu-horizontal bg-base-200 rounded-xl gap-2 overflow-x-scroll">
    <li v-for="(item, index) in menus" :key="index"><button class="capitalize">{{ item.menu }}</button></li>
  </ul>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  interface HomeMenus {
    id: number,
    menu: string,
  }

  const menus: HomeMenus[] = ref([
    {
      id: 0,
      menu: 'all',
    },
    {
      id: 1,
      menu: 'starters',
    },
    {
      id: 2,
      menu: 'breakfast',
    },
    {
      id: 3,
      menu: 'lunch',
    },
    {
      id: 4,
      menu: 'supper',
    },
    {
      id: 5,
      menu: 'dinner',
    },
    {
      id: 6,
      menu: 'deserts',
    },
    {
      id: 7,
      menu: 'beverages',
    },
    {
      id: 8,
      menu: 'budget meal',
    },
  ]);
</script>
