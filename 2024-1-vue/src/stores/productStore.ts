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
        // 取得したデータをJSON形式に変換
        const data = await response.json();

        // 取得したデータをマップし、各商品に数量情報を追加してproductsを更新
        this.products = data.map(product => ({
          ...product,
        }));

        // デバッグ用のログ
        console.log('情報が取得できました', this.products);
      } catch (error) {
        // エラーが発生した場合の処理
        console.error('商品の取得エラー:', error);
        console.log('情報が取得できませんでした');
      }
    },
  },
});