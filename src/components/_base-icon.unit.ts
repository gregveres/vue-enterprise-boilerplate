import { mount, shallowMount } from "@vue/test-utils";
import { createComponentMocks } from '@/tests/unit/VueHelpers';
import BaseIcon from './_base-icon.vue'

describe('@components/_base-icon', () => {
  it('renders a font-awesome icon', () => {
    const { element } = mount(BaseIcon, {
      propsData: {
        name: 'sync',
      },
    })

    expect(element.tagName).toEqual('svg')
    expect(element.classList).toContain('svg-inline--fa');
    expect(element.classList).toContain('fa-sync');
    expect(element.classList).toContain('fa-w-16');
  })

  it('renders a custom icon', () => {
    const { element } = shallowMount(BaseIcon, {
      ...createComponentMocks({
        style: {
          iconCustomSomeIcon: 'generated-class-name',
        },
      }),
      propsData: {
        source: 'custom',
        name: 'some-icon',
      },
    })

    expect(element.className).toEqual('generated-class-name')
  })
})
