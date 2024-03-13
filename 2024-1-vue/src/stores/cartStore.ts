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
    addToCart({ productId, product }) {
      const quantity = this.getCounter(productId);
      if (quantity > 0) {
        const cartItem = this.cartItems.find(item => item.product.product_id === productId);
        if (cartItem) {
          cartItem.quantity += quantity;
        } else {
          // カート内の商品リストに新しい商品を追加
          this.cartItems.push({ product, quantity });
        }
      }
    },
    
    // 商品の数量を増やすアクション
    incrementCounter(productId) {
      const cartItem = this.cartItems.find(item => item.product.productId === productId);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        // カートに該当商品がない場合、新しい商品を追加
        this.cartItems.push({ product: { productId }, quantity: 1 });
      }
    },

    // 商品の数量を減らすアクション
    decrementCounter(productId) {
      const cartItem = this.cartItems.find(item => item.product.productId === productId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        // カート内の数量が1以下の場合、商品を削除
        this.cartItems = this.cartItems.filter(item => item.product.productId !== productId);
      }
    },

    // 特定の商品の数量を取得するアクション
    getCounter(productId) {
      const cartItem = this.cartItems.find(item => item.product.productId === productId);
      return cartItem ? cartItem.quantity : 0;
    },

    // 特定の商品をカートから削除するアクション
    removeItem(productId) {
      this.cartItems = this.cartItems.filter(item => item.product.productId !== productId);
    },
  },
});

// useCartStoreをデフォルトエクスポート
export default useCartStore;
