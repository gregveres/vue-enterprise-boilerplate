import { mount, RouterLinkStub, Wrapper } from "@vue/test-utils";
import BaseLink from './_base-link.vue'

const mountBaseLink = (options = {}): Wrapper<BaseLink> => {
  return mount(BaseLink, {
    stubs: {
      RouterLink: RouterLinkStub
    },
    slots: {
      default: 'hello',
    },
    ...options
  });
}

describe('@components/_base-link', () => {
  const consoleWarnSpy = jest.spyOn(globalThis.console, 'warn').mockImplementation();
  let warning: string | undefined;
  beforeEach(() => {
    consoleWarnSpy.mockReset();
  })
  afterAll(() => {
    consoleWarnSpy.mockRestore();
  })

  it('exports a valid component', () => {
    expect(BaseLink).toBeAComponent()
  })

  it('warns about missing required props', () => {
    // Act
    mountBaseLink()
    // Assert
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy.mock.calls[0][0]).toMatch(/Invalid <BaseLink> props/)
  })

  it('warns about an invalid href', () => {
    // Act
    mountBaseLink({
      propsData: {
        href: '/some/local/path',
      },
    })
    // Assert
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy.mock.calls[0][0]).toMatch(/Invalid <BaseLink> href/)
  })

  it('warns about an insecure href', () => {
    // Act
    mountBaseLink({
      propsData: {
        href: 'http://google.com',
      },
    })
    // Assert
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy.mock.calls[0][0]).toMatch(/Insecure <BaseLink> href/)
  })

  it('renders an anchor element when passed an `href` prop', () => {
    // Arrange
    const externalUrl = 'https://google.com/'
    // Act
    const element = mountBaseLink({
      propsData: {
        href: externalUrl,
      },
    }).element as HTMLLinkElement;
    // Assert
    expect(consoleWarnSpy).not.toHaveBeenCalled()
    expect(element.tagName).toEqual('A')
    expect(element.href).toEqual(externalUrl)
    expect(element.target).toEqual('_blank')
    expect(element.textContent).toEqual('hello')
  })

  it('renders a RouterLink when passed a `name` prop', () => {
    // Arrange
    const routeName = 'home'
    // Act
    const wrapper = mountBaseLink({
      propsData: {
        name: routeName,
      },
    })
    // Assert
    expect(consoleWarnSpy).not.toHaveBeenCalled()

    const element = wrapper.find(RouterLinkStub);
    expect(element.props().to.name).toBe(routeName)

    // This is where using the composition API will be much better. We wont have to case the vm to any
    // and blindly call things
    const vm = wrapper.vm;
    expect((vm as any).routerLinkTo).toEqual({ name: routeName, params: {} })
  })

  it('renders a RouterLink when passed `name` and `params` props', () => {
    // Arrange
    const routeName = 'home'
    const routeParams = { foo: 'bar' }
    // Act
    const wrapper = mountBaseLink({
      propsData: {
        name: routeName,
        params: routeParams,
      },
    })
    // Assert
    expect(consoleWarnSpy).not.toHaveBeenCalled()

    const element = wrapper.find(RouterLinkStub);
    expect(element.props().to.name).toBe(routeName)
    expect(element.props().to.params).toBe(routeParams)

    const vm = wrapper.vm;
    expect((vm as any).routerLinkTo).toEqual({
      name: routeName,
      params: routeParams,
    })
  })

  it('renders a RouterLink when passed a `to` prop', () => {
    // Arrange
    const routeName = 'home'
    // Act
    const wrapper = mountBaseLink({
      propsData: {
        to: {
          name: routeName,
        },
      },
    })
    // Assert
    expect(consoleWarnSpy).not.toHaveBeenCalled()
    const element = wrapper.find(RouterLinkStub);
    expect(element.props().to.name).toBe(routeName)
    const vm = wrapper.vm;
    expect((vm as any).routerLinkTo).toEqual({ name: routeName, params: {} })
  })

  it('renders a RouterLink when passed a `to` prop with `params`', () => {
    // Arrange
    const routeName = 'home'
    const routeParams = { foo: 'bar' }
    // Act
    const wrapper = mountBaseLink({
      propsData: {
        to: {
          name: routeName,
          params: routeParams,
        },
      },
    })
    // Assert
    expect(consoleWarnSpy).not.toHaveBeenCalled()

    const element = wrapper.find(RouterLinkStub);
    expect(element.props().to.name).toBe(routeName)
    expect(element.props().to.params).toBe(routeParams)

    const vm = wrapper.vm;
    expect((vm as any).routerLinkTo).toEqual({
      name: routeName,
      params: routeParams,
    })
  })
})
