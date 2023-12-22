import {shallowMount} from "@vue/test-utils";
import {createStore} from "vuex";

import EntryList from "@/modules/daybook/components/EntryList.vue";

describe('Pruebas al componente EntryList', () => {

  const wrapper = shallowMount(EntryList, {
    global: {
      mocks: {
        // TODO: $router:
      },
      plugins: [store],
    },
  })

  it('debe llamar al getEntriesByTerm sin termino y mostrar 3 entradas ', () => {
    console.log(wrapper.html())
  });
});