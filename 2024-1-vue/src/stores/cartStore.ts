import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartItems: [] 
  }),
  actions: {

    addToCart(product) {
      this.cartItems.push(product);
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.product_id !== productId);
    },
    getCartItems() {
      return this.cartItems;
    },
    clearCart() {
      this.cartItems = [];
    }
  },
});

export default useCartStore;