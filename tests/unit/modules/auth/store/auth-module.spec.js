import createVuexStore from '../../../mock-data/mock-store'

describe('Vuex: Pruebas en el auth-module', () => {

  it('Estado inicial', () => {
    const store = createVuexStore({
      status: 'authenticating', // 'authenticated', 'not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    })

    const { status, user, idToken, refreshToken } = store.state.auth

    expect(status).toBe('authenticating')
    expect(user).toBe(null)
    expect(idToken).toBe(null)
    expect(refreshToken).toBe(null)
  })

  // Mutations
  it('Mutation: loginUser ', () => {

    const store = createVuexStore({
      status: 'authenticating', // 'authenticated', 'not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    })

    const payload = {
      user: { name: 'Jorge', email: 'jorge@test.com' },
      idToken: 'abc-123',
      refreshToken: 'xyz-123',
    }

    store.commit('auth/loginUser', payload)

    const { status, user, idToken, refreshToken } = store.state.auth

    expect(status).toBe('authenticated')
    expect(user).toEqual({ name: 'Jorge', email: 'jorge@test.com' })
    expect(idToken).toBe('abc-123')
    expect(refreshToken).toBe('xyz-123')

  })

  it('Mutation: logout', () => {

    const store = createVuexStore({
      status: 'authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
      user: { name: 'Jorge', email: 'jorge@test.com' },
      idToken: 'abc-123',
      refreshToken: 'xyz-123',
    })

  })

})