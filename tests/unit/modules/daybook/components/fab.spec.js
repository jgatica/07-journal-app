import {shallowMount} from "@vue/test-utils";
import Fab from "@/modules/daybook/components/Fab.vue";

describe('Pruebas a Fab Componente', () => {

  it('debe mostrar el icono por defecto ', () => {
    const wrapper = shallowMount(Fab)
    const iTag = wrapper.find('i')

    expect(iTag.classes('fa-plus')).toBe(true)
  })

});