import {shallowMount} from "@vue/test-utils";
import Entry from "@/modules/daybook/components/Entry.vue";

describe('Pruebas componente Entry', () => {

  let wrapper

  const mockRouter = {
    push: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallowMount(Entry, {
      props: {
        entry: {
          date: 1802733088001,
          text: 'Ejemplo',
        }
      },
      global: {
        mocks: {
          $router: mockRouter,
        }
      }
    })
  })


  it('debe hacer match con SnapShot ', () => {

    expect(wrapper.html()).toMatchSnapshot()
  });
  
});