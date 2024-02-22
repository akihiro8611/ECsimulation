<template>
  <div class="item-count-box">
    <div class="item-count">
      <button class="item-count-button" @click="itemCountStore.decrement">
        <img src="../assets/uiw_minus-circle.png" alt="" class="item-count-icon">
      </button>
      {{ itemCountStore.counter }}
      <button class="item-count-button" @click="itemCountStore.increment">
        <img src="../assets/uiw_plus-circle.png" alt="" class="item-count-icon">
      </button>
    </div>
    <div class="dust-box" @click="itemCountStore.reset">
      <img src="../assets/Vector.png" alt="" class="item-count-icon">
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { useItemCountStore } from '@/stores/counterStore.ts';

export default {
  setup() {
    
    const itemCountStore = useItemCountStore();
    const counter = ref(itemCountStore.counter);

    const increment = () => itemCountStore.increment();
    const decrement = () => itemCountStore.decrement();
    const reset = () => itemCountStore.reset();
    
    onMounted(() => {
      counter.value = itemCountStore.counter;
    });

    return { counter, increment, decrement, reset };
  }
}

</script>

<style>
.item-count-box {
  width: fit-content;
  height: fit-content;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}
.item-count-box {
  display: flex;
  width: 157px;
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
@media screen and (min-width: 768px) {
  .item-count-contents {
    margin-top: 32px;
  }
  .item-count-box {
    width: 157px;
    padding: 4px 18px;
  }
  .item-count {
    gap: 20px;
  }
  .item-count-button {
    cursor: pointer;
  }
  .item-count-icon {
    width: auto;
  }
  .dust-box {
    margin-left: 20px;
  }
}
</style>