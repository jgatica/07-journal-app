import useAuth from '@/modules/auth/composables/useAuth'

const mockStore = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: {
    'auth/currentState': 'authenticated',
    'auth/username': 'Jorge',
  }
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

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', {
      'email': 'jorge@mail.com',
      'password': '123456'
    })
    expect(resp).toEqual({ ok: true })

  })

  it('login fallido', async () => {

    const { loginUser } = useAuth()

    // Llamar al createUser *no importa si el usuario existe xq estoy simulando todo el vuex
    const newUser = { email: 'jorge@mail.com', password: '123456' }
    mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL/PASSWORD do not exist' })

    const resp = await loginUser(newUser)

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', {
      'email': 'jorge@mail.com',
      'password': '123456'
    })
    expect(resp).toEqual({ ok: false, message: 'EMAIL/PASSWORD do not exist' })

  })

  it('checkAuthStatus', async () => {

    const { checkAuthStatus } = useAuth()

    mockStore.dispatch.mockReturnValue({ ok: true })

    const resp = await checkAuthStatus()

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/checkAuthentication')
    expect(resp).toEqual({ ok: true })

  })

  it('logout', () => {

    const { logout } = useAuth()

    logout()

    expect(mockStore.commit).toHaveBeenCalledWith('auth/logout')
    expect(mockStore.commit).toHaveBeenCalledWith('journal/clearEntries')

  })

  it.only('authStatus, username ', () => {

    const { authStatus, username } = useAuth()
    console.log(authStatus.value, username.value)

  })

})