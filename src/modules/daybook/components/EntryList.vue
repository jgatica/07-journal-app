<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text"
             class="form-control"
             placeholder="Buscar entrada"
             v-model="term"
      />
    </div>
    <div class="mt-2 d-flex flex-column">
      <button
        @click="$router.push({ name: 'entry', params: { id: 'new' } })"
        class="btn btn-primary mx-3"
      >
        <i class="fa fa-plus-circle"></i>
        Nueva entrada
      </button>
    </div>
    <div class="entry-scrollarea">
      <Entry
        v-for="entry in entriesByTerm"
        :key="entry.id"
        :entry="entry"

      ></Entry>
    </div>
  </div>
</template>

<script>

import {defineAsyncComponent} from "vue";
import {mapGetters} from "vuex";

export default {
  name: "EntryList",
  data() {
    return {
      term: '',
    }
  },
  components: {
    Entry: defineAsyncComponent(()=> import(/* webpackChunkName: "Entry" */'@/modules/daybook/components/Entry.vue')),
  },
  computed: {
    ...mapGetters('journal',['getEntriesByTerm']),
    entriesByTerm() {
      return this.getEntriesByTerm(this.term)
    },
  },
}
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}
.entry-scrollarea {
  height: calc(100vh - 110px);
  overflow: scroll;
}
</style>