<template>
  <h1>Daybook Layout</h1>
  <Navbar />
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "DayBookLayouts",
  components: {
    Navbar : defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */ '@/modules/daybook/components/Navbar.vue'))
  },
}
</script>

<style scoped>

</style>