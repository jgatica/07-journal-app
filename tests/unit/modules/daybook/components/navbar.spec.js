import { shallowMount } from '@vue/test-utils'
import Navbar from '@/modules/daybook/components/Navbar.vue'
import createVuexStore from '../../../mock-data/mock-store'

const mockRouter = {
  push: jest.fn(),
}

jest.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}))

describe('Pruebas en el Navbar component', () => {

  const store = createVuexStore({
    user: {
      name: 'Juan Carlos',
      email: 'juan@gmail.com',
    },
    status: 'authenticated',
    idToken: 'ABC',
    refreshToken: 'XYZ',
  })

  it('debe mostrar el componente correctamente', () => {

    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

  })

  it('click en logout, debe cerrar sesión y redireccionar ', async () => {

    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      }
    })

    await wrapper.find('button').trigger('click')

    // Evaluar el router
    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith({ 'name': 'login' })
    expect(store.state.auth).toEqual({
      user: null,
      status: 'not-authenticated',
      idToken: null,
      refreshToken: null,
    })

  })

})