import {createStore} from "vuex";
import journal from "@/modules/daybook/store/journal";
import journalState from "../../../../mock-data/test-journal-state";

const createVuexStore = (initialState) => createStore({
  modules: {
    journal: {
      ...journal,
      state: {...initialState} // 👈 Sobrescribe al state que esta desectucturado arriba
    },
  }
}) // Fin createVuexStore

describe('Vuex - Pruebas en el Journal Module', () => {

  it('este es el estado inicial, debe tener este state ', () => {
    const store = createVuexStore(journalState)
    const {isLoading, entries} = store.state.journal

    expect(isLoading).toBe(true)
    expect(entries).toEqual(journalState.entries)
  });

});