import axios from "axios";

const journalApi = axios.create({
  baseURL: 'https://vue-demos-eff42-default-rtdb.firebaseio.com'
})

journalApi.interceptors.request.use((config) => {
  config.params = {
    auth: localStorage.getItem('idToken')
  }

  // config.headers = {
  //   Authorization: 'beared idToken'
  // }

  return config

})

export default journalApi