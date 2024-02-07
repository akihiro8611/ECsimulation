<template>
  <div class="customer-contener">
    <div class="customer-information-title">
      <h1 class="information-title-text">お客様情報入力</h1>
    </div>
    <div class="customer-wrapper">
      <div class="customer-information">
        <div v-for="field in fields" :key="field.id" class="import-box">
          <h1 class="import-title-text">{{ field.label }}</h1>
          <input :type="field.type" :name="field.name" :id="field.id" class="import-form">
        </div>
      </div>
      <div class="payment-information">
        <div class="payment-serect">
          <div v-for="option in paymentOptions" :key="option.value">
            <input type="radio" :id="option.value" :name="option.name" :value="option.value" v-model="selectedOption">
            <label :for="option.value">{{ option.label }}</label>
          </div>
        </div>
        <div v-if="selectedOption === 'bank'" class="category-contents">
          <div class="bank-payment-information">
            <div v-for="field in bankFields" :key="field.id" class="payment-form-box">
              <h1 class="payment-title">{{ field.label }}</h1>
              <input type="text" :name="field.name" :id="field.id" class="payment-form">
              <div v-if="field.id === 1 " class="bank-type-serect">
                <div v-for="bankType in bankTypes" :key="bankType.value" >
                  <input type="radio" :id="bankType.value" :name="bankType.name" :value="bankType.value" :checked="bankType.checked">
                  <label :for="bankType.value">{{ bankType.label }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="selectedOption === 'credit'" class="category-contents">
          <div class="credit-payment-information">
            <div v-for="field in creditFields" :key="field.id" class="payment-form-box">
              <h1 class="payment-title">{{ field.label }}</h1>
              <input type="text" :name="field.name" :id="field.id" class="payment-form">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="customer-next-link">
      <button class="next-link-text">注文確認画面へ</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { id: 1, label: "お名前", type: "text", name: "name" },
        { id: 2, label: "フリガナ", type: "text", name: "kana" },
        { id: 3, label: "メールアドレス", type: "email", name: "email" },
        { id: 4, label: "電話番号", type: "tel", name: "tel" },
        { id: 5, label: "郵便番号", type: "text", name: "tel" },
        { id: 6, label: "都道府県", type: "text", name: "tel" },
        { id: 7, label: "市町村", type: "text", name: "tel" },
        { id: 8, label: "以下番地", type: "text", name: "tel" },
        { id: 9, label: "マンション,アパート名", type: "text", name: "tel" },
        { id: 10, label: "部屋番号", type: "text", name: "tel" }
      ],
      paymentOptions: [
        { value: "bank", name: "paymentMethod", label: "口座" },
        { value: "credit", name: "paymentMethod", label: "クレジット" }
      ],
      selectedOption: "bank" ,
      bankTypes: [
        { value: "normalBank", name: "bankType", label: "普通", checked: true },
        { value: "currentBank", name: "bankType", label: "当座", checked: false }
      ],
      bankFields: [
        { id: 1, label: "金融機関", name: "bankName" }, 
        { id: 2, label: "口座番号", name: "bankNumber" },
        { id: 3, label: "支店番号", name: "sateliteNumber" },
        { id: 4, label: "氏名（カナ）", name: "bankUser" }
      ],
      creditFields: [
        { id: 1, label: "カード番号", name: "creditNumber" }, 
        { id: 2, label: "氏名", name: "creditUser" },
        { id: 3, label: "有効期限", name: "creditExpire" },
        { id: 4, label: "セキュリティーコード", name: "securityCord" }
      ],
    };
  }
};
</script>
<style>
.customer-contener {
  padding: 40px;
}
.customer-information-title {
  padding: 40px 0;
}
.information-title-text {
  font-size: 40px;
  font-weight: bold;

}
.customer-wrapper {
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
</style>