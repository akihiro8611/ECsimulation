<script lang="ts">
import HeaderView from "./components/HeaderView.vue"
export default {
  
  components: {
    HeaderView,
  },
}
</script>

<template>
  <HeaderView />
  <router-view />
</template>
