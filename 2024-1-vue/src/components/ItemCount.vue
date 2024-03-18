<!-- <template>
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
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useItemCountStore } from '@/stores/counterStore.ts';
import { useCartStore } from '@/stores/cartStore.ts';

export default {
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const counterStore = useItemCountStore();
    const cartStore = useCartStore();

    const counter = ref(counterStore.getCounter(props.productId));

    // 関数を定義
    const updateCartStore = () => {
      cartStore.updateQuantity({ productId: props.productId, quantity: counter.value });
    };

    const increment = () => {
      counterStore.increment(props.productId);
      counter.value = counterStore.getCounter(props.productId);
      updateCartStore();
    };

    const decrement = () => {
      counterStore.decrement(props.productId);
      counter.value = counterStore.getCounter(props.productId);
      updateCartStore();
    };

    const reset = () => {
      counterStore.reset(props.productId);
      counter.value = counterStore.getCounter(props.productId);
      updateCartStore();
    };

    onMounted(() => {
      counter.value = counterStore.getCounter(props.productId);
    });

    return { counter, increment, decrement, reset };
  },
};
</script>

<style>
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

</style> -->