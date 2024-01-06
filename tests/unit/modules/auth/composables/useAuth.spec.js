import useAuth from '@/modules/auth/composables/useAuth'

const mockStore = {
  dispatch: jest.fn(),
}

jest.mock('vuex', () => ({
  useStore: () => mockStore
}))

describe('Pruebas en useAuth', () => {

  beforeEach(() => jest.clearAllMocks())

  it('createUser exitoso', async () => {
    const { createUser } = useAuth()

    // Llamar al createUser *no importa si el usuario existe xq estoy simulando todo el vuex
    const newUser = { name: 'Jorge', email: 'jorge@mail.com' }

    const resp = await createUser(newUser)

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", {"email": "jorge@mail.com", "name": "Jorge"})

  })

})