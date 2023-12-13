import { shallowMount } from '@vue/test-utils'
import HomeView from "@/views/HomeView.vue";

describe('Pruebas sobre HomeView', () => {

  it('debe coincidir con snapshot', () => {
    const wrapper = shallowMount(HomeView)
    expect(wrapper.html()).toMatchSnapshot()
  });

  it('hacer click en un boton debe de redireccionaar a no-entry ', () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(HomeView, {
      global: {
        mocks: {
          $router: mockRouter,
        }
      }
    })

    wrapper.findAll('button')[3].trigger('click')

    // espera que se llame a la funcion push
    expect(mockRouter.push).toHaveBeenCalled()
    //espera que en la funcion se pase esto como parametro
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })

  });

})