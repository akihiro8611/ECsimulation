<template>
  <main>
    <div class="cart-contener">
      <div class="cart-title-box">
        <h1 class="cart-title">カート 一覧</h1>
      </div>
      <section class="incart-item-contenner">
        <div class="incart-item-wrapper">
          <div v-for="(Incart_itemGroup, index) in Incart_itemGroups" :key="index" class="incart-item-row">
            <div v-for="(item, idx) in Incart_itemGroup" :key="idx" class="incart-item-box">
              <div class="incart-item-fot">
                <img :src="item.imgUrl" alt="">
              </div>
              <div class="incart-item-text-box">
                <div class="incart-item-title-box">
                  <h2 class="incart-item-title">{{ item.title }}</h2>
                  <div class="incart-item-favorite">
                    <img src="../assets/clarity_favorite-line.png" alt="">
                  </div>
                </div>
                <div class="incart-item-explanation">{{ item.description }}</div>
                <div class="incart-item-count-box">
                  <div class="incart-item-count">
                    <button class="incart-item-count-button">
                      <img src="../assets/uiw_minus-circle.png" alt="" class="incart-item-count-icon">
                    </button>
                    0
                    <button class="incart-item-count-button">
                      <img src="../assets/uiw_plus-circle.png" alt="">
                    </button>
                  </div>
                  <div class="incart-dust-box">
                    <img src="../assets/Vector.png" alt="" class="incart-item-count-icon">
                  </div>
                </div>
                <div class="incart-item-price">{{ item.price }}円</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="cart-after-contener">
        <div class="cart-total-box">
          <div class="cart-total-items">
            <div class="cart-items-count">購入点数</div>
            <div class="cart-item-unit">00<span>個</span></div>
          </div>
          <div class="caet-total-price">
            <div class="caet-price-count">合計</div>
            <div class="cart-item-unit">00000<span>個</span></div>
          </div>
        </div>
        <button class="cart-next-link-box">
          <RouterLink to="/customer">
            <div class="cart-next-link-text">
              <p>お客様情報の入力</p>
            </div>
          </RouterLink>
        </button>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { 
          title: "アウター商品A", 
          description: "アウター商品Aの説明テキスト", 
          price: "12000",
          imgUrl: "https://drive.google.com/uc?id=18YdbWdP7bawITaOy0kfbkHBrpl3zujCM/view?usp=drive_link"
        },
        { 
          title: "アウター商品B", 
          description: "アウター商品Bの説明テキスト", 
          price: "14000",
          imgUrl: "https://drive.google.com/uc?id=18YdbWdP7bawITaOy0kfbkHBrpl3zujCM/view?usp=drive_link"
        },
        { 
          title: "アウター商品C", 
          description: "アウター商品Cの説明テキスト", 
          price: "11000",
          imgUrl: "https://drive.google.com/uc?id=18YdbWdP7bawITaOy0kfbkHBrpl3zujCM/view?usp=drive_link"
        },
        { 
          title: "アウター商品D", 
          description: "アウター商品Dの説明テキスト", 
          price: "15000",
          imgUrl: "https://drive.google.com/uc?id=18YdbWdP7bawITaOy0kfbkHBrpl3zujCM/view?usp=drive_link"
        },
        { 
          title: "アウター商品E", 
          description: "アウター商品Eの説明テキスト", 
          price: "12000",
          imgUrl: "https://drive.google.com/uc?id=18YdbWdP7bawITaOy0kfbkHBrpl3zujCM/view?usp=drive_link"
        },
        { 
          title: "アウター商品F", 
          description: "アウター商品Fの説明テキスト", 
          price: "11000",
          imgUrl: "https://drive.google.com/uc?id=18YdbWdP7bawITaOy0kfbkHBrpl3zujCM/view?usp=drive_link"
        }
      ]
    };
  },
  computed: {
    Incart_itemGroups() {
      const groups = [];
      for (let i = 0; i < this.items.length; i += 3) {
        groups.push(this.items.slice(i, i + 3));
      }
      return groups;
    }
  }
}
</script>
<style>
.cart-contener {
  margin: 32px 40px;
}
.incart-item-contenner {
  display: flex;
  padding: 32px 0px;
  flex-direction: column;
}

.incart-item-title {
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  font-size: 40px;
}

.incart-item-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.incart-item-row {
  display: flex;
}

.incart-item-box {
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #D8D8D8;
  width: 320px;
  margin-bottom: 20px;
  font-size: 16px;
  margin-left: auto;
}
.incart-item-box:first-child {
  margin-left: 0;
}
.incart-item-fot {
  width: 288px;
  aspect-ratio: 288/192;
}

.incart-item-title-box {
  display: flex;
}

.incart-item-title {
  font-size: 20px;
}

.incart-item-favorite {
  margin: 0 0 0 auto;
}

.incart-item-text-box {
  padding: 20px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  width: 256px;
}

.incart-item-explanation {
  margin-top: 32px;
}

.incart-item-count-box {
  display: flex;
  width: 157px;
  padding: 4px 18px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #FFF;
  margin: 32px 0 0 auto;
}

.incart-item-count {
  display: flex;
  gap: 20px;
  background: none;
  border: none;
  cursor: pointer;
}

.incart-item-count-button {
  background: none;
  border: none;
}

.incart-item-count-icon {
  width: auto;
}

.incart-dust-box {
  width: auto;
  margin-left: 20px;
  cursor: pointer;
}

.incart-item-price {
  margin-top: 12px;
  text-align: right;
}

.incart-top-item-link {
  color: #000;
  background-color: #CCCCCC;
  display: flex;
  width: fit-content;
  font-size: 40px;
  padding: 8px 16px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  margin: 0 24px 0 auto;
}
.cart-after-contener {
  text-align: right;
}
.cart-total-box {
  width: 320px;
  margin: 0 0 0 auto;
}
.cart-total-items {
  display: flex;
  font-size: 32px;
}

.caet-total-price {
  display: flex;
  font-size: 36px;
  margin-top: 32px;
}
.cart-item-unit {
  margin: 0 0 0 auto;
}
.cart-next-link-box {
  background-color: #d9d9d9;
  border-radius: 40px;
  border: 5px solid #000;
  height: 96px;
  padding: 0 36px;
  font-size: 36px;
  margin-top: 20px;
}
</style>