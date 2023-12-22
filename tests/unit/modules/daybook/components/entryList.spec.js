import {shallowMount} from "@vue/test-utils";
import {createStore} from "vuex";

import EntryList from "@/modules/daybook/components/EntryList.vue";
import journal from "@/modules/daybook/store/journal";
import {getEntriesByTerm} from "@/modules/daybook/store/journal/getters";
import testJournalState from "../../../mock-data/test-journal-state";

describe('Pruebas al componente EntryList', () => {

  // Crear un mock completo de ese modulo
  const journalMockModule = {
    namespaced: true,
    getters: {
      getEntriesByTerm: getEntriesByTerm,
    },
    state: ()=> ({
      isLoading: false,
      entries: testJournalState.entries,
    })
  }

  const store = createStore({
    modules: {
      journal: {...journalMockModule},
    }
  })

  const wrapper = shallowMount(EntryList, {
    global: {
      mocks: {
        // TODO: $router:
      },
      plugins: [store],
    },
  })

  it('debe llamar al getEntriesByTerm sin termino y mostrar 3 entradas ', () => {
    console.log(wrapper.html())
  });
});