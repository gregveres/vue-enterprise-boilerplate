import NavBar from './nav-bar.vue'
import { shallowMount } from '@vue/test-utils'
import { createComponentMocks } from '@/tests/unit/VueHelpers'

// this really should come from the component, but I will leave that as an exercise for the
// reader since I expect most people will delete these components and use something like Vuetify
interface NavRoute {
  name: string;
  title: string;
}
describe('@components/nav-bar', () => {
  it(`displays the user's name in the profile link`, () => {
    const { vm } = shallowMount(
      NavBar,
      createComponentMocks({
        store: {
          auth: {
            state: {
              currentUser: {
                name: 'My Name',
              },
            },
            getters: {
              loggedIn: () => true,
            },
          },
        },
      })
    )

    const profileRoute = (vm as any).loggedInNavRoutes.find(
      (route: NavRoute) => route.name === 'profile'
    )
    expect(profileRoute.title()).toEqual('Logged in as My Name')
  })
})
