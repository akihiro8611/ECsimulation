import { defineStore } from 'pinia';

export const useItemCountStore = defineStore('itemCountStore', {
  // ストアの初期状態を定義
  state: () => ({
    counters: {}, // 各商品のカウンターを保持するオブジェクト
  }),
  // ストアのアクション（メソッド）を定義
  actions: {
    // カウンターを初期化するメソッド
    initializeCounter(product_id) {
      // カウンターがまだ存在しない場合、0で初期化
      if (!this.counters[product_id]) {
        this.counters[product_id] = 0;
      }
    },
    // カウンターを増やすメソッド
    increment(product_id) {
      // カウンターを初期化してから増加
      this.initializeCounter(product_id);
      this.counters[product_id]++;
    },
    // カウンターを減らすメソッド
    decrement(product_id) {
      // カウンターを初期化してから減少
      this.initializeCounter(product_id);
      this.counters[product_id]--;
    },
    // カウンターをリセットするメソッド
    reset(product_id) {
      // カウンターを初期化してからリセット
      this.initializeCounter(product_id);
      this.counters[product_id] = 0;
    },
    // カウンターの値を取得するメソッド
    getCounter(product_id) {
      // カウンターを初期化してから値を取得
      this.initializeCounter(product_id);
      return this.counters[product_id];
    }
  },
});

export default useItemCountStore;