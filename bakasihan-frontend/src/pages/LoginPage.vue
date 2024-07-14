<style lang="scss" scoped>
  .background-image {
    background-image: url('../assets/linarang1.webp');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100dvh;
  }
</style>

<template>
  <div class="window-height background-image" >
    <div class="window-height q-pa-xl row items-center q-gutter-lg" style="background: rgba(0, 0, 0, 0.7);">
      <div class="col column justify-center text-left q-gutter-y-xs">
        <q-img src="../assets/logo.png" width="200px" height="200px" />
        <span class="text-h2 text-weight-bold text-grey-11">Entoy's Bakasihan</span>
      </div>
      <div class="col-4 column justify-center q-pa-xl login-main q-gutter-y-md bg-grey-11 shadow-12" style="border-radius: 20px;">
        <span class="text-h5 text-weight-normal text-left text-grey-9">Signin to your account</span>
        <q-form class="col column q-gutter-y-md full-width">
          <q-input v-model="text" color="dark" label="Username" class="col" />
          <q-input v-model="text" color="dark" label="Password" class="col" :type="!isPwd ? 'password' : 'text'" >
            <template v-slot:append>
              <q-icon :name="!isPwd ? 'mdi-eye-closed' : 'mdi-eye-outline'" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-btn color="accent" :to="{ name: 'index' }" label="signin" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const isPwd = ref(false);
  const text = ref('');
</script>
