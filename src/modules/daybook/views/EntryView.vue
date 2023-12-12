<template>

  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">

      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>

      <input
        type="file"
        @change="onSelectedImage"
        v-show="false"
        ref="imageSelector"
        accept="image/jpeg, image/png"
      >
      <div>
        <button
          v-if="entry.id"
          @click="onDeleteEntry"
          class="btn btn-danger mx-2">
          Borrar
        </button>
        <button
          @click="onSelecteImage"
          class="btn btn-primary"
        >
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>

    </div>

    <hr>

    <div class="d-flex flex-column px-3 h-75">
    <textarea
      v-model="entry.text"
      placeholder="¿Qué sucedió hoy?"
    ></textarea>
    </div>

    <Fab
      icon="fa-save"
      @on:click="saveEntry"
    ></Fab>

<!--    <img-->
<!--      src="https://www.robertlandscapes.com/wp-content/uploads/2014/11/landscape-322100_1280.jpg"-->
<!--      alt="entry-picture"-->
<!--      class="img-thumbnail"-->
<!--    >-->

    <img
      v-if="localImage"
      :src="localImage"
      alt="entry-picture"
      class="img-thumbnail"
    >

  </template>
</template>

<script>
import {defineAsyncComponent} from "vue";
import {mapActions,mapGetters} from "vuex";
import Swal from "sweetalert2";

import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear";

export default {
  name: "EntryView",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(()=> import(/* webpackChunkName: "Fab" */'@/modules/daybook/components/Fab.vue')),
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
    }
  },
  computed: {
    ...mapGetters('journal', ['getEntryById']),
    day() {
      const { day } = getDayMonthYear(this.entry.date)
      return day
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date)
      return month
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date)
      return yearDay
    },
  },
  methods: {
    ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
    loadEntry(){

      let entry;

      if (this.id === 'new') {

        entry = {
          text: '',
          date: new Date().getTime(),
        }

      } else {
        entry = this.getEntryById(this.id);
        if (!entry) this.$router.push({ name: 'no-entry' })
      }

      this.entry = entry
    },
    async saveEntry (event) {
      new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false,
      })
      Swal.showLoading()

      if (this.entry.id) {
        // Actualizar
        await this.updateEntry(this.entry);
      } else {
        // Crear una nueva entrada
        const idx = await this.createEntry(this.entry)
        // idx es el nuevo id
        this.$router.push({ name: 'entry', params: { id: `${idx}` } })

      }

      await Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
    },
    async onDeleteEntry() {
      const {isConfirmed} = await Swal.fire({
        title: '¿Está seguro?',
        text: 'Una vez borrado, no se puede recuperar',
        showDenyButton: true,
        confirmButtonText: 'Si, estoy seguro',
      })

      if (isConfirmed) {
        new Swal({
          title: 'Espere por favor',
          allowOutsideClick: false,
        })
        Swal.showLoading()
        await this.deleteEntry(this.entry.id)
        this.$router.push({ name: 'no-entry' })

        await Swal.fire('Eliminado', '', 'success')
      }
    },
    onSelectedImage(event) {
      const file = event.target.files[0]

      // Entrara si cancela
      if (!file) {
        this.localImage = null
        this.file = null
        return
      }

      this.file = file

      const fr = new FileReader()
      fr.onload = () => this.localImage = fr.result
      fr.readAsDataURL(file)

    },
    onSelecteImage() {
      // console.log(this.$refs)
      this.$refs.imageSelector.click()
    },
  },
  watch: {
    id(){
      this.loadEntry()
    },
  },
  created() {
    // console.log(this.id)
    this.loadEntry()
  },
}

</script>

<style scoped lang="scss">

textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

</style>