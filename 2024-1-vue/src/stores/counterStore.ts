// counterStore.ts

import { defineStore } from 'pinia';

export const useItemCountStore = defineStore('counterStore', {
  state: () => ({
    counters: {},
  }),
  actions: {
      getCounter(productId) {
        const counterValue = this.counters[productId] || 0;
        console.log(`Getting counter for productId ${productId}: ${counterValue}`); // デバッグログを追加
        return counterValue;
      },
    increment(productId) {
      if (!this.counters[productId]) {
        this.counters[productId] = 1;
      } else {
        this.counters[productId]++;
      }
    },
    decrement(productId) {
      if (this.counters[productId] && this.counters[productId] > 0) {
        this.counters[productId]--;
      }
    },
    reset(productId) {
      this.counters[productId] = 0;
    },
  },
});
