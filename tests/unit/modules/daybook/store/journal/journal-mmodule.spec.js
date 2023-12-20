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

  it('se agregar 3 entradas - mutation: setEntries', () => {
    const store = createVuexStore({
      isLoading: true,
      entries: [],
    })

    store.commit('journal/setEntries', journalState.entries)

    expect(store.state.journal.entries.length).toBe(3)
    expect(store.state.journal.isLoading).toBeFalsy()

  });

  it('actualizar entrada mutation: updateEntry', () => {
    const store = createVuexStore(journalState)

    const updatedEntry = {
      id: '-Nlmoug_xoyMBm3jZe40',
      date: 1702733088465,
      text: 'Ejemplo modificado',
    }

    store.commit('journal/updateEntry', updatedEntry)

    expect(store.state.journal.entries.length).toBe(3)
    expect(store.state.journal.entries.find(el => el.id === updatedEntry.id)).toEqual(updatedEntry)

  });

  it('mutation: addEntry y deleteEntry ', () => {
    const store = createVuexStore(journalState)

    const entry = {
      id: 'ABC-123',
      date: 1702733088465,
      text: 'Ejemplo modificado',
    }

    store.commit('journal/addEntry', entry)

    // expect de 4 entradas
    expect(store.state.journal.entries.length).toBe(4)
    // expect que exista el id 'ABC-123'
    const resultAdd = store.state.journal.entries.map(el => el.id)
    expect(resultAdd.includes(entry.id)).toBe(true)

    // eliminar el objeto con id 'ABC-123'
    store.commit('journal/deleteEntry', entry.id)
    // expect 3 entradas
    expect(store.state.journal.entries.length).toBe(3)
    // no debe existir id 'ABC-123'
    const resultDel = store.state.journal.entries.map(el => el.id)
    expect(resultDel.includes(entry.id)).toBe(false)

  });

  it('Getters: getEntriesByTerm getEntryById', () => {
    const store = createVuexStore(journalState)

    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(3)
    expect(store.getters['journal/getEntriesByTerm']('Ejemplo 2').length).toBe(1)

    const [, entry2,] = store.state.journal.entries
    expect(store.getters['journal/getEntryById']('-Nlmozeu7BNELg2KUuBl')).toEqual(entry2)
  });

  it('actions: loadEntries', async () => {
    const store = createVuexStore({
      isLoading: true,
      entries: [],
    })

    await store.dispatch('journal/loadEntries')

    expect(store.state.journal.entries.length).toBe(3)

  });

  it('actions: updateEntry', async () => {
    const store = createVuexStore(journalState)

    const entry = {
      id: '-Nlmp31-N1n1mqnyhSj-',
      date: 1702733088465,
      text: 'Ejemplo tres',
      otroCampo: true,
    }

    await store.dispatch('journal/updateEntry', entry)

    expect(store.state.journal.entries.length).toBe(3)
    expect(store.state.journal.entries.find(el => el.id === entry.id)).toEqual({
      id: '-Nlmp31-N1n1mqnyhSj-',
      date: 1702733088465,
      text: 'Ejemplo tres',
    })

  });

  it('actions: createEntry y deleteEntry', async () => {
    const store = createVuexStore(journalState)

    const entry = {
      date: 1802733088001,
      text: 'Ejemplo',
      picture:'aca va el enlace',
    }

    const respId = await store.dispatch('journal/createEntry', entry)

    // Id creado debe ser de tipo string
    expect(typeof respId).toBe('string')

    // La nueva entrada debe existir
    expect(store.state.journal.entries.find(el => el.id === respId)).toBeTruthy()

    await store.dispatch('journal/deleteEntry', respId)

    // La nueva entrada NO debe existir
    expect(store.state.journal.entries.find(el => el.id === respId)).toBeFalsy()


  });
});