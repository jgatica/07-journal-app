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
      props: {
        id: '-Nlmoug_xoyMBm3jZe40'
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    })

  })

  it('debe sacar al usuario porque el id no existe', () => {
    wrapper = shallowMount(EntryView, {
      props: {
        id: 'Este id no existe en el STORE'
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    })

    expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})

  });

});