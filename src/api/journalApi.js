import axios from "axios";

const journalApi = axios.create({
  baseURL: 'https://vue-demos-eff42-default-rtdb.firebaseio.com'
})

export default journalApi