import Login from './login.vue'
import { createComponentMocks, shallowMountView } from '@/tests/unit/VueHelpers'
import { Wrapper } from '@vue/test-utils'

function mockRouter(wrapper: Wrapper<Login>): jest.Mock<any, any> {
    const routerPush = jest.fn();
    wrapper.vm.$router = { push: routerPush } as any;
    wrapper.vm.$route = { query: {} } as any;
    return routerPush;
}
describe('@views/login', () => {
  it('is a valid view', () => {
    expect(Login).toBeAViewComponent()
  })

  it('redirects to home after successful login', () => {
    const wrapper = mountLogin()

    wrapper.vm.$data.username = 'correctUsername';
    wrapper.vm.$data.password = 'correctPassword';

    const routerPush = mockRouter(wrapper);

    expect.assertions(2)
    return (wrapper.vm as any).tryToLogIn().then(() => {
      expect(wrapper.vm.$data.authError).toEqual(null)
      expect(routerPush).toHaveBeenCalledWith({ name: 'home' })
    })
  })

  it('redirects to redirectFrom query, if it exists, after successful login', () => {
    const wrapper = mountLogin()

    wrapper.vm.$data.username = 'correctUsername';
    wrapper.vm.$data.password = 'correctPassword';

    const routerPush = mockRouter(wrapper);

    const redirectFrom = '/profile?someQuery';
    wrapper.vm.$route = ({ query: { redirectFrom } } as any);

    expect.assertions(2)
    return (wrapper.vm as any).tryToLogIn().then(() => {
      expect(wrapper.vm.$data.authError).toEqual(null)
      expect(routerPush).toHaveBeenCalledWith(redirectFrom)
    })
  })

  it('displays an error after failed login', () => {
    const wrapper = mountLogin()

    const routerPush = mockRouter(wrapper);

    expect.assertions(2)
    return (wrapper.vm as any).tryToLogIn().then(() => {
      expect(wrapper.vm.$data.authError).toBeTruthy()
      expect(wrapper.vm.$el.textContent).toContain('error')
    })
  })
})

function mountLogin():  Wrapper<Login> {
  return shallowMountView(Login, {
    ...createComponentMocks({
      store: {
        auth: {
          actions: {
            logIn(_: any, { username, password }: any) {
              if (
                username === 'correctUsername' &&
                password === 'correctPassword'
              ) {
                return Promise.resolve('testToken')
              } else {
                return Promise.reject(new Error('testError'))
              }
            },
          },
        },
      },
    }),
  })
}
