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
        const cartItem = this.cartItems.find(item => item.product_id === productId);
        if (cartItem !== -1) {
          const productName = cartItem.product_name;
          this.cartItems.splice(cartItem, 1);
          alert(productName +"がカートから削除されました。");
        }
      }
    },

    resetCounter(productId) {
      const cartItem = this.cartItems.find(item => item.product_id === productId);
      const cartCount = this.cartItems.find(item => item.product_id === productId + '_count');
      // カウント数を0にする
      if (cartItem && cartCount) {
        cartItem.quantity = 0;
        cartCount.quantity = 0;
      }

      // 商品をカートから削除し、アラートを表示
      if (cartItem) {
        const index = this.cartItems.indexOf(cartItem);
        if (index !== -1) {
          const productName = cartItem.product_name;
          this.cartItems.splice(index, 1);
          alert(productName +"がカートから削除されました。");
        }
      }
    },
    // 特定の商品の数量を取得するアクション
    getCounter(productId) {
      const cartCount = this.cartCounts.find(item => item.product_id === productId);
      const cartItem = this.cartItems.find(item => item.product_id === productId);
      return cartCount ? cartCount.quantity : (cartItem ? cartItem.quantity : 0);
    },
  },
});

// useCartStoreをデフォルトエクスポート
export default useCartStore;
