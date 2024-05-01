<template>
  <div class="collapse collapse-plus join-item border border-base-100 bg-base-200">
    <div class="collapse-title text-4md font-medium flex items-center capitalize">
      click to open this one and close others
    </div>
    <input type="radio" name="my-accordion-3" checked="checked" /> 
    <div class="collapse-content"> 
      <div class="grid grid-cols-5 gap-4 items-end">
        <label class="form-control w-full max-w-xs col-span-2">
          <span class="label-text">Quantity</span>
          <input type="number" min="1" placeholder="Type here" class="input input-sm input-bordered w-full max-w-xs" />
        </label>
        <label class="form-control w-full max-w-xs col-span-2">
          <span class="label-text">Discount(%)</span>
          <input type="number" min="0" placeholder="Type here" class="input input-sm input-bordered w-full max-w-xs" />
        </label>
        <button class="flex justify-center tooltip tooltip-top col-span-1" data-tip="Remove">
          <IconDelete classes="h-6 w-6 text-red-400 mr-2"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import IconDelete from "../components/icons/IconDelete.vue";
</script>
