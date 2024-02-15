import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItems: [],
  },
  mutations: {
    addToCart(state, cartItem) {
      const existingItem = state.cartItems.find(item => item.product_id === cartItem.product_id);

      if (existingItem) {
        const newCount = existingItem.count + cartItem.count;

        if (newCount <= existingItem.stock) {
          existingItem.count = newCount;
        } else {
          console.warn('カート内の商品の数量が在庫を超えました。在庫数:', existingItem.stock);
        }
      } else {
        state.cartItems.push(cartItem);
      }
    },
  },
});
