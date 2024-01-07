import { shallowMount } from '@vue/test-utils'
import Navbar from '@/modules/daybook/components/Navbar.vue'
import createVuexStore from '../../../mock-data/mock-store'

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
    const wrapper = shallowMount(Navbar)
  })

})