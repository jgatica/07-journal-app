import journalApi from "@/api/journalApi";

export const loadEntries = async () => {
  const {data} = await journalApi.get('/entries.json')

  for (let id of Object.keys(data)) {
    console.log(id )
  }

}

export const updateEntries = async () => {

}