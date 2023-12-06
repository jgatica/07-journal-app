<template>
  <button class="btn btn-primary">
    <i class="fa fa-2x"
       :class="icon"
    ></i>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'fa-plus',
    },
  },
  name: "Fab"
}
</script>

<style scoped lang="scss">
button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 80px;
  height: 80px;
  border-radius: 100%;
}
</style>