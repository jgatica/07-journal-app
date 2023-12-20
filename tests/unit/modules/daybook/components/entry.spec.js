import {shallowMount} from "@vue/test-utils";
import Entry from "@/modules/daybook/components/Entry.vue";
import journalState from "../../../mock-data/test-journal-state";

describe('Pruebas componente Entry', () => {

  let wrapper

  const mockRouter = {
    push: jest.fn()
  }

  beforeEach(()=>{
    wrapper = shallowMount(Entry, {
      props: {
        entry: journalState.entries[0]
      },
      global: {
        mocks: {
          $router: mockRouter,
        }
      }
    })
  })


  it('debe hacer match con SnapShot ', () => {

    expect(wrapper.html()).toMatchSnapshot()
  });

  it('debe redireccionar al hacer click en el entry-container', async () => {
    const resultContenedor = wrapper.find('.entry-container')

    await resultContenedor.trigger('click')

    expect(mockRouter.push).toHaveBeenCalled()
    expect(mockRouter.push).toHaveBeenCalledWith(
      {
        name: 'entry',
        params: {
          id: journalState.entries[0].id
        }
      }
    )

  });

  it('pruebas en las propiedades computadas ', () => {
    expect(wrapper.vm.day).toBe(16)
    expect(wrapper.vm.month).toBe('Diciembre')
    expect(wrapper.vm.yearDay).toBe('2023, Sábado')
    console.log(wrapper.vm.day, wrapper.vm.month, wrapper.vm.yearDay)
  });

});