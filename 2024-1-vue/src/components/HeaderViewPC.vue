// HeaderViewPC.vue
<template>
  <main>
    <div class="header-contener">
      <div class="header-logo">
        <RouterLink to="/top">
          <img src="../assets/logo_title.png" alt="" class="logo-fot">
        </RouterLink>
      </div>
      <div class="header-menubar">
        <div class="header-mypage-wrapper">
          <a href="https://www.google.com/" class="mypage-link">
            <div class="mypage-box">
              <img src="../assets/user.png" alt="" class="mypage-icon">
              <p class="mypage-text">マイページ</p>
            </div>
          </a>
        </div>
        <div class="header-menu-wrapper">
          <button @click="toggleMenu" class="menu-btn">
            <div class="fa-bars">
              <span class="hamburger-bar"></span>
              <span class="hamburger-bar"></span>
              <span class="hamburger-bar"></span>
            </div>
            <div class="menu-text">
              <p>メニュー</p>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div v-show="isMenuVisible" class="header-inner-menu">
      <button @click="closeMenu" class="inner-close"></button>
      <div class="inner-link-contents">
        <button class="inner-menu-box">
          <RouterLink to="/cart">
            <div class="menu-box-icon">
              <img src="../assets/CartICon.png" alt="">
            </div>
            <div class="menu-box-text">
              <p>カート</p>
            </div>
          </RouterLink>
        </button>
        <div class="inner-menu-box">
          <div class="menu-box-icon">
            <img src="../assets/material-symbols-light_star-outline.png" alt="">
          </div>
          <div class="menu-box-text">
            <p>お気に入り</p>
          </div>
        </div>
        <div class="inner-menu-box">
          <div class="menu-box-icon">
            <img src="../assets/mail.png" alt="">
          </div>
          <div class="menu-box-text">
            <p>お問い合わせ</p>
          </div>
        </div>
        <div class="inner-menu-box">
          <div class="menu-box-icon">
            <img src="../assets/gift.png" alt="">
          </div>
          <div class="menu-box-text">
            <p>購入履歴</p>
          </div>
        </div>
      </div>
    </div>
  </main>
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
    closeMenu() {
      this.isMenuVisible = false;
    },
  },
};
</script>

<style>
.header-contener {
  background-color: #fff;
  display: flex;
  width: 100%;
  color: #000;
  height: 72px;
  border-bottom: 1px solid #000;
  position: fixed;
}
.header-logo {
  border-right: 1px solid #000;
}
.logo-fot {
  height: 98%;
}
.header-menubar {
  display: flex;
  margin: 0 56px 0 auto;
}

.header-mypage-wrapper {
  height: 72px;
}
.mypage-icon {
  height: 98%;
}
.mypage-text {
  height: 18px;
  margin-top: 8px;
}
.header-menu-wrapper {
  margin: auto 0 auto 40px;
}
.menu-btn {
  align-items: center;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  cursor: pointer;
}
.hamburger-bar {
  background: #000;
  content: '';
  display: block;
  height: 2px;
  position: relative;
  transition: top 0.24s, transform 0.24s, opacity 0.24s;
  width: 30px;
  border-radius: 20px;
}
.hamburger-bar:nth-child(1) {
  top: 0;
}
.hamburger-bar:nth-child(2) {
  margin-top: 9px;
  transform: translateY(-50%);
}

.hamburger-bar:nth-child(3) {
  margin-top: 9px;
  transform: translateY(-100%);
}

.menu-text {
  margin-top: 8px;
}
.header-inner-menu {
  padding-top: 103px;
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-top: 72px;
  display: block;
}
.inner-close {
  background-color: transparent;
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 42px;
  height: 42px;
  top: 20px;
  right: 56px;
  cursor: pointer;
}

.inner-close::before,
.inner-close::after {
  background-color: #333;
  content: '';
  height: 2px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 42px;
}

.inner-close::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.inner-close::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
.inner-link-contents {
  display: flex;
  width: 100%;
  padding: 0px 56px 40px 0px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 40px;
}
.inner-menu-box {
  display: flex;
  width: 145px;
  height: 161px;
  padding: 14px 16px;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  opacity: 0.7;
  background: #000;
}
.menu-box-text {
  color: #FCFCFC;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  margin-top: 20px;
}
</style>