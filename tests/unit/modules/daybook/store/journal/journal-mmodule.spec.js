import {createStore} from "vuex";
import journal from "@/modules/daybook/store/journal";

const createVuexStore = (initialState)=> createStore({
  modules: {
    jounal: {
      ...journal,
      state: { ...initialState } // 👈 Sobrescribe al state que esta desectucturado arriba
    },
  }
})

