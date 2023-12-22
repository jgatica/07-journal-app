import {shallowMount} from "@vue/test-utils";
import {createStore} from "vuex";

import EntryList from "@/modules/daybook/components/EntryList.vue";
import journal from "@/modules/daybook/store/journal";
import {getEntriesByTerm} from "@/modules/daybook/store/journal/getters";

describe('Pruebas al componente EntryList', () => {

  // Crear un mock completo de ese modulo
  const journalMockModule = {
    namespaced: true,
    getters: {
      getEntriesByTerm: getEntriesByTerm
    }
  }

  const store = createStore({
    modules: {
      journal: {...journalMockModule},
    }
  })


  it('should ', () => {

  });
});