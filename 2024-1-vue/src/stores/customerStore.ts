import { defineStore } from 'pinia';

export const useCustomerFormStore = defineStore('customerForm', {
  state: () => ({
    fields: [
      { id: 1, label: "お名前", type: "text", name: "name", value: '' },
      { id: 2, label: "フリガナ", type: "text", name: "kana", value: '' },
      { id: 3, label: "メールアドレス", type: "email", name: "email", value: '' },
      { id: 4, label: "電話番号", type: "tel", name: "tel", value: '' },
      { id: 5, label: "郵便番号", type: "text", name: "zipCode", value: '' },
      { id: 6, label: "都道府県", type: "text", name: "prefecture", value: '' },
      { id: 7, label: "市町村", type: "text", name: "city", value: '' },
      { id: 8, label: "以下番地", type: "text", name: "address", value: '' },
      { id: 9, label: "マンション,アパート名", type: "text", name: "apartment", value: '' },
      { id: 10, label: "部屋番号", type: "text", name: "roomNumber", value: '' }
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
      { id: 1, label: "金融機関", name: "bankName", value: '' }, 
      { id: 2, label: "口座番号", name: "bankNumber", value: '' },
      { id: 3, label: "支店番号", name: "satelliteNumber", value: '' },
      { id: 4, label: "氏名（カナ）", name: "bankUser", value: '' }
    ],
    creditFields: [
      { id: 1, label: "カード番号", name: "creditNumber", value: '' }, 
      { id: 2, label: "氏名", name: "creditUser", value: '' },
      { id: 3, label: "有効期限", name: "creditExpire", value: '' },
      { id: 4, label: "セキュリティーコード", name: "securityCode", value: '' }
    ],
  }),

  actions: {
    setFieldValue(fieldName, value) {
      const field = this.fields.find(f => f.name === fieldName);
      if (field) {
        field.value = value;
      }
    },

    resetForm() {
      this.fields.forEach(field => {
        field.value = '';
      });
      this.selectedOption = 'bank';
      this.bankTypes.forEach(bankType => {
        bankType.checked = bankType.value === 'normalBank';
      });
    },
  },
});
