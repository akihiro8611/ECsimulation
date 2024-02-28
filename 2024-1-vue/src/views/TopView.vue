<template>
  <main>
    <section class="top-banner-contenner">
      <div class="top-banner-wrapper">
        <img src="@/assets/banner.png" alt="" class="top-banner-photo">
      </div>
    </section>
    <section class="top-item-contenner">
      <h1 class="top-item-title">おすすめ一覧</h1>
      <div class="top-item-wrapper">
        <div v-for="product in products" :key="product.product_id" class="top-item-box">
          <div class="item-photo-box">
            <img :src="product.image" :alt="`${product.product_name}の写真`" class="item-photo">
          </div>
          <div class="item-text-box">
            <h2 class="item-title">{{ product.product_name }}</h2>
            <div class="item-explanation">{{ product.description }}</div>
          </div>
          <div class="item-count-box">
            <ItemCount :productId="product.product_id" :price="product.price"/>
          </div>
          <div class="cart-in-box">
            <button class="top-cart-in-button" @click="addToCart(product.product_id)">
              カートに入れる
            </button>
          </div>
          <div class="item-price">{{ product.price }}円</div>
          <div class="item-product-id">{{ product.product_id }}</div>
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
import { ref, onMounted } from 'vue';
import ItemCount from '@/components/ItemCount.vue';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore.ts';

export default {
  components: {
    ItemCount,
  },
  setup() {
    const productStore = useProductStore();
    const cartStore = useCartStore();
    const products = ref([]);

    const fetchProducts = async () => {
      try {
        await productStore.fetchProducts();
        console.log('Fetched products');
        products.value = [...productStore.products];
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    onMounted(fetchProducts);

    const addToCart = async (productId) => {
      const selectedProduct = products.value.find(product => product.product_id === productId);
      console.log('Selected Product:', selectedProduct);

      if (!selectedProduct) {
        console.error('Product not found with productId:', productId);
        return;
      }

      try {
        const quantity = selectedProduct.quantity; 
        console.log('Quantity from CounterStore:', quantity);// 商品に quantity プロパティがあれば使用し、なければ 0 をデフォルトとする
        await cartStore.addToCart({ productId, quantity, product: selectedProduct });
        console.log('Added to cart:', selectedProduct);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    };

    return { products, addToCart };
  },
};
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
.top-banner-photo {
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
  background-color:#E9E9E7;
  object-fit: contain;
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

.item-count-box {
  display: flex;
  flex-direction: row;
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
