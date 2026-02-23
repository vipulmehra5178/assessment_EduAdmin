import { create } from "zustand";

// used zustand because it is better for small applications , built in support for async 
const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (userData, accessToken) =>
    set({
      user: userData,
      token: accessToken,
      isAuthenticated: true
    }),

  setToken: (accessToken) =>
    set({
      token: accessToken,
      isAuthenticated: true
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false
    })
}));

export default useAuthStore;