import {shallowMount} from "@vue/test-utils"
import {createStore} from "vuex"

import journal from "@/modules/daybook/store/journal"
import journalState from "../../../mock-data/test-journal-state"
import EntryView from "@/modules/daybook/views/EntryView.vue"

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: {...initialState} // 👈 Sobrescribe al state que esta desectructurado arriba
      },
    }
  }) // Fin createVuexStore

describe('Pruebas en el EntryView', () => {

  const store = createVuexStore(journalState)
  const mockRouter = {
    push: jest.fn(),
  }

  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()

    wrapper = shallowMount(EntryView, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    })

  })

  it('debe sacar al usuario porque el id no existe', () => {

  });

});