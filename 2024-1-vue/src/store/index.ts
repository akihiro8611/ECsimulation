import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItems: [], // あなたのカートアイテムの状態など
  },
  mutations: {
    // ここに addToCart ミューテーションなどを追加
    addToCart(state, cartItem) {
      state.cartItems.push(cartItem);
    },
  },
});