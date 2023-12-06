<template>
  <div class="entry-container mb-3 pointer p-2"
       @click="$router.push({ name:'entry', params: { id:10 } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">{{ entry.id }}</span>
      <span class="mx-1 fs-5">{{ entry.date }}</span>
      <span class="mx-2 fw-light">{{ entry.picture }}</span>
    </div>

    <div class="entry-description">
      {{ entry.text }}
    </div>

  </div>
</template>

<script>
export default {
  name: "Entry",
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }

  .entry-description {
    font-size: 12px;
  }
}
</style>