<template>
  <div
    class="column items-center q-pa-sm q-gutter-y-md cursor-pointer"
    @click="$emit('selectTable', props.table_no)"
  >
    <div
      class="q-mx-md q-pa-xs"
      :class="{
        'bg-green': props.status === 1,
        'bg-red-5': props.status === 2,
        'bg-grey-8': props.status === 3,
      }"
      style="width: 75%; border-radius: 15px"
    ></div>
    <div class="row q-gutter-x-md">
      <div
        class="q-pa-xs"
        style="border-radius: 15px"
        :class="{
          'bg-green': props.status === 1,
          'bg-red-5': props.status === 2,
          'bg-grey-8': props.status === 3,
        }"
      ></div>

      <div
        class="q-pa-lg column items-center justify-center"
        style="border-radius: 15px; width: 155px; height: 150px"
        :class="{
          'bg-green': props.status === 1,
          'bg-red-5': props.status === 2,
          'bg-grey-8': props.status === 3,
        }"
      >
        <span class="text-body1 text-center">TABLE {{ props.table_no }}</span>
        <span class="text-body1 text-center" v-if="props.order_no"
          >#{{ props.order_no }}</span
        >
        <span class="text-body1 text-center" v-else>Available</span>
      </div>
      <div
        class="q-pa-xs"
        :class="{
          'bg-green': props.status === 1,
          'bg-red-5': props.status === 2,
          'bg-grey-8': props.status === 3,
        }"
        style="border-radius: 15px"
      ></div>
    </div>
    <div
      class="q-mx-md q-pa-xs"
      :class="{
        'bg-green': props.status === 1,
        'bg-red-5': props.status === 2,
        'bg-grey-8': props.status === 3,
      }"
      style="width: 75%; border-radius: 15px"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  table_no: {
    type: Number, // Specify type(s), for example, it could be a number or string
    default: 0, // Assign a default value (null or any other)
  },
  order_no: {
    type: String,
    default: null, // You already set this as null, keep it consistent
  },
  status: {
    type: Number, // Assuming status is a number, you can change this type if needed
    default: 0,
  },
});
</script>
