import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { productsDataAllT } from 'src/components/models';
import { getProducts } from 'src/services/api.services';

export const useProductStore = defineStore('product', () => {
  const productsMenu = ref<Array<productsDataAllT>>([]);
  const loading = ref(false);
  const search = ref(''); // Removed explicit type annotation

  watch(search, () => {
    getUserProducts(search.value);
  });

  const getUserProducts = async (search:string) => {
    loading.value = true;
    await getProducts({ params: { searchTerm: search } })
      .then((response) => {
        if (response) {
          loading.value = false;
          productsMenu.value = response.data.products;
        }
      })
      .catch((err) => {
        loading.value = false;
        console.log(err);
      });
  };

  return { productsMenu, loading, getUserProducts, search };
});
