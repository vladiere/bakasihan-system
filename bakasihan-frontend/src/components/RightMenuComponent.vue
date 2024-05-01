<template>
  <div :class=props.classes>
    <div class="flex justify-between p-3">
      <button class="flex gap-2 btn btn-sm rounded-xl bg-base-300" onclick="my_modal_3.showModal()">
        <IconPlus classes="h-6 w-6"/>
        Add customer
      </button>
      <div class="flex gap-2">
        <button class="btn btn-sm rounded-xl bg-base-300 tooltip tooltip-bottom" data-tip="Add">
          <IconPlus classes="h-6 w-6"/>
        </button>
        <button class="btn btn-sm rounded-xl bg-base-300 tooltip tooltip-bottom" data-tip="Reset">
          <IconRefresh classes="h-6 w-6"/>
        </button>
      </div>
    </div>
    <div class="divider p-0 my-1"></div>
    <div class="px-3 h-[40%] overflow-y-scroll">
      <div class="join join-vertical w-full">
        <MenuAccordionComponent v-for="n in 10" />
      </div>
    </div>
    <div class="p-3 rounded-xl">
      <div class="flex flex-col gap-1 bg-base-300 p-3 rounded-xl">
        <div class="flex justify-between">
          <p>Subtotal</p>
          <p>&#8369;1235.00</p>
        </div>
        <div class="flex justify-between">
          <p>Payable Amount</p>
          <p>&#8369;5235.00</p>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button class="btn btn-sm btn-warning">Hold Order</button>
          <button class="btn btn-sm btn-success">Proceed</button>
        </div>
      </div>
    </div>
  </div>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-lg">Add new customer</h3>
      <div class="py-4">
        <label class="form-control w-full">
          <span class="label-text">Enter customer's name</span>
          <input type="text" placeholder="Type here" class="input input-bordered w-full" />
        </label>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
  import IconPlus from '../components/icons/IconPlus.vue';
  import IconRefresh from '../components/icons/IconRefresh.vue';
  import MenuAccordionComponent from "../components/MenuAccordionComponent.vue";

  const props = defineProps<{
    classes: string,
  }>();
</script>
