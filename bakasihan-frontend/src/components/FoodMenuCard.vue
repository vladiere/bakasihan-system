<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 280px
</style>

<template>
  <q-card class="my-card q-ma-sm" bordered>
    <img src="https://cdn.quasar.dev/img/parallax2.jpg">

    <q-list>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="primary" name="local_bar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Bar XYZ</q-item-label>
          <q-item-label caption>Have a drink.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="red" name="local_gas_station" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Gas Station</q-item-label>
          <q-item-label caption>Fill your gas tank.</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
</script>
