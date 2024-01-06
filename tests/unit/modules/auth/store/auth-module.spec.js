import axios from 'axios'

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

    localStorage.setItem('idToken', 'abc-123')
    localStorage.setItem('refreshToken', 'xyz-123')

    const store = createVuexStore({
      status: 'authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
      user: { name: 'Jorge', email: 'jorge@test.com' },
      idToken: 'abc-123',
      refreshToken: 'xyz-123',
    })

    store.commit('auth/logout')

    const { status, user, idToken, refreshToken } = store.state.auth

    expect(status).toBe('not-authenticated')
    expect(user).toBe(null)
    expect(idToken).toBe(null)
    expect(refreshToken).toBe(null)

    expect(localStorage.getItem('idToken')).toBe(null)
    expect(localStorage.getItem('refreshToken')).toBe(null)

  })

  // Actions
  it('Actions: createUser - Error usuario ya existe', async () => {

    const store = createVuexStore({
      status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    })

    const payload = { name: 'Test User', email: 'test@test.com', password: '123456' }

    const resp = await store.dispatch('auth/createUser', payload)

    expect(resp).toEqual({ ok: false, message: 'EMAIL_EXISTS' })

    const { status, user, idToken, refreshToken } = store.state.auth

    expect(status).toBe('not-authenticated')
    expect(user).toBe(null)
    expect(idToken).toBe(null)
    expect(refreshToken).toBe(null)

  })

  it('Actions: createUser signInUser - Crea el usuario', async () => {

    const store = createVuexStore({
      status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    })

    const payload = { name: 'Test User', email: 'test2@test.com', password: '123456' }

    // SignIn
    await store.dispatch('auth/signInUser', payload)
    const { idToken } = store.state.auth

    // Borrar usuario
    const deleteResp = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyBIK79kdSDaaLnY4Qhg0_WJsfcQMOxMa7g`, {
      idToken
    })

    // Crear usuario
    const resp = await store.dispatch('auth/createUser', payload)

    expect(resp).toEqual({ ok: true })

    const { status, user, idToken: token, refreshToken } = store.state.auth

    expect(status).toBe('authenticated')
    expect(user).toMatchObject({ name: 'Test User', email: 'test2@test.com' })
    expect(typeof token).toBe('string')
    expect(typeof refreshToken).toBe('string')

  })

  it('Actions: checkAuthentication - POSITIVA', async () => {

    const store = createVuexStore({
      status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    })

    // SignIn para obtener idToken
    const signInResp = await store.dispatch('auth/signInUser', {
      email: 'test@test.com', password: '123456',
    })

    // Obtengo idToken y vacío lo demás
    const { idToken } = store.state.auth
    store.commit('auth/logout')

    localStorage.setItem('idToken', idToken)
    const checkResp = await store.dispatch('auth/checkAuthentication')

    expect(checkResp).toEqual({ ok: true })

    const { status, user, idToken: token, refreshToken } = store.state.auth

    expect(status).toBe('authenticated')
    expect(user).toEqual({ name: 'User Test', email: 'test@test.com' })
    expect(typeof token).toBe('string')

  })

  it('Actions: checkAuthentication - NEGATIVA', async () => {

    const store = createVuexStore({
      status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    })

    localStorage.removeItem('idToken')
    const checkResp1 = await store.dispatch('auth/checkAuthentication')

    expect(checkResp1).toEqual({ ok: false, message: 'No hay token' })
    expect(store.state.auth.status).toBe('not-authenticated')

    localStorage.setItem('idToken', 'xyz123456')
    const checkResp2 = await store.dispatch('auth/checkAuthentication')

    expect(checkResp2).toEqual({ ok: false, message: 'INVALID_ID_TOKEN' })
    expect(store.state.auth.status).toBe('not-authenticated')

  })

})