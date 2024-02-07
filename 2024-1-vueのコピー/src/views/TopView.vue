<template>
  <main>
    <section class="top-banner-contenner">
      <div class="top-banner-wrapper">
        <img src="../assets/banner.png" alt="" class="top-banner-fot">
        <div class=""></div>
      </div>
    </section>
    <section class="top-item-contenner">
      <h1 class="top-item-title">おすすめ一覧</h1>
      <div class="top-item-wrapper">
        <div v-for="(itemGroup, index) in itemGroups" :key="index" class="top-item-row">
          <div v-for="(item, idx) in itemGroup" :key="idx" class="top-item-box">
            <div class="item-fot">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="item-text-box">
              <div class="item-title-box">
                <h2 class="item-title">{{ item.title }}</h2>
                <div class="item-favorite">
                  <img src="../assets/clarity_favorite-line.png" alt="">
                </div>
              </div>
              <div class="item-explanation">{{ item.description }}</div>
              <div class="item-count-box">
                <div class="item-count">
                  <button class="item-count-button">
                    <img src="../assets/uiw_minus-circle.png" alt="" class="item-count-icon">
                  </button>
                  0
                  <button class="item-count-button">
                    <img src="../assets/uiw_plus-circle.png" alt="">
                  </button>
                </div>
                <div class="dust-box">
                  <img src="../assets/Vector.png" alt="" class="item-count-icon">
                </div>
              </div>
              <div class="item-price">{{ item.price }}円</div>
            </div>
          </div>
        </div>
      </div>
      <div class="top-item-link">
        <p class="item-link-text">商品一覧へ
          <span class="link-icon">
            <img src="../assets/item_open_icon.png" alt="open_item">
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
    itemGroups() {
      const groups = [];
      for (let i = 0; i < this.items.length; i += 3) {
        groups.push(this.items.slice(i, i + 3));
      }
      return groups;
    }
  }
};
</script>
<style lang="scss">
main {
  background: #fff;
  color: #333;
}
.top-item-contenner {
  display: flex;
  padding: 32px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  align-self: stretch;
}
.top-item-title {
  display: flex;
  padding: 0px 32px;
  align-items: flex-start;
  align-self: stretch;
  font-size: 40px;
}
.top-item-wrapper {
  display: flex;
  flex-direction: column;
}
.top-item-row {
  display: flex;
  gap: 24px;
}
.top-item-box {
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
}
.item-fot {
  width: 288px;
  aspect-ratio: 288/192;
}
.item-title-box {
  display: flex;
}
.item-title {
  font-size: 20px;
}
.item-favorite {
  margin: 0 0 0 auto ;
}
.item-text-box {
  padding: 20px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  width: 256px;
}
.item-explanation {
  margin-top: 32px;
}
.item-count-box {
  display: flex;
  width: 157px;
  padding: 4px 18px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #FFF;
  margin:32px 0 0 auto ;
}
.item-count {
  display: flex;
  gap: 20px;
  background: none;
  border: none;
  cursor: pointer;
}
.item-count-button {
  background: none;
  border: none;
}
.item-count-icon {
  width: auto;

}
.dust-box {
  width: auto;
  margin-left: 20px;
  cursor: pointer;
}
.item-price {
  margin-top: 12px;
  text-align: right;
}
.top-item-link {
  color: #000;
  background-color: #CCCCCC;
  display:flex;
  width: fit-content;
  font-size: 40px;
  padding: 8px 16px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  margin: 0 24px 0 auto;
}
.item-link-text {
  width: 292px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.link-icon {
  width: 60px;
  aspect-ratio: 60/60;
  margin-left: 32px;
}
</style>