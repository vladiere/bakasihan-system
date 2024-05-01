<template>
  <div class="flex flex-col gap-2">
    <HomeMenuHeaderComponent />
    <div class="max-h-[15%] overflow-y-scroll">
      <div class="flex flex-wrap gap-6 justify-center">
        <FoodCardComponent v-for="(item, index) in foods" :key="index" v-bind="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import HomeMenuHeaderComponent from '../components/HomeMenuHeaderComponent.vue';
  import FoodCardComponent from "../components/FoodCardComponent.vue";

  interface FoodMenu {
    id: number,
    img: string,
    name: string,
    price: number,
    category: string,
    description: string,
  }

  const foods: FoodMenu[] = [
    {
      id: 0,
      img: 'https://source.unsplash.com/random',
      name: 'larang',
      price: 55.5,
      category: 'dinner',
      description: 'Lorem ipsum dolor sit amet, qui',
    },
    {
      id: 1,
      img: 'https://source.unsplash.com/random',
      name: 'larang',
      price: 55.5,
      category: 'dinner',
      description: 'adipisicing minim sint cillum sint consectetur cupidatat.',
    },
    {
      id: 2,
      img: 'https://source.unsplash.com/random',
      name: 'larang',
      price: 55.5,
      category: 'dinner',
      description: 'Lorem adipisicing minim sint cillum sint consectetur cupidatat.',
    },
    {
      id: 3,
      img: 'https://source.unsplash.com/random',
      name: 'larang',
      price: 55.5,
      category: 'dinner',
      description: 'labore adipisicing minim sint cillum sint consectetur cupidatat.',
    },
    {
      id: 4,
      img: 'https://source.unsplash.com/random',
      name: 'larang',
      price: 55.5,
      category: 'dinner',
      description: 'dolor sit amet, qui minim labore adipisicing minim sint cillum',
    }
  ];
</script>
