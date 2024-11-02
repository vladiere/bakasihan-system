import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { newOrdersDataT, TableRequestProps } from '../components/models';
import { adminNewOrdersUnpaid } from 'src/services/api.services';

export const useNewOrderStore = defineStore('newOrders', () => {
  const newOrders = ref<Array<newOrdersDataT | null>>([])
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()
  const currentDay = currentDate.getDate()
  const loading = ref(false);
  const search = ref('');
  const pagination = ref({
    page: 1,
    rowsPerPage: 5,
    sortBy: 'id',
    descending: false,
    rowsNumber: 0,
  });
  watch(search, () => {
    onSearch()
  });

  const onRequest = async (search:string,currentpage:number,limit:number) => {
    loading.value = true;
    await adminNewOrdersUnpaid({ params: { searchTerm: search,page:currentpage,per_page:limit,currentYear:currentYear,currentDay:currentDay,currentMonth:currentMonth } })
      .then((response) => {
        if (response) {
          loading.value = false;
          newOrders.value = response.data.newOrders;
          pagination.value.page = response.data.current_page;
          pagination.value.rowsNumber = response.data.total;
          pagination.value.rowsPerPage = response.data.per_page;
        }
      })
      .catch((err) => {
        loading.value = false;
        console.log(err);
      });
  };
  const handleRequest = (props: TableRequestProps) => {
    pagination.value.rowsPerPage = props.pagination.rowsPerPage;
    onRequest(search.value, props.pagination.page, props.pagination.rowsPerPage);
  };
  const onSearch = () => {
    pagination.value.page = 1; // Reset to the first page
    onRequest(search.value, pagination.value.page, pagination.value.rowsPerPage);
  };

  return { newOrders, loading, onRequest,onSearch, search,handleRequest,pagination };
})
