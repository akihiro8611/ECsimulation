<template>
  <div class="customer-wrapper">
    <h1 class="customer-container-title">お客様情報入力</h1>
    <div class="customer-container">
      <div class="customer-information">
        <div v-for="field in store.fields" :key="field.id" class="import-box">
          <h1 class="import-title-text">{{ field.label }}</h1>
          <input
            :type="field.type"
            :name="field.name"
            :id="field.id"
            class="import-form"
            v-model="field.value"
          >
          <p v-if="fieldHasError(field)" class="error-message">入力してください。</p>
          <!-- メールアドレスのバリデーションエラーメッセージ -->
          <!-- <p v-if="field.name === 'email' && !isEmailValid(field.value)" class="error-message">正しいメールアドレスを入力してください。</p> -->
          <!-- ここ１７行目コンソールエラーでます 原因不明-->
        </div>
      </div>
      <div class="payment-contener">
        <div class="payment-serect">
          <div v-for="option in store.paymentOptions" :key="option.value" class="payment-serect-text">
            <input
              type="radio"
              :id="option.value"
              :name="option.name"
              :value="option.value"
              v-model="store.selectedOption"
            >
            <label :for="option.value">{{ option.label }}</label>
          </div>
        </div>
        <div v-if="store.selectedOption === 'bank'" class="category-contents">
          <div class="bank-payment-information">
            <div v-for="field in store.bankFields" :key="field.id" class="payment-form-box">
              <h1 class="payment-title">{{ field.label }}</h1>
              <input
                :type="field.type"
                :name="field.name"
                :id="field.id"
                class="payment-form"
                v-model="field.value"
              >
              <p v-if="fieldHasError(field)" class="error-message">入力してください。</p>
              <div v-if="field.id === 1" class="bank-type-box">
                <div v-for="bankType in store.bankTypes" :key="bankType.value" class="banktype-serect">
                  <input
                    type="radio"
                    :id="bankType.value"
                    :name="bankType.name"
                    :value="bankType.value"
                    v-model="bankType.checked"
                  >
                  <label :for="bankType.value">{{ bankType.label }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="store.selectedOption === 'credit'" class="category-contents">
          <div class="credit-payment-information">
            <div v-for="field in store.creditFields" :key="field.id" class="payment-form-box">
              <h1 class="payment-title">{{ field.label }}</h1>
              <input
                :type="field.type"
                :name="field.name"
                :id="field.id"
                class="payment-form"
                v-model="field.value"
              >
              <p v-if="fieldHasError(field)" class="error-message">入力してください。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="customer-next-link">
        <button class="next-link-text" @click="validateAndNavigateToConfirmation">
          <p>注文確認画面へ</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useCustomerFormStore } from '@/stores/customerStore';
import { useRouter } from 'vue-router';

// setup 関数の外で isEmailValid を定義
const isEmailValid = (email) => {
  // メールアドレスの正規表現
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default defineComponent({
  setup() {
    // useCustomerFormStore フックを使ってフォームの状態を取得
    const store = useCustomerFormStore();
    
    // Vue Router を使用してルーティングを制御
    const router = useRouter();

    // フォームのバリデーションを行い、確認画面に遷移するメソッド
    const validateAndNavigateToConfirmation = () => {
      // フォームの各フィールドに対してバリデーションを行う
      store.fields.forEach(field => {
        // 空白の場合、エラーを設定
        field.error = field.value.trim() === '';
      });

      // エラーチェック
      const isFormValid = store.fields.every(field => field.value.trim() !== '' && (field.name !== 'email' || isEmailValid(field.value)));

      if (isFormValid) {
        // フォームが有効であれば、確認画面に遷移
        router.push('/confirmation');
      } else {
        // フォームが無効であればエラーを出力
        console.error('フォームが無効です。');
      }
    };

    // 特定のフィールドがエラーを持っているかを判定するメソッド
    const fieldHasError = (field) => {
      return field.value.trim() === '' || (field.name === 'email' && !isEmailValid(field.value));
    };

    return {
      store,
      validateAndNavigateToConfirmation,
      fieldHasError,
    };
  },
});
</script>

<style>
.error-message{
  color: red;
}
.customer-wrapper {
  padding-top: 112px;
}
.customer-container-title {
  font-size: 40px;
  margin-left: 40px;
}
.customer-container {
  padding: 40px;
  
}
.customer-information-title {
  padding: 40px 0;
}
.information-title-text {
  font-size: 40px;
  font-weight: bold;

}
.payment-contener {
  margin-left: 40px;

}
.customer-container {
  display: flex;
  justify-content: center;
}
.customer-information,.category-contents {
  border: 1px solid #000;
  justify-content: center;
  padding: 40px;
}
.category-contents {
  margin-top: 40px;
}
.payment-information {
  margin-left: 40px;
}
.payment-serect, .bank-type-serect {
  display: flex;
  justify-content: center;
  font-size: 32px;
}
.import-box,
.payment-form-box,
.bank-type-serect {
  margin-top: 36px;
}
.import-box:first-of-type,.payment-form-box:first-of-type {
  margin-top: 0;
}
.import-form,.payment-form {
  width: 100%;
  height: 65px;
  background-color: #d9d9d9;
  border-radius: 40px;
  margin-top: 20px;
}
.bank-type-box {
  text-align: center;
}
.banktype-serect{
  font-size: 32px;
  display: inline-block;
}
.payment-serect-text:last-of-type,
.banktype-serect:last-of-type {
  margin-left: 60px;
}
.customer-next-link{
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
.next-link-text{
  border-radius: 40px;
  border: 5px solid #000;
  height: fit-content;
  padding: 18px 36px;
  font-size: 36px;
  margin-top: 20px;
}
@media screen and (max-width: 767px) {
  .customer-container-title{
    font-size: 24px;
  }
  .customer-container {
    padding: 32px 0 0;
    display: flex;
    flex-direction: column-reverse;
  }
  .customer-information-title {
    padding: 0;
  }
  .information-title-text {
    font-size: 24px;
    font-weight: bold;
    margin-left: 20px;
  }
  .customer-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .customer-information,.category-contents {
    border:none;
    border-top: 1px solid #000;
    justify-content: center;
    padding: 20px;
    width: 100%;
  }
  .category-contents {
    border-bottom: 1px solid #000;
  }
  .category-contents {
  margin-top: 0;
}
.payment-contener {
  margin-left: 0px;
}
.payment-title,.import-title-text {
  font-size: 20px;
}
.payment-information {
  margin-left: 0;
}
  .payment-serect, .bank-type-serect {
    display: flex;
    justify-content: center;
    font-size: 20px;
    margin: 16px 0;
  }
  .import-box,
  .payment-form-box,
  .bank-type-serect {
    margin-top: 36px;
  }
  .banktype-serect{
    margin-top: 20px;

    font-size: 20px;
  }
  .import-box:first-of-type,.payment-form-box:first-of-type {
    margin-top: 0;
  }
  .import-form,.payment-form {
    width: 100%;
    height: 55px;
    background-color: #d9d9d9;
    border-radius: 40px;
    margin-top: 20px;
  }
  .next-link-text{
    width: fit-content;
    height: fit-content;
    border: 2px solid #000;
    padding: 12px 28px;
    font-size: 18px;
    margin: 20px 0;

  }
  
}
</style>