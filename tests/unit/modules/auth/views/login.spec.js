import { shallowMount } from '@vue/test-utils'
import Login from '@/modules/auth/views/Login.vue'
import createVuexStore from '../../../mock-data/mock-store'

import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from 'vue-router-mock'
import { config } from '@vue/test-utils'

// create one router per test file
const router = createRouterMock()
beforeEach(() => {
  router.reset() // reset the router state
  injectRouterMock(router)
})

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock)

describe('Pruebas en el Login Component', () => {

  const store = createVuexStore({
    status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
    user: null,
    idToken: null,
    refreshToken: null,
  })

  beforeEach(() => jest.clearAllMocks())

  it('debe hacer match con el SnapShot', () => {

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

  })

})