<template>
  <div class="card card-compact w-48 bg-base-100 shadow-xl">
    <figure><img :src=props.img :alt=props.name /></figure>
    <div class="card-body">
      <h2 class="card-title capitalize">{{ props.name }}</h2>
      <div class="card-actions">
        <div class="badge badge-primary">&#8369;{{ props.price }}</div> 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    id: number,
    img: string,
    name: string,
    price: number,
    category: string,
  }>();
</script>
