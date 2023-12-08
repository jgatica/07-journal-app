import journalApi from "@/api/journalApi";

export const loadEntries = async () => {
  const {data} = await journalApi.get('/entries.json')
  const entries = []
  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id]
    })
  }

  console.log(entries)
}

export const updateEntries = async () => {

}