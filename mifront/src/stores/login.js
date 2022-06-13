import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
    user:{},
    negocio:{},
    negocios:[],
    dialogCreateCategoria:false,
    dialogCreateProducto:false,
    isLoggedIn:!!localStorage.getItem('tokenmi'),
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
