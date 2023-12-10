// export const myMutation = (state) => {
//
// }

import state from "@/modules/daybook/store/journal/state";

export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries]
  state.isLoading = false
}

export const updateEntry = (state, entry) => {

  Object.keys(state.entries).forEach(key => {
    if (state.entries[key].id === entry.id) {
      state.entries[key].date = entry.date;
      state.entries[key].text = entry.text;
    }
  });

}

export const updateEntries = () => {

}

export const addEntry = () => {

}