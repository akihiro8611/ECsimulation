<template>
  <main>
    <section class="top-banner-contenner">
      <div class="top-banner-wrapper">
        <img src="@/assets/banner.png" alt="" class="top-banner-fot">
      </div>
    </section>
    <section class="top-item-contenner">
      <h1 class="top-item-title">おすすめ一覧</h1>
      <div class="top-item-wrapper">
        <div v-for="item in getVisibleItems(filteredItems)" :key="item.product_id" class="top-item-box">
          <div class="item-photo-box">
            <img :src="item.image" alt="" class="item-photo">
          </div>
          <div class="item-text-box">
            <h2 class="item-title">{{ item.product_name }}</h2>
            <div class="item-explanation">{{ item.description }}</div>
            <div class="item-count-contents">
              <div class="item-count-box">
                <div class="item-count">
                  <button class="item-count-button" @click="decrementCount(item)">
                    <img src="../assets/uiw_minus-circle.png" alt="" class="item-count-icon">
                  </button>
                  {{ item.count }}
                  <button class="item-count-button" @click="incrementCount(item, item.stock)">
                    <img src="../assets/uiw_plus-circle.png" alt="" class="item-count-icon">
                  </button>
                </div>
                <div class="dust-box" @click="resetCount(item)">
                  <img src="../assets/Vector.png" alt="" class="item-count-icon">
                </div>
              </div>
              <div class="cart-in-box">
                <button class="top-cart-in-button" @click="addToCart(item)">
                  カートに入れる
                </button>
              </div>
            </div>
            <div class="item-price">{{ item.price }}円</div>
            <div class="item-product-id">{{ item.product_id }}</div>
          </div>
        </div>
      </div>
      <div class="top-item-link">
        <p class="item-link-text">商品一覧へ
          <span class="link-icon">
            <img src="../assets/item_open_icon.png" alt="open_item" class="open_item">
          </span>
        </p>
      </div>
    </section>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        count: 0,
        items: [],
        jsonData: [],
        selectedItems: [],
      };
    },
    computed: {
      filteredItems() {
        return this.items.filter(item => item.rating === 1);
      }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      getVisibleItems(items) {
        return window.innerWidth <= 767 ? items.slice(0, 4) : items.slice(0, 6);
      },
      async fetchData() {
        try {
          const response = await fetch(
            "https://script.googleusercontent.com/macros/echo?user_content_key=WaiweTq2KnNBmqm7cKJ_7SPdWUmgxN_-kZGe_5UlussBX-JCx_C9IzFGY9GuwmJJl9OPXqFkpKQXYiRgSPRIFp0RPrLZTSn4m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJJ-uy9LF1llO5V8O0GJMB-fbgUSLsAjue8kBn1TtI6jGOBSuYA_2iviMEcIIRJK2z_BeVlFJ-EIVdRXs3b0Qip2WjtX8aMj9Q&lib=MN5OXOFv1NWXotatnO5YsB6CCTsAkJxEL"
          );
          this.jsonData = await response.json();
          this.items = this.jsonData.map(item => ({ ...item, count: 0 }));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      },
      incrementCount(item, stock) {
        if (item.count < stock) {
          item.count++;
          console.log('Incremented count:', item.count);
        } else {
          console.warn('商品の在庫が不足しています。');
        }
      },
      decrementCount(item) {
        if (item.count > 0) {
          item.count--;
        }
      },
      resetCount(item) {
        item.count = 0;
      },
      async addToCart(item) {
        console.log('アイテムデータ:', item);
        console.log('アイテムの数量:', item.count);

        if (item && item.count > 0) {
          console.log('商品の数量が正常です。カートにアイテムを追加します。item:', item);
          const productDetails = await this.getProductDetails(item.product_id);

          const cartItem = {
            product_id: productDetails.product_id,
            product_name: productDetails.product_name,
            description: productDetails.description,
            price: productDetails.price,
            image: productDetails.image,
            stock: productDetails.stock,
            category_id: productDetails.category_id,
            rating: productDetails.rating,
            created_at: productDetails.created_at,
            updated_at: productDetails.updated_at,
            is_deleted: productDetails.is_deleted,
            deleted_at: productDetails.deleted_at,
            count: item.count,
            assignedData: this.getAssignedData(item),
            productDetails: productDetails,
          };
          this.$store.commit('addToCart', cartItem);
          
        } else {
          console.warn('商品の数量が0です。カートに追加されませんでした。', item);
        }
      },
      getAssignedData(item) {
        return item.product_name;
      },
      async getProductDetails(product_id) {
        try {
          const productDetails = this.jsonData.find(item => item.product_id === product_id);

          if (productDetails) {
            const formattedDetails = {
              product_id: productDetails.product_id,
              product_name: productDetails.product_name,
              description: productDetails.description,
              price: productDetails.price,
              image: productDetails.image,
              stock: productDetails.stock,
              category_id: productDetails.category_id,
              rating: productDetails.rating,
              created_at: productDetails.created_at,
              updated_at: productDetails.updated_at,
              is_deleted: productDetails.is_deleted,
              deleted_at: productDetails.deleted_at,
            };

            return formattedDetails;
          } else {
            console.warn('該当する商品が見つかりません。');
            return null;
          }
        } catch (error) {
          console.error('商品の詳細情報を取得中にエラーが発生しました:', error);
          return null;
        }
      },
    }
  }
</script>

<style lang="scss">
main {
  background: #fff;
  color: #333;
}
.top-banner-wrapper {
  width: 100%;
  padding-top: 72px;
}
.top-banner-fot {
  width: 100%;
  aspect-ratio: 1280/512;
}
.top-item-contenner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  align-self: stretch;
}
.top-item-title {
  display: flex;
  align-items: flex-start;
  align-self: stretch;
}
.top-item-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.top-item-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #D8D8D8;
  font-size: 16px;
}
.item-photo {
  width: 90%;
  aspect-ratio: 288/192;
  margin: 0 auto;
}
.item-text-box {
  padding: 20px 0px;
  flex-direction: column;
  align-items: flex-start;
}
.item-explanation {
  margin-top: 32px;
}
.item-count-contents {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}
.item-count-box {
  display: flex;
  width: 157px;
  padding: 4px 18px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #FFF;
}
.item-count {
  display: flex;
  gap: 20px;
  background: none;
  border: none;
}
.item-count-button {
  background: none;
  border: none;
  cursor: pointer;
}
.item-count-icon {
  width: auto;
}
.dust-box {
  width: auto;
  margin-left: 20px;
  cursor: pointer;
}
.top-cart-in-button {
  background-color: #d9d9d9;
  border-radius: 40px;
  border: 1px solid #000;
  padding: 0 16px;
  font-size: 12px;
  cursor: pointer;
}
.item-price {
  margin-top: 12px;
  text-align: right;
}
.item-product-id {
  display: none;
}
.top-item-link {
  color: #000;
  background-color: #CCCCCC;
  display:flex;
  font-size: 40px;
  padding: 8px 16px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  margin: 40px 24px 0 auto;
}
.item-link-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.link-icon {
  width: 60px;
  aspect-ratio: 60/60;
  margin-left: 32px;
}

@media screen and (min-width: 768px) {
  .top-item-contenner {
    padding: 32px 0px;
  }
  .top-item-title {
    padding: 0px 32px;
    font-size: 40px;
  }
  .top-item-wrapper {
    column-gap: 24px;
    row-gap: 36px;
    margin-top: 40px;
  }
  .top-item-box {
    padding: 16px;
    width: calc(75%/3);
    aspect-ratio: 320/492;
    margin-bottom: 20px;
  }
  .item-title {
    font-size: 20px;
  }
  .item-text-box {
    width: fit-content;
  }
  .item-count-contents {
    margin-top: 32px;
  }
  .item-count-box {
    width: 157px;
    padding: 4px 18px;
  }
  .item-count {
    gap: 20px;
  }
  .item-count-button {
    cursor: pointer;
  }
  .item-count-icon {
    width: auto;
  }
  .dust-box {
    margin-left: 20px;
  }
  .top-cart-in-button {
    height: 40px;
    padding: 0 16px;
    font-size: 12px;
  }
  .item-price {
    font-size: 20px;
  }
  .top-item-link {
    font-size: 40px;
    padding: 8px 16px;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    margin: 40px 24px 0 auto;
  }
  .item-link-text {
    width: 292px;
  }
  .link-icon {
    width: 60px;
    aspect-ratio: 60/60;
    margin-left: 32px;
  }
}
@media screen and (max-width: 767px) {
  .top-banner-wrapper {
    padding-top: 80px;
  }
  .top-item-contenner {
    padding: 16px 0px;
  }
  .top-item-title {
    padding: 0px 32px;
    font-size: 18px;
  }
  .top-item-wrapper {
    column-gap: 18px;
    row-gap: 20px;
    margin-top: 20px;
  }
  .top-item-box {
    padding: 8px;
    width: calc(80%/2);
    margin-bottom: 20px;
  }
  .item-title {
    font-size: 12px;
  }
  .item-text-box {
    width: fit-content;
  }
  .item-explanation {
    font-size: 8px;
    margin-top: 8px;
  }
  .item-count-contents {
    margin-top: 8px;
    gap: 8px;
  }
  .item-count-box {
    width: 119px;
    padding: 0 12px;
  }
  .item-count {
    gap: 12px;
  }
  .item-count-button {
    cursor: pointer;
  }
  .item-count-icon {
    width: 12px;
    height: 12px;
  }
  .dust-box {
    margin-left: 12px;
  }
  .top-cart-in-button {
    height: fit-content;
    padding: 0 12px;
    font-size: 12px;
  }
  .item-price {
    font-size: 16px;
  }
  .item-product-id {
    display: none;
  }
  .top-item-link {
    font-size: 18px;
    padding: 4px 8px;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    margin: 24px 20px 0 auto;
  }
  .item-link-text {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .link-icon {
    width: 36px;
    aspect-ratio: 36/36;
    margin-left: 16px;
  }
  .open_item {
    width: 36px;
    height: 36px;
  }
}
</style>
