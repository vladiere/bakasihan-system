<template>
  <q-page padding>
    <div class="flex justify-end" style="margin-bottom: 3%">
      <q-btn label="Generate Report" icon="report" color="primary" />
    </div>
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
import { onMounted, ref, watch, nextTick } from 'vue';
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import { useDashboardStore } from '../stores/dashboardData';

const dashboardStore = useDashboardStore();
Chart.register(...registerables);
const chartData = ref<Array<number>>([]);
const chartInstance = ref<Chart | null>(null);

// Watch for changes in sales values and update chart data accordingly
watch(() => dashboardStore.salesData, async (newSalesData) => {
  // Assuming you want to update the chart with new sales data here
  chartData.value = newSalesData.map(item => {
  const salesValue = item.sales.replace(/[^0-9.-]+/g, ""); // Remove any non-numeric characters
  return parseFloat(salesValue); // Use parseFloat for decimal values
});


  if (chartInstance.value) {
    chartInstance.value.destroy();
    chartInstance.value = null;
  }

  await nextTick();
  const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
const mylabel = ['Today', 'This Week', 'This Month', 'This Year', 'New Orders']
const mybackground = ['green', 'blue', 'orange', 'red', 'yellow']
  createChart(mybackground,chartData.value,mylabel,canvas,'bar' as keyof ChartTypeRegistry);
});




// Create chart function
const createChart = (background: Array<string|null>,data: Array<number | null>,labels: Array<string | null>,canvas: HTMLCanvasElement,bar_type: keyof ChartTypeRegistry) => {
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const validBackground = background.filter((color): color is string => color !== null);
    return new Chart(ctx, {
      type: bar_type, // You can change the type to 'line', 'pie', etc.
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Sales',
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
onMounted(() => {
  dashboardStore.fetchData(); // Call the fetchData method from the store if needed
});
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



.second-grid-view {
  display: block;
  margin-top: 2%;
  height: 40dvh;
}

@media screen and (max-width: 765px) {
  .sales-card {
  min-height: 150px; /* Maintain consistency */
  display: flex;
  flex-direction:wrap;
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
