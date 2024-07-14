<template>
  <q-page class="row items-center justify-evenly q-pa-md">
    <FoodMenuCard v-for="n in 15" :key="n" />
  </q-page>
</template>

<script setup lang="ts">
  import FoodMenuCard from 'components/FoodMenuCard.vue';
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  watch(() => router.currentRoute.value, (newVal, oldVal) => {
    console.log(newVal.query.search);
  });
</script>
