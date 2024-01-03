import { useStore } from 'vuex'

const useAuth = () => {
  const store = useStore()
  const createUser = async (user) => {
    return await store.dispatch('auth/createUser', user)
  }
  const loginUser = async (user) => {
    return await store.dispatch('auth/signInUser', user)
  }
  const checkAuthStatus = async() => {
    return await store.dispatch('auth/checkAuthentication')
  }

  return {
    createUser,
    loginUser,
    checkAuthStatus,
  }
}

export default useAuth