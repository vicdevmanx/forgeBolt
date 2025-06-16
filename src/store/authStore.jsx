import { create } from "zustand";
import Cookies from "js-cookie";
import API from "@/components/functional/axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: Cookies.get("token") || null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    Cookies.set("token", token);
    set({ token });
  },
  logout: () => {
    Cookies.remove("token");
    set({ user: null, token: null });
  },
  disableAll: false,
  setDisableAll: (value) => set({ disableAll: value }),
  loginModalOpen: false,
  openLoginModal: () => set({ loginModalOpen: true }),
  closeLoginModal: () => set({ loginModalOpen: false }),
  signupModalOpen: false,
  openSignupModal: () => set({ signupModalOpen: true }),
  closeSignupModal: () => set({ signupModalOpen: false }),
  fetchUser: async () => {
    try {
      const res = await API.get('/auth/profile')
      set({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  },
  products: null,
  totalPages: 1,
  currentPage: 1,
  totalPosts: 0,
  setCurrentPage: (currentPage) => set({ currentPage }),
  setTotalPages: (totalPages) => set({ totalPages }),
  fetchProducts: async () => {
    try {
      set((state) => {
        API.get(`/products?page=${state.currentPage}`)
          .then(res => {
            set({ products: res.data.items, totalPages: res.data.totalPages });
            set({ totalPosts: res.data.total })
          })
          .catch(err => {
            console.log(err);
          });
        return {};
      });
    }
    catch (err) {
      console.log(err)
    }
  },
  productDetails: null,
  fetchProductDetails: async (id) => {
    try {
      const res = await API.get(`/products/${id}`)
      set({ productDetails: res.data })
    } catch (err) {
      console.log(err)
    }
  },
  addToCart: async (id, quantity = 1) => {
    try {
      const res = await API.post('/cart', {
        productId: id,
        quantity: quantity
      })
    } catch (error) {
      console.log(error)
    }
  },
  cart: null,
  total: 0,
  setTotal: (total) => set({ total }),
  getCart: async () => {
    try {
      const res = await API.get('/cart')
      set({ cart: res.data.items })
    } catch (e) {
      console.log(e)
    }
  },
  freshMail: null,
  setFreshMail: (freshMail) => set({ freshMail }),
  allUsers: null,
  getAllUsers: async () => {
    try {
      const res = await API.get('/admin/users')
      console.log(res.data)
      set({ allUsers: res.data })
    } catch (e) {
      console.log(e)
    }
  },
  myOrders: null,
  fetchMyOrders: async () => {
    try {
      const res = await API.get('/orders')
      console.log(res.data)
      set({ myOrders: res.data })
    } catch (e) {
      console.log(e)
    }
  },
  allOrders: null,
  fetchOrders: async () => {
    try {
      const res = await API.get('/admin/orders')
      console.log(res.data)
      set({ allOrders: res.data })
    } catch (e) {
      console.log(e)
    }
  }

}));