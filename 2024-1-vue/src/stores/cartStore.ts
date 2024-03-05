// PiniaからdefineStoreをインポート
import { defineStore } from 'pinia';

// cartStoreという名前のストアを定義
export const useCartStore = defineStore('cartStore', {
  // 状態を定義
  state: () => ({
    // カート内の商品情報を格納する配列
    cartItems: [],
  }),

  // アクションを定義
  actions: {
    // カートに商品を追加するアクション
    addToCart({ productId, quantity, product }) {
      // 商品がカートに既に存在するかを確認
      const existingItemIndex = this.cartItems.findIndex(item => item.productId === productId);

      if (existingItemIndex !== -1) {
        // 既に存在する場合はその数量を加算
        this.cartItems[existingItemIndex].quantity += quantity;
      } else {
        // 新しい商品としてカートに追加
        const newCartItem = {
          productId,
          quantity,
          product,
        };
        this.cartItems.push(newCartItem);
      }
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

    // 商品の数量を更新するアクション
    updateQuantity({ productId, quantity }) {
      const itemIndex = this.cartItems.findIndex(item => item.productId === productId);

      if (itemIndex !== -1) {
        // 商品が存在する場合は数量を更新
        this.cartItems[itemIndex].quantity = quantity;
      }
    },
  },
});

// useCartStoreをデフォルトエクスポート
export default useCartStore;
