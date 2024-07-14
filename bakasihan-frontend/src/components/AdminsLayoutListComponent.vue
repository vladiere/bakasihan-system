<template>
  <q-item clickable v-ripple :inset-level="0.7" :to="{ name: props.path_name }">
    <q-item-section avatar>
      <q-icon color="accent" :name="props.icon_name" />
    </q-item-section>
    <q-item-section>{{ props.title }}</q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface AdminsLayoutListInterface {
  title: string;
  icon_name: string;
  path_name: string;
}
const props = defineProps<AdminsLayoutListInterface>();
</script>
