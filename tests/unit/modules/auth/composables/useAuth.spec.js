import useAuth from '@/modules/auth/composables/useAuth'

const mockStore = {
  dispatch: jest.fn(),
}

jest.mock('vuex', () => ({
  useStore: () => mockStore
}))

describe('Pruebas en useAuth', () => {

  it('createUser exitoso', () => {

  })

})