<template>
  <div class="SP-header-contener">
    <div class="SP-header-wrapper">
      <div class="SP-header-logo">
        <RouterLink to="/top">
          <img src="../assets/LOGO TITLESP.png" alt="" class="SP-logo-fot">
        </RouterLink>
      </div>
      <div class="SP-header-menubar">
        <div class="SP-header-menu-wrapper">
          <button @click="toggleMenu" class="SP-menu-btn">
            <div class="SP-fa-bars">
              <span class="SP-hamburger-bar"></span>
              <span class="SP-hamburger-bar"></span>
              <span class="SP-hamburger-bar"></span>
            </div>
            <div class="SP-menu-text">
              <p>メニュー</p>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div v-show="isMenuVisible" class="SP-header-inner-menu">
      <div class="SP-inner-link-wrapper">
        <div class="SP-inner-link-contents">
          <div class="SP-inner-menu-box">
            <a href="https://www.google.com/" class="SP-mypage-link">
              <div class="SP-menu-box-icon">
                <img src="../assets/userW.png" alt="">
                <p class="SP-menu-box-text">マイページ</p>
              </div>
            </a>
          </div>
          <button class="SP-inner-menu-box">
            <RouterLink to="/cart">
              <div class="SP-menu-box-icon">
              <img src="../assets/CartICon.png" alt="">
              </div>
              <div class="SP-menu-box-text">
                <p>
                  カート
                </p>
              </div>
            </RouterLink>
          </button>
          <div class="SP-inner-menu-box">
            <div class="SP-menu-box-icon">
            <img src="../assets/material-symbols-light_star-outline.png" alt="">
          </div>
          <div class="SP-menu-box-text">
            <p>
              お気に入り
            </p>
          </div>
          </div>
          <div class="SP-inner-menu-box">
            <div class="SP-menu-box-icon">
              <img src="../assets/mail.png" alt="">
            </div>
            <div class="SP-menu-box-text">
              <p>
                お問い合わせ
              </p>
            </div>
          </div>
          <div class="SP-inner-menu-box">
            <div class="SP-menu-box-icon">
              <img src="../assets/gift.png" alt="">
            </div>
            <div class="SP-menu-box-text">
              <p>
                購入履歴
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isMenuVisible: false,
    };
  },
  methods: {
    toggleMenu() {
      console.log('toggleMenu is called');
      this.isMenuVisible = !this.isMenuVisible;
    },
  },
};
</script>

<style>
.SP-header-wrapper {
  background-color: #fff;
  display: flex;
  color: #000;
  height: 80px;
  border-bottom: 1px solid #000;
  padding: 0 20px;
  position: fixed;
  width: 100%;
}
.SP-header-logo {
  border-right: none;
  margin: auto 0;
}
.SP-logo-fot {
  height: 80%;
  aspect-ratio: 75/80;
}
.SP-header-menubar {
  display: flex;
  margin: 0 0 0 auto;
}
.SP-header-mypage-wrapper {
  height: 72px;
}
.SP-menu-box-icon {
  display: flex;
  flex-direction: column;
}
.SP-header-menu-wrapper {
  margin: auto 0 auto 40px;
}
.SP-menu-btn {
  align-items: center;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  cursor: pointer;
}
.SP-hamburger-bar {
  background: #000;
  content: '';
  display: block;
  height: 2px;
  position: relative;
  transition: top 0.24s, transform 0.24s, opacity 0.24s;
  width: 30px;
  border-radius: 20px;
}
.SP-hamburger-bar:nth-child(1) {
  top: 0;
}
.SP-hamburger-bar:nth-child(2) {
  margin-top: 9px;
  transform: translateY(-50%);
}
.SP-hamburger-bar:nth-child(3) {
  margin-top: 9px;
  transform: translateY(-100%);
}
.SP-menu-text {
  margin-top: 8px;
}
.SP-header-inner-menu {
  background-color: #fff;
  padding-top: 20px;
  position: fixed;
  display: none;
  height: 100%;
  margin: 80px auto 0;
}
.SP-inner-link-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.SP-inner-link-contents {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  column-gap: 24px;
  row-gap: 36px;
  padding: 0;
  width: 100%;
  margin: 0 24px;
}
.SP-inner-menu-box {
  display: flex;
  width: 151px;
  height: 161px;
  padding: 14px 16px;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  opacity: 0.7;
  background: #000;
}
.SP-inner-link-contents .SP-inner-menu-box:last-child {
  justify-content: flex-start;
}
.SP-menu-box-text {
  color: #FCFCFC;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  margin-top: 20px;
}
.SP-menu-box-text:first-of-type {
  margin-top: 8px;
}
.SP-header-inner-menu {
  display: block;
}
</style>