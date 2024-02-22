<!-- <template>
  <div v-for="item in items" :key="item.product_id" class="top-item-box">
    <div class="item-photo-box">
      <img :src="item.image" alt="{{ item.product_name }}の写真" class="item-photo">
    </div>
    <div class="item-text-box">
      <h2 class="item-title">{{ item.product_name }}</h2>
      <div class="item-explanation">{{ item.description }}</div>
      <item-count></item-count>
      <div class="cart-in-box">
        <button class="top-cart-in-button" @click="addToCart(item)">
          カートに入れる
        </button>
      </div>
    </div>
    <div class="item-price">{{ item.price }}円</div>
    <div class="item-product-id">{{ item.product_id }}</div>
  </div>
</template>
<script>

import { defineStore } from 'pinia';
import ItemCount from './ItemCount.vue';
import { useStore } from './stores/cart.ts';

export default{
  components: {
    ItemCount,
  },
  setup() {
    const store = useStore();
  }
}
export const useDataStore = defineStore('dataStore', {
  state: () => ({
    data: null,
    items: [],
  }),
  getters: {
    data: ({ state }) => {
      const url = "https://script.googleusercontent.com/macros/echo?user_content_key=CQkgWUrZ2RI3fDMOn05LEccqcI2jTsDJwdnld5r3cyeKh4N0CwHMp3G7b43CRTPRM8TT_3giPATDR-mmaNmPoq1_maa5QGRPm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJJ-uy9LF1llO5V8O0GJMB-fbgUSLsAjue8kBn1TtI6jGOBSuYA_2iviMEcIIRJK2z_BeVlFJ-EIVdRXs3b0Qip2WjtX8aMj9Q&lib=MN5OXOFv1NWXotatnO5YsB6CCTsAkJxEL";

      return fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          state.data = data;
          return data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  actions: {
    addToCart(item) {
      const product_id = item.product_id;
      const product_name = item.product_name;
      const description = item.description;
      const price = item.price;
      const image = item.image;
      const stock = item.stock;
      const category_id = item.category_id;
      const rating = item.rating;

      const data = {
        product_id,
        product_name,
        description,
        price,
        image,
        stock,
        category_id,
        rating,
      };
      this.$store.dispatch('cart/addToCart', data);
    }
  }
});
</script> -->