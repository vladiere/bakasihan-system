<template>
  <q-page padding>
    <div class="flex justify-end" style="margin-bottom: 3%">
      <q-btn label="Generate Report" icon="report" color="primary" />
    </div>
    <q-row class="first-grid-view">
      <q-col
        v-for="(item, index) in salesData"
        :key="index"
        cols="12"
        sm="12"
        md="6"
        lg="3"
      >
        <q-card class="sales-card" :color="item.color" text-color="white">
          <q-card-section class="text-center">
            <q-icon :name="item.icon" size="50px" />
            <div class="text-h6">{{ item.title }}</div>
            <div class="text-h5">{{ item.sales }}</div>
          </q-card-section>
        </q-card>
      </q-col>
    </q-row>
    <div class="second-grid-view">
      <q-card>
        <q-card-section>
          <div class="chart-container">
            <canvas id="salesChart" ref="salesChart"></canvas>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import {
  adminGetAllDataDashBoardRequired,
  formatToCurrency,
} from '../services/api.services';
Chart.register(...registerables);
const loading = ref(false);
const todaySales = ref(0);
const thisWeekSales = ref(0);
const thisMonthSales = ref(0);
const thisYearSales = ref(0);
const chartData = ref<Array<number>>([]);

// Function to fetch data
const handleGetData = async () => {
  loading.value = true;
  try {
    const res = await adminGetAllDataDashBoardRequired();
    const { TodaySales, ThisWeekSales, ThisMonthSales, ThisYearSales } =
      res.data;

    todaySales.value = TodaySales;
    thisWeekSales.value = ThisWeekSales;
    thisMonthSales.value = ThisMonthSales;
    thisYearSales.value = ThisYearSales;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};
type salesDataT = {
  title: string;
  sales: string;
  icon: string;
  color: string;
};

// Watch for changes in sales values and update salesData accordingly
const salesData = ref<Array<salesDataT>>([]);
watch([todaySales, thisWeekSales, thisMonthSales, thisYearSales], () => {
  salesData.value = [
    {
      title: 'Today Sales',
      sales: formatToCurrency(todaySales.value),
      icon: 'attach_money',
      color: 'green-6',
    },
    {
      title: 'This Week Sales',
      sales: formatToCurrency(thisWeekSales.value),
      icon: 'weekend',
      color: 'blue-6',
    },
    {
      title: 'This Month Sales',
      sales: formatToCurrency(thisMonthSales.value),
      icon: 'calendar_today',
      color: 'orange-6',
    },
    {
      title: 'This Year Sales',
      sales: formatToCurrency(thisYearSales.value),
      icon: 'event',
      color: 'red-6',
    },
  ];
});

// Fetch data on mounted
onMounted(() => {
  handleGetData();
  createChart;
});
const chartInstance = ref<Chart | null>(null); // Reference for the chart instance

// Watch for changes in sales values and update salesData accordingly
watch([todaySales, thisWeekSales, thisMonthSales, thisYearSales], () => {
  salesData.value = [
    {
      title: 'Today Sales',
      sales: formatToCurrency(todaySales.value),
      icon: 'attach_money',
      color: 'green-6',
    },
    {
      title: 'This Week Sales',
      sales: formatToCurrency(thisWeekSales.value),
      icon: 'weekend',
      color: 'blue-6',
    },
    {
      title: 'This Month Sales',
      sales: formatToCurrency(thisMonthSales.value),
      icon: 'calendar_today',
      color: 'orange-6',
    },
    {
      title: 'This Year Sales',
      sales: formatToCurrency(thisYearSales.value),
      icon: 'event',
      color: 'red-6',
    },
  ];

  // Update chart data
  chartData.value = [
    todaySales.value,
    thisWeekSales.value,
    thisMonthSales.value,
    thisYearSales.value,
  ];

  // Destroy previous chart instance if it exists
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  // Create a new chart instance
  chartInstance.value = createChart();
});

// Create chart function
const createChart = (): Chart => {
  const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    return new Chart(ctx, {
      type: 'bar', // You can change the type to 'line', 'pie', etc.
      data: {
        labels: ['Today', 'This Week', 'This Month', 'This Year'],
        datasets: [
          {
            label: 'Sales',
            data: chartData.value,
            backgroundColor: ['green', 'blue', 'orange', 'red'],
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
</script>

<style>
.chart-container {
  position: relative;
  width: 100%; /* Full width */
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  /* Use a different aspect ratio as needed */
}

.chart-container canvas {
  position: absolute; /* Position the canvas inside the container */
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
}

.first-grid-view {
  display: flex;
  flex-wrap: wrap; /* Allows cards to wrap to the next line */
  justify-content: space-between; /* Aligns items with space between */
}

.second-grid-view {
  display: block;
  margin-top: 2%;
}

.sales-card {
  min-height: 150px; /* Maintain consistency */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
}

.q-col {
  padding: 8px; /* Add padding to create margin effect */
}
</style>
