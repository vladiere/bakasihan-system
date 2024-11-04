// src/stores/dashboardStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { adminGetAllDataDashBoardRequired, formatToCurrency } from '../services/api.services';

export const useDashboardStore = defineStore('dashboard', () => {
  const todaySales = ref(0);
  const thisWeekSales = ref(0);
  const thisMonthSales = ref(0);
  const thisYearSales = ref(0);
  const newOrdersData = ref(0);
  const salesData = ref<Array<{ title: string; sales: string; icon: string; color: string; status: number; path: string; }>>([]);
  const loading = ref(false);

  // Function to fetch data
  const fetchData = async () => {
    loading.value = true;
    try {
      const res = await adminGetAllDataDashBoardRequired();
      const { TodaySales, ThisWeekSales, ThisMonthSales, ThisYearSales, newOrderData } = res.data;

      todaySales.value = TodaySales;
      thisWeekSales.value = ThisWeekSales;
      thisMonthSales.value = ThisMonthSales;
      thisYearSales.value = ThisYearSales;
      newOrdersData.value = newOrderData;

      // Update salesData
      salesData.value = [
        {
          title: 'Today Sales',
          sales: formatToCurrency(todaySales.value),
          icon: 'attach_money',
          color: 'green-6',
          status: 1,
          path: "",
        },
        {
          title: 'This Week Sales',
          sales: formatToCurrency(thisWeekSales.value),
          icon: 'weekend',
          color: 'blue-6',
          status: 1,
          path: "",
        },
        {
          title: 'This Month Sales',
          sales: formatToCurrency(thisMonthSales.value),
          icon: 'calendar_today',
          color: 'orange-6',
          status: 1,
          path: "",
        },
        {
          title: 'This Year Sales',
          sales: formatToCurrency(thisYearSales.value),
          icon: 'event',
          color: 'red-6',
          status: 1,
          path: "",
        },
        {
          title: 'New Orders Arrived',
          sales: String(newOrdersData.value),
          icon: 'event',
          color: 'red-6',
          status: 2,
          path: "/admin/adminNewOrders",
        },
      ];
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loading.value = false;
    }
  };

  // Fetch data on store initialization
  fetchData();

  return {
    todaySales,
    thisWeekSales,
    thisMonthSales,
    thisYearSales,
    newOrdersData,
    salesData,
    loading,
    fetchData,
  };
});
