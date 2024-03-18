<template>
  <HeaderViewPC v-if="isDesktopView"/>
  <HeaderViewSP v-else />
</template>
<script>
import HeaderViewPC from '@/components/HeaderViewPC.vue'
import HeaderViewSP from '@/components/HeaderViewSP.vue'
export default {
  components: {
    HeaderViewPC,
    HeaderViewSP,
  },
  computed: {
    HeaderViewPC,
    HeaderViewSP,
  },
  data() {
    return {
      isDesktopView: true,
    }
  },
  mounted() {
    window.addEventListener('resize', this.checkView)
    this.checkView()
  },
  methods: {
    checkView() {
      this.isDesktopView = window.innerWidth >= 768
    },
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkView)
  },
}
</script>