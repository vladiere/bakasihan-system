<template>
  <q-page padding>
    <q-row class="first-grid-view">
      <div v-for="(item, index) in dashboardStore.salesData" :key="index">
        <q-card class="sales-card" :color="item.color" text-color="white">
          <q-card-section class="text-center">
            <q-icon :name="item.icon" size="50px" />
            <div class="text-h6">{{ item.title }}</div>
            <div class="text-h5">{{ item.sales }}</div>
          </q-card-section>
          <q-card-section v-if="item.status === 2 && parseInt(item.sales) > 0">
            <q-btn color="positive" label="Go Now" :to="item.path" />
          </q-card-section>
        </q-card>
      </div>
    </q-row>
    <div class="third-grid-view">
      <q-card>
        <q-card-section>
          <div class="chart-container">
            <canvas id="monthlysales" ref="monthlysales"></canvas>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="third-grid-view">
      <q-card>
        <q-card-section>
          <div class="chart-container">
            <canvas id="weeklysales" ref="weeklysales"></canvas>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue';
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import { useDashboardStore } from '../stores/dashboardData';
import {
  humanizeDate,
  humanizeDateMonthlyDate,
} from '../services/api.services';

const dashboardStore = useDashboardStore();
Chart.register(...registerables);
const chartData = ref<Array<number>>([]);
const chartInstance = ref<Chart | null>(null);
const monthlySalesLabel = ref<Array<string>>([]);
const monthlySalesData = ref<Array<number>>([]);
const weeklySalesLabel = ref<Array<string>>([]);
const weeklySalesData = ref<Array<number>>([]);
let datenow = new Date();
datenow.toISOString();
console.log(datenow);
// Watch for changes in sales values and update chart data accordingly
watch(
  () => dashboardStore.salesData,
  async (newSalesData) => {
    // Assuming you want to update the chart with new sales data here
    chartData.value = newSalesData.map((item) => {
      const salesValue = item.sales.replace(/[^0-9.-]+/g, ''); // Remove any non-numeric characters
      return parseFloat(salesValue); // Use parseFloat for decimal values
    });

    if (chartInstance.value) {
      chartInstance.value.destroy();
      chartInstance.value = null;
    }

    await nextTick();
    const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
    const mylabel = [
      'Today',
      'This Week',
      'This Month',
      'This Year',
      'New Orders',
    ];
    const mybackground = ['green', 'blue', 'orange', 'red', 'yellow'];
    createChart(
      'Sample Sales',
      mybackground,
      chartData.value,
      mylabel,
      canvas,
      'bar' as keyof ChartTypeRegistry
    );
  }
);
console.log('myData', dashboardStore.monthlySales);

watch(
  () => dashboardStore.monthlySales,
  async (salesMonthly) => {
    console.log('monthly', salesMonthly);

    monthlySalesData.value = [];
    monthlySalesData.value.push(
      ...salesMonthly.map((data) => parseInt(data.sales))
    );
    monthlySalesLabel.value = [];
    monthlySalesLabel.value.push(
      ...salesMonthly.map((data) => humanizeDateMonthlyDate(data.data_date))
    );
    console.log('my monthly sales :', monthlySalesData.value);
    if (chartInstance.value) {
      chartInstance.value.destroy();
      chartInstance.value = null;
    }

    await nextTick();
    const canvas = document.getElementById('monthlysales') as HTMLCanvasElement;
    const mybackground = ['green', 'blue', 'orange', 'red', 'yellow'];
    createChart(
      'Monthly Sales',
      mybackground,
      monthlySalesData.value,
      monthlySalesLabel.value,
      canvas,
      'bar' as keyof ChartTypeRegistry
    );
  },
  { immediate: false }
);

watch(
  () => dashboardStore.weeklySales,
  async (salesWeekly) => {
    console.log('weekly', salesWeekly);

    weeklySalesData.value = [0];
    weeklySalesData.value.push(
      ...salesWeekly.map((data) => parseInt(data.sales))
    );
    weeklySalesLabel.value = [''];
    weeklySalesLabel.value.push(
      ...salesWeekly.map((data) => String(data.data_date))
    );
    console.log('my weekly sales :', weeklySalesData.value);
    if (chartInstance.value) {
      chartInstance.value.destroy();
      chartInstance.value = null;
    }
    await nextTick();

    const canvas = document.getElementById('weeklysales') as HTMLCanvasElement;
    const mybackground = ['green', 'blue', 'orange', 'red', 'yellow'];
    createChart(
      `weekly Sales This Month ( ${humanizeDate(String(datenow))} )`,
      mybackground,
      weeklySalesData.value,
      weeklySalesLabel.value,
      canvas,
      'line' as keyof ChartTypeRegistry
    );
  },
  { immediate: false }
);

// Create chart function
const createChart = (
  dataset_label: string,
  background: Array<string | null>,
  data: Array<number | null>,
  labels: Array<string | null>,
  canvas: HTMLCanvasElement,
  bar_type: keyof ChartTypeRegistry
) => {
  const ctx = canvas.getContext('2d');
  console.log('datalabels', labels);
  console.log('data', data);
  if (ctx) {
    const validBackground = background.filter(
      (color): color is string => color !== null
    );
    return new Chart(ctx, {
      type: bar_type, // You can change the type to 'line', 'pie', etc.
      data: {
        labels: labels,
        datasets: [
          {
            label: dataset_label,
            data: data,
            backgroundColor: validBackground,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  } else {
    console.error('Failed to get canvas context.');
    return null;
  }
};

// Fetch data on mounted
onMounted(async () => {
  await dashboardStore.fetchData(); // Call the fetchData method from the store if needed
});
</script>

<style>
.chart-container {
  position: relative;
  width: 100%; /* Full width */
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  /* Remove height: 0; */
}

.chart-container canvas {
  position: absolute; /* Position the canvas inside the container */
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
}

.second-grid-view,
.third-grid-view {
  margin-top: 20px; /* Add top margin for spacing */
  height: auto; /* Allow the height to be determined by content */
}

@media screen and (max-width: 765px) {
  .sales-card {
    min-height: 150px; /* Maintain consistency */
    display: flex;
    flex-direction: wrap;
    margin-top: 2%;
  }
  .first-grid-view {
    display: flex;
    flex-direction: column;
  }
}
@media screen and (min-width: 765px) {
  .sales-card {
    min-height: 150px; /* Maintain consistency */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
  }
  .first-grid-view {
    display: flex;
    flex-wrap: wrap; /* Allows cards to wrap to the next line */
    justify-content: space-between; /* Aligns items with space between */
  }
}
.q-col {
  padding: 8px; /* Add padding to create margin effect */
}
</style>
