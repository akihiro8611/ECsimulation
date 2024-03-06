// PiniaからdefineStoreをインポート
import { defineStore } from 'pinia';

// cartStoreという名前のストアを定義
export const useCartStore = defineStore('cartStore', {
  // 状態を定義
  state: () => ({
    // カート内の商品情報を格納する配列
    cartItems: [],
    // 商品ごとの数量を管理するcountersオブジェクト
    counters: {},
  }),

  // アクションを定義
  actions: {
    // カートに商品を追加するアクション
    addToCart({ productId, quantity, product }) {
      // 商品情報をオブジェクトとして作成
      const newCartItem = {
        productId,
        quantity,
        product,
      };

      // カート内の商品リストに新しい商品を追加
      this.cartItems.push(newCartItem);
    },

    // カートから商品を削除するアクション
    removeFromCart(productId) {
      // カート内の商品リストから指定された商品IDの商品を削除
      this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    },

    // カート内の商品を取得するアクション
    getCartItems() {
      // カート内の商品リストを返す
      return this.cartItems;
    },

    // カートをクリアするアクション
    clearCart() {
      // カート内の商品リストを空にする
      this.cartItems = [];
    },

    // 特定の商品の数量を取得するアクション
    getCounter(productId) {
      // 商品ごとの数量が存在しない場合は0で初期化し、それを返す
      if (!this.counters[productId]) {
        this.counters[productId] = 0;
      }
      return this.counters[productId];
    },

    // 特定の商品の数量を更新するアクション
    updateQuantity({ productId, quantity }) {
      // 商品ごとの数量を指定された数量に更新
      this.counters[productId] = quantity;
    },
  },
});

// useCartStoreをデフォルトエクスポート
export default useCartStore;
