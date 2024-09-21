<template>
  <q-page padding class="fit column">
    <!-- content -->
    <div
      class="col row items-center justify-center flex-wrap q-gutter-x-lg full-height"
    >
      <TableComponent
        v-for="n in 10"
        :key="n"
        :table_no="n"
        @select-table="tableSelected"
      />
    </div>
    <div class="col row items-end justify-between q-px-lg">
      <div class="row items-center q-gutter-x-lg">
        <div class="row items-center q-gutter-x-sm">
          <div class="q-pa-md bg-green" style="border-radius: 50%"></div>
          <span class="text-body1 text-weight-normal">Vacant</span>
        </div>
        <div class="row items-center q-gutter-x-sm">
          <div class="q-pa-md bg-red-5" style="border-radius: 50%"></div>
          <span class="text-body1 text-weight-normal">Occupied</span>
        </div>
        <div class="row items-center q-gutter-x-sm">
          <div class="q-pa-md bg-grey-8" style="border-radius: 50%"></div>
          <span class="text-body1 text-weight-normal">On hold</span>
        </div>
      </div>
      <div class="row items-center q-gutter-x-md">
        <q-btn
          dense
          flat
          v-if="isSelected"
          color="grey-6"
          label="cancel"
          @click="isSelected = !isSelected"
          class="q-px-md"
        />
        <q-btn
          dense
          :disabled="!isSelected"
          :color="isSelected ? 'positive' : 'grey-6'"
          label="select & place order"
          @click="clicked"
          class="q-px-md"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import TableComponent from 'components/TableComponent.vue';

const isSelected = ref(false);

const tableSelected = (n_id: any) => {
  isSelected.value = true;
  console.log(n_id);
};

const clicked = () => {
  console.log('selected and place order');
};
</script>
