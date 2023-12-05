<template>
  <div class="home">
    <img height="80" alt="Vue logo" src="../assets/logo.png">
    <h1>Hola Mundo</h1>

    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Secondary</button>
    <button class="btn btn-success">Success</button>
    <button @click="goToDaybook" class="btn btn-success">Ir a la ruta daybook</button>

  </div>
</template>

<script>
export default {
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'no-entry' })
    },
  }
}
</script>