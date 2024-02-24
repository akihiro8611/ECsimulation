
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartItems: [], // カート内の商品情報を格納する配列
    counters: {},
  }),
  actions: {
    // カートに商品を追加
    addToCart(product) {
      this.cartItems.push(product);
    },
    // カートから商品を削除
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.product_id !== productId);
    },
    // カート内の商品を取得
    getCartItems() {
      return this.cartItems;
    },
    // カートをクリア
    clearCart() {
      this.cartItems = [];
    },
    getCounter(productId) {
      if (!this.counters[productId]) {
        this.counters[productId] = 0;
      }
      return this.counters[productId];
    },
  },
});
export default  useCartStore;