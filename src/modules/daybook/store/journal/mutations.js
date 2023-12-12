// export const myMutation = (state) => {
//
// }

import state from "@/modules/daybook/store/journal/state";
import entry from "@/modules/daybook/components/Entry.vue";

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