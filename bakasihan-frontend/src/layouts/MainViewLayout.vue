<template>
  <div class="h-screen flex flex-col">
    <HeaderComponent />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import HeaderComponent from '../components/HeaderComponent.vue';
</script>
