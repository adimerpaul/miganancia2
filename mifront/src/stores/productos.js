import { defineStore } from 'pinia';

export const useProductosStore = defineStore('productos', {
  state: () => ({
    productos:[],
    productos2:[],
    singleton:false,
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
