import {shallowMount} from "@vue/test-utils"
import {createStore} from "vuex"
import Swal from "sweetalert2"

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

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}))

describe('Pruebas en el EntryView', () => {

  const store = createVuexStore(journalState)
  store.dispatch = jest.fn()
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

  it('debe mostrar entrada correctamente', () => {

    expect(wrapper.html()).toMatchSnapshot()
    expect(mockRouter.push).not.toHaveBeenCalledWith()

    //

  });

  it('debe borrar la entrada y salida', async () => {

    Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed: true}))


    await wrapper.find('.btn-danger').trigger('click')

    expect(Swal.fire).toHaveBeenCalledWith({
      title: '¿Está seguro?',
      text: 'Una vez borrado, no se puede recuperar',
      showDenyButton: true,
      confirmButtonText: 'Si, estoy seguro',
    })

    expect(mockRouter.push).toHaveBeenCalled()

  });

});