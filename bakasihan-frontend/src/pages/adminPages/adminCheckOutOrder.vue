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
          src="../../assets/logo.png"
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
  <div class="flex justify-evenly goback-btns">
    <q-btn
      label="download"
      icon="download"
      color="positive"
      @click="downloadReciept"
      v-if="reciept?.status === 'paid'"
    />
    <q-btn label="goback" icon="undo" color="negative" @click="gobackToIndex" />
    <q-btn
      label="Pay"
      icon="money"
      color="primary"
      @click="payCash = true"
      v-if="reciept?.status === 'unpaid'"
    />
  </div>
  <q-dialog v-model="payCash" persistent>
    <q-card>
      <q-card-section class="q-pt-md">
        <h6 class="q-mb-none">Pay</h6>
        <p class="text-h6">
          {{ formatToCurrency(reciept?.total_amount || 0) }}
        </p>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-input
          dense
          label="Amount"
          v-model="cash"
          type="number"
          :rules="[(val) => val >= 0 || 'Amount must be positive']"
          autofocus
        />
        <div class="mt-4 text-h6">Change: {{ calculateAmountPaid }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="q-gutter-md">
          <q-btn
            label="Cancel"
            color="grey"
            @click="(payCash = false), (cash = 0)"
          />
          <q-btn label="Confirm" color="primary" @click="confirmPayment" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { productsOrderDataT, recieptTypes } from 'src/components/models';
import { io } from 'socket.io-client';
import { ref, computed, onMounted, watchEffect } from 'vue';
import {
  userReciept,
  humanizeDate,
  formatToCurrency,
  checkOutOrder,
} from 'src/services/api.services';
import html2canvas from 'html2canvas';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const cash = ref<number>(0);
const socketServerApiURL = 'http://localhost:7000';
const reciept = ref<recieptTypes | null>(null);
const orders = ref<Array<productsOrderDataT | null>>([]);
const socket = io(socketServerApiURL);
const payCash = ref(false);
const company_name = "Entoy's Bakasihan";
const address_name = 'Buagsong, Cordova, Cebu';
const contact_no = '0923155321';

const created_time = computed(() => {
  return reciept.value ? humanizeDate(reciept.value.ctime) : '';
});
const confirmPayment = async () => {
  if ((cash.value || 0) < (reciept.value?.total_amount || 0)) {
    $q.notify({
      icon: 'close',
      color: 'negative',
      message: 'Cash is not Enough',
    });
  } else {
    await checkOutOrder({
      order_no: reciept.value?.order_no,
      customer_name: reciept.value?.customer_name,
      cash: cash.value,
      total_amount: reciept.value?.total_amount,
    })
      .then((response) => {
        $q.notify({
          icon: 'check',
          color: 'positive',
          message: response.data.message,
        });
        const newMessage = {
          room: reciept.value?.order_no,
          message: 'Order Has been Checked Out!!',
        };
        cash.value = 0;
        payCash.value = false;
        handleGetReciept();
        socket.emit('messageUserOrder', newMessage);
      })
      .catch((err) => {
        $q.notify({
          icon: 'close',
          color: 'negative',
          message: err.response.data.message,
        });
      });
  }
};

const gobackToIndex = () => {
  router.push('/admin/adminNewOrders');
};
const calculateAmountPaid = computed(() => {
  if (reciept.value) {
    const totalAmount = reciept.value.total_amount || 0; // Default to 0 if undefined
    const cashAmount = cash.value || 0; // Default to 0 if undefined

    if (cashAmount < totalAmount) {
      return 'Your cash is not enough';
    } else {
      const splitChange = Math.floor(totalAmount - cashAmount);
      if (splitChange === 0) {
        return 0;
      } else {
        const parsedChange = splitChange.toFixed();
        const fixedData = parsedChange.substring(1, parsedChange.length);
        const checkData = parseInt(fixedData);
        return formatToCurrency(checkData);
      }
    }
  }
  return ''; // Return an empty string or appropriate value if reciept.value is not defined
});

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
    order_no: route.params.order_no,
    customer_name: route.params.customer_name,
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

watchEffect(() => {
  socket.on('connect', () => {
    console.log('socket is connected successfully');
    socket.emit('joinUserOrderRoom', route.params.order_no);
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
.total-cash {
  margin-right: 8%;
  text-align: center;
}
.total-change {
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
