import { create } from "zustand";
import api from "@/services/api";

/*
 * Manages:
 -Users list
 - Pagination
 - Search
 - Client-side caching
 */

const useUserStore = create((set, get) => ({
  users: [],
  total: 0,
  page: 0,
  limit: 10,
  loading: false,
  search: "",
  cache: {},

  fetchUsers: async (page = 0, search = "") => {
    const { limit, cache } = get();
    const skip = page * limit;
    const cacheKey = `${page}-${search}`;

    if (cache[cacheKey]) {
      set({
        users: cache[cacheKey].users,
        total: cache[cacheKey].total,
        page,
        search
      });
      return;
    }

    set({ loading: true });

    try {
      let response;

      if (search) {
        response = await api.get(
          `/users/search?q=${search}&limit=${limit}&skip=${skip}`
        );
      } else {
        response = await api.get(`/users?limit=${limit}&skip=${skip}`);
      }

      const data = response.data;

      set((state) => ({
        users: data.users,
        total: data.total,
        page,
        search,
        loading: false,
        cache: {
          ...state.cache,
          [cacheKey]: {
            users: data.users,
            total: data.total
          }
        }
      }));

    } catch (error) {
      console.error("Error fetching users:", error);
      set({ loading: false });
    }
  }
}));

export default useUserStore;