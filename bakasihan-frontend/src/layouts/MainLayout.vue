<script setup lang="ts">
import { RouterView } from 'vue-router'
import LeftMenuComponent from '../components/LeftMenuComponent.vue';
import RightMenuComponent from '../components/RightMenuComponent.vue';

</script>

<template>
  <div class="grid grid-cols-3 gap-2 h-full">
    <div class="col-span-2 p-3 h-full">
      <RouterView />
    </div>
    <RightMenuComponent classes="border-l-2 border-base-200 dark:border-base-200 flex flex-col" />
  </div>
</template>
