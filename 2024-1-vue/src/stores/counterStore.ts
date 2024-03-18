// // PiniaからdefineStoreをインポート
// import { defineStore } from 'pinia';

// // counterStoreという名前のストアを定義
// export const useItemCountStore = defineStore('counterStore', {
//   // 状態を定義
//   state: () => ({
//     // 商品ごとの数量を管理するcountersオブジェクト
//     counters: {},
//   }),

//   // アクションを定義
//   actions: {
//     // 特定の商品の数量を取得するアクション
//     getCounter(productId) {
//       // 商品ごとの数量を取得し、存在しなければ0を返す
//       const counterValue = this.counters[productId] || 0;
//       return counterValue;
//     },

//     // 特定の商品の数量を1増やすアクション
//     increment(productId) {
//       // 商品ごとの数量が存在しない場合は1で初期化し、存在する場合は1増やす
//       if (!this.counters[productId]) {
//         this.counters[productId] = 1;
//       } else {
//         this.counters[productId]++;
//       }
//     },

//     // 特定の商品の数量を1減らすアクション
//     decrement(productId) {
//       // 商品ごとの数量が存在し、かつ0より大きい場合は1減らす
//       if (this.counters[productId] && this.counters[productId] > 0) {
//         this.counters[productId]--;
//       }
//     },

//     // 特定の商品の数量をリセットするアクション
//     reset(productId) {
//       // 商品ごとの数量を0にリセット
//       this.counters[productId] = 0;
//     },
//   },
// });
