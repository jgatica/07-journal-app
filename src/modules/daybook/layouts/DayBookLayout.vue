<template>
  <Navbar />
  <div class="d-flex">
    <div class="col-4">
      <EntryList></EntryList>
    </div>
    <div class="col">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "DayBookLayouts",
  components: {
    EntryList: defineAsyncComponent(()=> import(/* webpackChunkName: "EntryList" */'@/modules/daybook/components/EntryList.vue')),
    Navbar : defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */ '@/modules/daybook/components/Navbar.vue'))
  },
}
</script>

<style scoped>

</style>