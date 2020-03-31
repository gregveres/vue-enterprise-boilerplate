import NavBarRoutes from './nav-bar-routes.vue'
import { shallowMount } from '@vue/test-utils'

describe('@components/nav-bar-routes', () => {
  it('correctly renders routes with text titles', () => {
    const wrapper = shallowMount(NavBarRoutes, {
      propsData: {
        routes: [
          {
            name: 'aaa',
            title: 'bbb',
          },
        ],
      },
      stubs: ['router-link', 'BaseLink']
    })
    expect(wrapper.element.textContent).toEqual('bbb')
  })

  it('correctly renders routes with function titles', () => {
    const wrapper = shallowMount(NavBarRoutes, {
      propsData: {
        routes: [
          {
            name: 'aaa',
            title: () => 'bbb',
          },
        ],
      },
      stubs: ['router-link', 'BaseLink']
    });
    expect(wrapper.element.textContent).toEqual('bbb')
  })
})
