import journalApi from "@/api/journalApi";
import entry from "@/modules/daybook/components/Entry.vue";
import data from "bootstrap/js/src/dom/data";

export const loadEntries = async ({commit}) => {
  const {data} = await journalApi.get('/entries.json')
  const entries = []
  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id]
    })
  }

  commit('setEntries', entries)
}

export const updateEntry = async ({ commit }, entry) => {

  const {date, picture, text} = entry
  const dataToSave = {date, picture, text}

  const resp = await journalApi.put(`/entries/${entry.id}.json`, dataToSave)
  console.log(resp)

  commit('updateEntry', {...entry})

}

export const createEntry = async({commit} , entry) => {

  entry.date = (new Date(entry.date)).toDateString()

  const {data} = await journalApi.post('/entries.json', entry)

  entry.id = data.name

  commit('addEntry', {...entry})

  return entry.id
}