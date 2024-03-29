import {shallowMount} from "@vue/test-utils";
import Fab from "@/modules/daybook/components/Fab.vue";

describe('Pruebas a Fab Componente', () => {

  it('debe mostrar el icono por defecto ', () => {
    const wrapper = shallowMount(Fab)
    const iTag = wrapper.find('i')

    expect(iTag.classes('fa-plus')).toBe(true)
  })

  it('debe mostrar el icono por argumento: fa-circle', () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: 'fa-circle'
      }
    })
    const icono = wrapper.find('i')

    expect(icono.classes('fa-circle')).toBe(true)

  })

  it('debe emitir el evento on:click cuando se hace click ', () => {
    const wrapper = shallowMount(Fab)
    wrapper.find('button').trigger('click')

    expect(wrapper.emitted('on:click')).toHaveLength(1)

  })

});