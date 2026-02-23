import { create } from "zustand";
import api from "@/services/api";

const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  total: 0,
  page: 0,
  limit: 12,
  search: "",
  category: "",
  loading: false,
    // Caching prevents repeated API calls for the same page/search/category,
  // improving performance and user experience by serving data from memory.

  cache: {},

  fetchCategories: async () => {
    try {
      const res = await api.get("/products/categories");
      set({ categories: res.data });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  fetchProducts: async (page = 0, search = "", category = "") => {
    const { limit, cache } = get();
    const skip = page * limit;
    const cacheKey = `${page}-${search}-${category}`;

    if (cache[cacheKey]) {
      set({
        products: cache[cacheKey].products,
        total: cache[cacheKey].total,
        page,
        search,
        category
      });
      return;
    }

    set({ loading: true });

    try {
      let response;

      if (search) {
        response = await api.get(
          `/products/search?q=${search}&limit=${limit}&skip=${skip}`
        );
      } else if (category) {
        response = await api.get(
          `/products/category/${category}?limit=${limit}&skip=${skip}`
        );
      } else {
        response = await api.get(`/products?limit=${limit}&skip=${skip}`);
      }

      const data = response.data;

      set((state) => ({
        products: data.products,
        total: data.total,
        page,
        search,
        category,
        loading: false,
        cache: {
          ...state.cache,
          [cacheKey]: {
            products: data.products,
            total: data.total
          }
        }
      }));

    } catch (error) {
      console.error("Error fetching products:", error);
      set({ loading: false });
    }
  }
}));

export default useProductStore;