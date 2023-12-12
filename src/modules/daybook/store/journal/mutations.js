// export const myMutation = (state) => {
//
// }


export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries]
  state.isLoading = false
}

export const updateEntry = (state, entry) => {

  const idx = state.entries.map(e => e.id).indexOf(entry.id)
  state.entries[idx] = entry

}

export const updateEntries = () => {

}

export const addEntry = (state, entry) => {
  // state.entries.unshift(entry)

  state.entries = [entry,...state.entries]
}

export const deleteEntry = async (state, entry) => {
  const idx = state.entries.map(e => e.id).indexOf(entry.id)

  if (idx !== -1) {
    state.entries.splice(idx, 1)
  }

}