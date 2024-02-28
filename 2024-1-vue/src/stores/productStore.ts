import { defineStore } from 'pinia';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const apiUrl = 'https://script.google.com/macros/s/AKfycbx3_yRnBtesy2zY0FzYBfRQkY5B2WG-JzaZDK4rIHwwUMkcOm3Lh4SlpQoOZVQ0JQek/exec';
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 商品情報に quantity プロパティを追加
        this.products = data.map(product => ({ ...product, quantity: 0 }));

        console.log('情報が取得できました', this.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        console.log('情報が取得できませんでした');
      }
    },
  },
});
