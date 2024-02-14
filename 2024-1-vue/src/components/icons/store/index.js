import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItems: [], // カートのアイテムを保持する配列
  },
  mutations: {
    addToCart(state, cartItem) {
      state.cartItems.push(cartItem);
    },
  },
});