import { shallowMount } from '@vue/test-utils'
import Login from '@/modules/auth/views/Login.vue'

describe('Pruebas en el Login Component', () => {

  it('debe hacer match con el SnapShot', () => {

    const wrapper = shallowMount(Login)

    expect(wrapper.html()).toMatchSnapshot()

  })

})