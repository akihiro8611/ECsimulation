// PiniaからdefineStoreをインポート
import { defineStore } from 'pinia';

// cartStoreという名前のストアを定義
export const useCartStore = defineStore('cartStore', {
  // 状態を定義
  state: () => ({
    // カート内の商品情報を格納する配列
    cartItems: [],
    cartCounts:[],
  }),

  // アクションを定義
  actions: {
    // カートに商品を追加するアクション
    addToCart({ productId, product }) {
      const cartItem = this.cartItems.find(item => item.product_id === productId);
      const cartCount = this.cartCounts.find(item => item.product_id === productId);
      if (cartItem) {
        cartItem.quantity += cartCount.quantity;
      } else {
        // カート内の商品リストに新しい商品を追加
        this.cartItems.push({ ...product, quantity: cartCount.quantity });      }
    },
    
    // 商品の数量を増やすアクション
    incrementCounter(productId) {
      const cartItem = this.cartItems.find(item => item.product_id === productId);
      const cartCount = this.cartCounts.find(item => item.product_id === productId);
      if (cartCount) {
        cartCount.quantity++;
        cartItem.quantity++;
      } else {
        // カートに該当商品がない場合、新しい商品を追加
        this.cartCounts.push({ product_id: productId, quantity: 1 });
      }
    },

    // 商品の数量を減らすアクション
    decrementCounter(productId) {
      const cartItem = this.cartItems.find(item => item.product_id === productId);
      const cartCount = this.cartCounts.find(item => item.product_id === productId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        cartCount.quantity--;
      } else {
        // カート内の数量が1以下の場合、商品を削除
        this.cartItems = this.cartItems.filter(item => item.product_id !== productId);
        this.cartCounts = this.cartCounts.filter(item => item.product_id !== productId);
      }
    },
    resetCounter(productId){
      const cartItem = this.cartItems.find(item => item.product_id === productId);
      const cartCount = this.cartCounts.find(item => item.product_id === productId);
      
      if (cartItem && cartCount) {
          cartItem.quantity = 0;
          cartCount.quantity = 0;
      }
    },

    // 特定の商品の数量を取得するアクション
    getCounter(productId) {
      const cartCount = this.cartCounts.find(item => item.product_id === productId);
      return cartCount ? cartCount.quantity : 0;
    },

    // 特定の商品をカートから削除するアクション
    removeItem(productId) {
      this.cartItems = this.cartItems.filter(item => item.product.productId !== productId);
    },
  },
});

// useCartStoreをデフォルトエクスポート
export default useCartStore;
