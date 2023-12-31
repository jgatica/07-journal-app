import {createStore} from "vuex";
import journalModule from "@/modules/daybook/store/journal";
import authModule from '@/modules/auth/store'

const store = createStore({
  modules: {
    auth: authModule,
    journal: journalModule,
  }
})

export default store