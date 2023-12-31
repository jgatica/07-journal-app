import axios from "axios";

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  params: {
    key:'AIzaSyBIK79kdSDaaLnY4Qhg0_WJsfcQMOxMa7g'
  }
})

export default authApi