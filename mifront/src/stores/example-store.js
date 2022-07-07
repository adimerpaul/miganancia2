import { defineStore } from 'pinia';

export const globalStore = defineStore('global', {
  state: () => ({
    counter: 0,
    user:{},
    permisos:[],
    negocio:{},
    productosVenta:[],
    isLoggedIn:!!localStorage.getItem('tokenmi'),
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
