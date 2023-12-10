import journalApi from "@/api/journalApi";

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

export const updateEntries = async ({ commit }, entry) => {
  const {data} = await journalApi.put(`/entries/${entry.id}.json`, {
      date: entry.date,
      text: entry.text,
  })
}