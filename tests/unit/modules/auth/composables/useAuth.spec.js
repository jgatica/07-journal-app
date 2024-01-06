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
    mockStore.dispatch.mockReturnValue({ ok: true })

    const resp = await createUser(newUser)

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', { 'email': 'jorge@mail.com', 'name': 'Jorge' })
    expect(resp).toEqual({ ok: true })

  })

  it('createUser fallido, email ya existe', async () => {

    const { createUser } = useAuth()

    // Llamar al createUser *no importa si el usuario existe xq estoy simulando todo el vuex
    const newUser = { name: 'Jorge', email: 'jorge@mail.com' }
    mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL_EXISTS' })

    const resp = await createUser(newUser)

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', newUser)
    expect(resp).toEqual({ ok: false, message: 'EMAIL_EXISTS' })

  })

  it('login exitoso', async () => {

    const { loginUser } = useAuth()

    // Llamar al createUser *no importa si el usuario existe xq estoy simulando todo el vuex
    const newUser = { email: 'jorge@mail.com', password: '123456' }
    mockStore.dispatch.mockReturnValue({ ok: true })

    const resp = await loginUser(newUser)

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/signInUser", {"email": "jorge@mail.com", "password": "123456"})
    expect(resp).toEqual({ ok: true })

  })

})