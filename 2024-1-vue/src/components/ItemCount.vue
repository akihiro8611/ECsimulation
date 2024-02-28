<template>
  <div class="item-count-box">
    <div class="item-count">
      <button class="item-count-button" @click="decrement">
        <img src="../assets/uiw_minus-circle.png" alt="" class="item-count-icon">
      </button>
      {{ counter }}
      <button class="item-count-button" @click="increment">
        <img src="../assets/uiw_plus-circle.png" alt="" class="item-count-icon">
      </button>
    </div>
    <div class="dust-box" @click="reset">
      <img src="../assets/Vector.png" alt="" class="item-count-icon">
    </div>
    <div class="total-price">Total Price: {{ totalProductPrice }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useItemCountStore } from '@/stores/counterStore.ts';

export default {
  props: {
    productId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const counterStore = useItemCountStore();
    const counter = ref(counterStore.getCounter(props.productId));
    const quantity = ref(0);
    const totalProductPrice = ref(0);

    const increment = () => {
      counterStore.increment(props.productId);
      counter.value = counterStore.getCounter(props.productId);
      quantity.value = counter.value;
      updateTotal();
    };

    const decrement = () => {
      counterStore.decrement(props.productId);
      counter.value = counterStore.getCounter(props.productId);
      quantity.value = counter.value;
      updateTotal();
    };

    const reset = () => {
      counterStore.reset(props.productId);
      counter.value = counterStore.getCounter(props.productId);
      quantity.value = counter.value;
      updateTotal();
    };

    const updateTotal = () => {
      totalProductPrice.value = counter.value * props.price;
    };

    onMounted(() => {
      counter.value = counterStore.getCounter(props.productId);
      quantity.value = counter.value;
      updateTotal();
    });

    return { counter, increment, decrement, reset, totalProductPrice };
  },
};
</script>

<style>
.total-price{
  display: none;
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
  width: fit-content;
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

</style>