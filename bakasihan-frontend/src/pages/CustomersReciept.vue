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
    <div v-for="order in orders" :key="order?.id">
      <p class="text-center">
        <strong>{{ order?.category_name }}</strong>
      </p>
      <table class="menu-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price per serve</th>
            <th>Sub Price(price * quantity)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="prod in order?.products"
            :key="prod?.id"
            class="text-black"
          >
            <td class="text-center">{{ prod?.product_name }}</td>
            <td class="text-center">{{ prod?.quantity }}</td>
            <td class="text-center">
              {{ formatToCurrency(prod?.price || 0) }}
            </td>
            <td class="text-center">
              {{
                formatToCurrency(
                  Math.floor((prod?.price ?? 0) * (prod?.quantity ?? 1))
                )
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
    <div class="flex justify-end" v-if="reciept?.status === 'paid'">
      <div class="total-cash">
        <p>Cash</p>
        <p class="underline">
          {{ formatToCurrency(reciept?.customer_cash || 0) }}
        </p>
      </div>
    </div>
    <div class="flex justify-end" v-if="reciept?.status === 'paid'">
      <div class="total-change">
        <p>Change</p>
        <p class="underline">
          {{ formatToCurrency(reciept?.customer_change || 0) }}
        </p>
      </div>
    </div>
  </div>
  <div
    class="flex justify-evenly goback-btns"
    v-if="reciept?.status === 'paid'"
  >
    <q-btn
      label="download"
      icon="download"
      color="positive"
      @click="downloadRecieptData"
    />
    <q-btn label="goback" icon="undo" color="negative" @click="gobackToIndex" />
  </div>
</template>

<script setup lang="ts">
import {
  productsOrderDataT,
  recieptTypes,
  NotificationOptions,
} from 'src/components/models';
import { io } from 'socket.io-client';
import { ref, computed, onMounted, watchEffect } from 'vue';
import {
  userReciept,
  humanizeDate,
  formatToCurrency,
  downloadReciept
} from 'src/services/api.services';
import { useOrderStore } from 'src/stores/orderStore';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const orderStore = useOrderStore();
const socketServerApiURL = 'http://localhost:7000';
const reciept = ref<recieptTypes | null>(null);
const orders = ref<Array<productsOrderDataT | null>>([]);
const socket = io(socketServerApiURL);
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

const downloadRecieptData = ()=>{
  const recieptData = document.querySelector('#customers-receipt') as HTMLDataElement;
  downloadReciept(recieptData)
}


const handleGetReciept = async () => {
  const postData = {
    order_no: orderStore.myOrder?.order_no,
    customer_name: orderStore.myOrder?.customer_name,
  };
  await userReciept(postData)
    .then((response) => {
      reciept.value = response.data.reciept;
      orders.value = JSON.parse(`${reciept.value?.orders}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
const optionsNotifications = (message: string) => {
  const options: NotificationOptions = {
    body: message,
    requireInteraction: true,
    vibrate: [200, 100, 200],
    icon: '',
  };
  return options;
};
watchEffect(() => {
  socket.on('connect', () => {
    console.log('socket is connected successfully');
    socket.emit('joinUserOrderRoom', orderStore.myOrder?.order_no);
  });
  socket.on('messageFromAdmin', (data) => {
    if (Notification.permission == 'granted') {
      new Notification('New Message', optionsNotifications(data));
    } else {
      $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'check',
        message: data,
      });
    }
    window.location.reload()
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
});
onMounted(() => {
  handleGetReciept();
});
</script>

<style scoped>
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
  padding: 12px 8px; /* Increase padding for better readability */
  border: 1px solid #ddd; /* Add a border to cells */
}

.menu-table th {
  background-color: #f8f8f8; /* Light background for header */
  font-weight: bold; /* Make header text bold */
  text-transform: uppercase; /* Capitalize header text */
}

.menu-table th:nth-child(1),
.menu-table td:nth-child(1) {
  width: 40%; /* Set width for the first column (Name) */
}

.menu-table th:nth-child(2),
.menu-table td:nth-child(2) {
  width: 20%; /* Set width for the second column (Quantity) */
}

.menu-table th:nth-child(3),
.menu-table td:nth-child(3),
.menu-table th:nth-child(4),
.menu-table td:nth-child(4) {
  width: 20%; /* Set width for price and sub price columns */
}

.menu-table tr:nth-child(even) {
  background-color: #f9f9f9; /* Light gray for even rows */
}

.menu-table tr:hover {
  background-color: #f1f1f1; /* Light hover effect */
}
.total-amount {
  margin-right: 6%;
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
.total-cash{
  margin-right: 7%;
  text-align: center;
}
.total-change{
  margin-right: 7%;
  text-align: center;
}
.main-logo {
  width: clamp(20vw, 30vw, 30vh); /* Adjusts based on viewport width */
  height: clamp(20vw, 30vw, 30vh); /* Keeps height proportional */
  object-fit: cover;
}

.receipt-name,
.text-underline,
.fst-col,
.total-amount,
.total-cash,
.total-change,
.underline {
  font-size: clamp(0.8rem, 1.2vw + 0.5rem, 1.5rem);
}

.menu-table th,
.menu-table td {
  font-size: clamp(0.7rem, 1vw + 0.4rem, 1.25rem);
}

.menu-table th {
  font-size: clamp(1rem, 1.5vw + 0.5rem, 1.5rem);
}

th,
.menu-table th:nth-child(1),
.menu-table td:nth-child(1),
.menu-table th:nth-child(2),
.menu-table td:nth-child(2),
.menu-table th:nth-child(3),
.menu-table td:nth-child(3),
.menu-table th:nth-child(4),
.menu-table td:nth-child(4) {
  font-size: clamp(0.8rem, 1vw + 0.3rem, 1.25rem);
}

.goback-btns {
  font-size: clamp(0.9rem, 1vw + 0.3rem, 1.1rem);
}

.reciept {
  border: solid 2px #000;
  margin: 4%;
  padding: 2%;
}
</style>
