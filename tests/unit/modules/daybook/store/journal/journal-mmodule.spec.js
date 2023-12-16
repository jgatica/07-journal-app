import {createStore} from "vuex";
import journal from "@/modules/daybook/store/journal";
import journalState from "../../../../mock-data/test-journal-state";

const createVuexStore = (initialState) => createStore({
  modules: {
    jounal: {
      ...journal,
      state: {...initialState} // 👈 Sobrescribe al state que esta desectucturado arriba
    },
  }
}) // Fin createVuexStore

