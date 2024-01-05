import { createStore } from 'vuex'

import auth from '@/modules/auth/store'
import journal from '@/modules/daybook/store/journal'

import { journalState } from './test-journal-state'

const createVuexStore = () =>
  createStore({
    modules: {
      auth,
      journal,
    }
  }) // Fin createVuexStore

export default createVuexStore