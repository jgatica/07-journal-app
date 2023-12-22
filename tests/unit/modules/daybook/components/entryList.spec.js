import {shallowMount} from "@vue/test-utils";
import {createStore} from "vuex";

import EntryList from "@/modules/daybook/components/EntryList.vue";
import journal from "@/modules/daybook/store/journal";
import journalState from "../../../mock-data/test-journal-state";

const createVuexStore = (initialState) => createStore({
  modules: {
    journal: {
      ...journal,
      state: {...initialState} // 👈 Sobrescribe al state que esta desectucturado arriba
    },
  }
}) // Fin createVuexStore

describe('Pruebas al componente EntryList', () => {

  const store = createVuexStore(journalState)
  const mockRouter = {
    push: jest.fn(),
  }

  let wrapper

  beforeEach(()=>{
    jest.clearAllMocks()

    wrapper = shallowMount(EntryList, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    })

  })

  it('debe llamar al getEntriesByTerm sin termino y mostrar 3 entradas ', () => {
    expect(wrapper.findAll('entry-stub').length).toBe(3)
    expect(wrapper.html()).toMatchSnapshot()
  });

  it('debe llamar al getEntriesByTerm y filtrar las entradas', () => {
    
  });

});