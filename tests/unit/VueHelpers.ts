import Vuex, { StoreOptions, Store } from "vuex";
import axios from "axios";
import { cloneDeep } from "lodash";
import { createLocalVue } from "@vue/test-utils";
import { authState } from "@state/modules/auth";
import {  } from 'jest';

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
