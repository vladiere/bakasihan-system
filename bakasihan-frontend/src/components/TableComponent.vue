<template>
  <div class="column items-center q-pa-sm q-gutter-y-md cursor-pointer" @click="$emit('selectTable', props.table_no)">
    <div class="q-mx-md q-pa-xs bg-grey-5" style="width: 75%; border-radius: 15px;"></div>
    <div class="row q-gutter-x-md">
      <div class="q-pa-xs bg-grey-5" style="border-radius: 15px;"></div>
      <div class="q-pa-lg bg-grey-5 column items-center justify-center" style="border-radius: 15px; width: 155px; height: 150px;">
        <span class="text-body1 text-center">TABLE {{ props.table_no }}</span>
        <span class="text-body1 text-center">#4232</span>
      </div>
      <div class="q-pa-xs bg-grey-5" style="border-radius: 15px;"></div>
    </div>
    <div class="q-mx-md q-pa-xs bg-grey-5" style="width: 75%; border-radius: 15px;"></div>
  </div>
</template>

<script setup lang="ts">

  const props = defineProps({
    table_no: null,
  });
</script>
