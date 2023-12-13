import { shallowMount } from '@vue/test-utils'
import AboutView from "@/views/AboutView.vue";

describe('Pruebas sobre AboutView', () => {
  it('debe coincidir con snapshot', () => {
    const wrapper = shallowMount(AboutView)

    expect(wrapper.html()).toMatchSnapshot()
  });
})