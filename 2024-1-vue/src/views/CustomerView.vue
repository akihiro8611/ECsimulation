<template>
  <div class="customer-container">
    <div class="customer-information">
      <div v-for="field in store.fields" :key="field.id" class="import-box">
        <h1 class="import-title-text">{{ field.label }}</h1>
        <input :type="field.type" :name="field.name" :id="field.id" class="import-form" v-model="field.value">
      </div>
    </div>
    <div>
      <div class="payment-serect">
        <div v-for="option in store.paymentOptions" :key="option.value">
          <input type="radio" :id="option.value" :name="option.name" :value="option.value" v-model="store.selectedOption">
          <label :for="option.value">{{ option.label }}</label>
        </div>
      </div>
      <div v-if="store.selectedOption === 'bank'" class="category-contents">
        <div class="bank-payment-information">
          <div v-for="field in store.bankFields" :key="field.id" class="payment-form-box">
            <h1 class="payment-title">{{ field.label }}</h1>
            <input type="text" :name="field.name" :id="field.id" class="payment-form" v-model="field.value">
            <div v-if="field.id === 1" class="bank-type-select">
              <div v-for="bankType in store.bankTypes" :key="bankType.value">
                <input type="radio" :id="bankType.value" :name="bankType.name" :value="bankType.value" v-model="bankType.checked">
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
            <input type="text" :name="field.name" :id="field.id" class="payment-form" v-model="field.value">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="customer-next-link">
      <button class="next-link-text" @click="navigateToConfirmationInfo">
        <p>注文確認画面へ</p>
      </button>
    </div>
  </div>
</template>
<script>
import { defineComponent, } from 'vue';
import { useCustomerFormStore } from '@/stores/customerStore';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const store = useCustomerFormStore();
    const router = useRouter();
    const navigateToConfirmationInfo = () => {
      router.push('/confirmation');
    };
    return {
      store,
      navigateToConfirmationInfo,
    };
  },
});
</script>

<style>
.customer-container {
  padding: 40px;
  padding-top: 72px;
}
.customer-information-title {
  padding: 40px 0;
}
.information-title-text {
  font-size: 40px;
  font-weight: bold;

}
.customer-container {
  display: flex;
  justify-content: center;
}
.customer-information,.category-contents {
  border: 1px solid #000;
  justify-content: center;
  padding: 40px;
  width: 580px;
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
@media screen and (max-width: 767px) {
  .customer-contener {
    padding: 112px 0 0;
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
    flex-direction: column-reverse;
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
}
</style>