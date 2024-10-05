<template>
  <div class="reciept" id="customers-receipt">
    <div class="flex justify-between">
      <div class="col">
        <h6 class="fst-col">
          <strong>{{ company_name }}</strong>
        </h6>
        <p class="fst-col">Address {{ address_name }}</p>
        <p class="fst-col">Cantact No. {{ contact_no }}</p>
      </div>
      <div class="col">
        <h5 class="receipt-name">RECEIPT</h5>
        <p class="text-underline">{{ created_time.toString() }}</p>
        <img
          src="../assets/logo.png"
          alt="Entoy's Bakasihan Logo"
          class="main-logo"
        />
      </div>
    </div>
    <div class="flex justify-between">
      <p class="text-underline col">
        Customer's Name: {{ reciept?.customer_name }}
      </p>
      <p class="text-underline col">Order No. {{ reciept?.order_no }}</p>
    </div>
    <hr />
    <p class="text-center"><strong>Foods</strong></p>
    <table class="menu-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in Foods" :key="food?.id" class="text-black">
          <td class="text-center">{{ food?.product_name }}</td>
          <td class="text-center">{{ food?.quantity }}</td>
          <td class="text-center">{{ formatToCurrency(food?.price || 0) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Drinks Table -->
    <p class="text-center"><strong>Drinks</strong></p>
    <table class="menu-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="drink in Drinks" :key="drink?.id" class="text-black">
          <td class="text-center">{{ drink?.product_name }}</td>
          <td class="text-center">{{ drink?.quantity }}</td>
          <td class="text-center">{{ formatToCurrency(drink?.price || 0) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between">
      <div class="col">
        <p class="fst-col">Order Type: {{ reciept?.order_type }}</p>
        <p class="fst-col">
          Status:
          <span
            :class="{
              'text-red-14': reciept?.status === 'unpaid',
              'text-green-14': reciept?.status !== 'unpaid',
            }"
            >{{ reciept?.status }}</span
          >
        </p>
      </div>
      <div class="total-amount">
        <p>Total Amount</p>
        <p class="underline">
          {{ formatToCurrency(reciept?.total_amount || 0) }}
        </p>
      </div>
    </div>
  </div>
  <div class="flex justify-evenly goback-btns">
    <q-btn
      label="download"
      icon="download"
      color="positive"
      @click="downloadReciept"
    />
    <q-btn
      label="goback"
      icon="arrow-left"
      color="negative"
      @click="gobackToIndex"
    />
  </div>
</template>

<script setup lang="ts">
import { foodOrder, recieptTypes } from 'src/components/models';
import { ref, computed, onMounted } from 'vue';
import {
  userReciept,
  humanizeDate,
  formatToCurrency,
} from 'src/services/api.services';
import html2canvas from 'html2canvas';
import { useOrderStore } from 'src/stores/orderStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const orderStore = useOrderStore();
const reciept = ref<recieptTypes | null>(null);
const Foods = ref<Array<foodOrder | null>>([]);
const Drinks = ref<Array<foodOrder | null>>([]);
const company_name = "Entoy's Bakasihan";
const address_name = 'Buagsong, Cordova, Cebu';
const contact_no = '0923155321';

const created_time = computed(() => {
  return reciept.value ? humanizeDate(reciept.value.ctime) : '';
});

const gobackToIndex = () => {
  orderStore.resetOrders();
  window.location.reload();
};

const downloadReciept = async () => {
  const reciept = document.querySelector(
    '#customers-receipt'
  ) as HTMLDataElement;
  if (reciept) {
    try {
      const canvas = await html2canvas(reciept);
      const imageData = canvas.toDataURL('image/png');

      //create an image element or download the image

      const imgElement = document.createElement('img');
      imgElement.src = imageData;
      document.body.appendChild(imgElement);

      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'screenshot.png';
      link.click();
    } catch (error) {
      console.error('Error capturing element:', error);
    }
  } else {
    console.error('Element not found');
  }
};

const handleGetReciept = async () => {
  const postData = {
    order_no: orderStore.myOrder?.order_no,
    customer_name: orderStore.myOrder?.customer_name,
  };
  await userReciept(postData)
    .then((response) => {
      reciept.value = response.data.reciept;
      Foods.value = JSON.parse(`${reciept.value?.foods}`);
      Drinks.value = JSON.parse(`${reciept.value?.drinks}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  handleGetReciept();
});
</script>

<style scoped>
.main-logo {
  width: 30vw; /* Set width to 30% of the viewport width */
  height: 30vw; /* Set height equal to width for a perfect square */
  max-height: 30vh; /* Limit the height to 30% of the viewport height */
  max-width: 30vh; /* Limit the width to 30% of the viewport height */
  object-fit: cover; /* Ensure the image covers the entire area */
}

.receipt-name {
  margin-left: 4%;
}
.text-underline {
  text-decoration: underline;
  margin-left: 4%;
}
.fst-col {
  margin-left: 4%;
}
.menu-table {
  width: 100%;
  border-collapse: collapse; /* Collapse borders */
  margin-bottom: 20px; /* Add spacing between tables */
}

.menu-table th,
.menu-table td {
  text-align: center; /* Center align text */
  padding: 8px; /* Add padding */
  border: 1px solid #ddd; /* Add border */
}

.menu-table th {
  background-color: #f2f2f2; /* Light background for header */
}

.menu-table th:nth-child(1), /* First column (Name) */
.menu-table td:nth-child(1) {
  width: 50%; /* Set width to 50% */
}

.menu-table th:nth-child(2), /* Second column (Quantity) */
.menu-table td:nth-child(2) {
  width: 25%; /* Set width to 25% */
}

.menu-table th:nth-child(3), /* Third column (Price) */
.menu-table td:nth-child(3) {
  width: 25%; /* Set width to 25% */
}
.total-amount {
  margin-right: 9%;
  text-align: center;
}
.underline {
  text-decoration: underline;
}
.reciept {
  border: solid 2px #000;
  margin: 4%;
}
.goback-btns {
  margin-bottom: 4%;
}
</style>
