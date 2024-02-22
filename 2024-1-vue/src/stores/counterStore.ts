import { defineStore } from 'pinia';

export const useItemCountStore = defineStore('itemCountStore', {
  state: () => ({
    counters: {},
  }),
  actions: {
    initializeCounter(product_id) {
      if (!this.counters[product_id]) {
        this.counters[product_id] = 0;
      }
    },
    increment(product_id) {
      this.initializeCounter(product_id);
      this.counters[product_id]++;
      
    },
    decrement(product_id) {
      this.initializeCounter(product_id);
      this.counters[product_id]--;
    },
    reset(product_id) {
      this.initializeCounter(product_id);
      this.counters[product_id] = 0;
    },
    getCounter(product_id) {
      this.initializeCounter(product_id);
      return this.counters[product_id];
    }
  },
});

export default useItemCountStore;