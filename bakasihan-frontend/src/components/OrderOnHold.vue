<template>
  <div class="q-pa-md column q-gutter-y-md shadow-12" style="border-radius: 15px; width: 302px;">
    <q-scroll-area style="height: calc(100vh - 300px);">
      <q-list>
        <q-item v-for="n in 5" :key="n">
          <q-item-section avatar>
            <q-avatar color="accent" text-color="white" icon="mdi-food" />
          </q-item-section>

          <q-item-section>Order item name</q-item-section>

          <q-item-section side>
            <span class="text-weight-normal text-body1">{{ n }}</span>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    <div class="row items-center justify-between q-gutter-x-md">
      <q-btn dense no-caps color="positive" label="Pay" class="col" />
      <q-btn dense no-caps color="negative" label="Remove" class="col" />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
