import Vuex, { StoreOptions, Store } from "vuex";
import axios from "axios";
import { cloneDeep } from "lodash";
import { createLocalVue } from "@vue/test-utils";
import { authState } from "@state/modules/auth";
import { VueConstructor } from 'vue/types/umd';

export interface componentMocks {
  localVue: VueConstructor<Vue>;
  stubs?: any;
  mocks?: any;
  store?: Store<unknown>;
}

// A helper for creating Vue component mocks
export function createComponentMocks({ store, router, style, mocks, stubs }: any) {
  // Use a local version of Vue, to avoid polluting the global
  // Vue and thereby affecting other tests.
  // https://vue-test-utils.vuejs.org/api/#createlocalvue
  const localVue = createLocalVue();
  const returnOptions: componentMocks = { localVue };

  // https://vue-test-utils.vuejs.org/api/options.html#stubs
  returnOptions.stubs = stubs || {};
  // https://vue-test-utils.vuejs.org/api/options.html#mocks
  returnOptions.mocks = mocks || {};

  // Converts a `store` option shaped like:
  //
  // store: {
  //   someModuleName: {
  //     state: { ... },
  //     getters: { ... },
  //     actions: { ... },
  //   },
  //   anotherModuleName: {
  //     getters: { ... },
  //   },
  // },
  //
  // to a store instance, with each module namespaced by
  // default, just like in our app.
  if (store) {
    localVue.use(Vuex);
    returnOptions.store = new Vuex.Store({
      modules: Object.keys(store)
        .map((moduleName) => {
          const storeModule = store[moduleName];
          return {
            [moduleName]: {
              state: storeModule.state || {},
              getters: storeModule.getters || {},
              actions: storeModule.actions || {},
              namespaced:
                typeof storeModule.namespaced === 'undefined'
                  ? true
                  : storeModule.namespaced,
            },
          };
        })
        .reduce((moduleA, moduleB) => Object.assign({}, moduleA, moduleB), {}),
    });
  }

  // If using `router: true`, we'll automatically stub out
  // components from Vue Router.
  if (router) {
    returnOptions.stubs['router-link'] = true;
    returnOptions.stubs['router-view'] = true;
  }

  // If a `style` object is provided, mock some styles.
  if (style) {
    returnOptions.mocks.$style = style;
  }

  return returnOptions;
};

export function createModuleStore<T>(vuexModule: StoreOptions<T>, options: authState | null = null): Store<T> {
  createLocalVue().use(Vuex)
  const store = new Vuex.Store({
    ...cloneDeep(vuexModule),
    modules: {
      auth: {
        namespaced: true,
        state: {
          currentUser: options?.currentUser ?? null,
        },
      },
    },
    // Enable strict mode when testing Vuex modules so that
    // mutating state outside of a mutation results in a
    // failing test.
    // https://vuex.vuejs.org/guide/strict.html
    strict: true,
  })
  axios.defaults.headers.common.Authorization = options
    ? options.currentUser.token
    : ''
  if (vuexModule.actions?.init) {
    store.dispatch('init')
  }
  return store
}
