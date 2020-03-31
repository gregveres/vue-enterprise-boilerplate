import axios from 'axios'
import { ActionContext } from "vuex";

// ===
// Interfaces
// ===

export interface user {
  id: number;
  username: string;
  name: string;
  token: string;
}
export interface authState{
  currentUser: user;
}
export interface loginInfo {
  username: string;
  password: string;
}

// ===
// Module components
// ===

export const state: authState = {
  currentUser: getSavedState('auth.currentUser'),
}

export const mutations = {
  SET_CURRENT_USER(state: authState, newValue: user) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
    setDefaultAuthHeaders(state)
  },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state: authState) {
    return !!state.currentUser
  },
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }: ActionContext<authState, unknown>) {
    setDefaultAuthHeaders(state)
    dispatch('validate')
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }: ActionContext<authState, unknown>, login: loginInfo | null = null) {
    if (getters.loggedIn || login == null) return dispatch('validate')

    return axios
      .post('/api/session', { username: login.username, password: login.password })
      .then((response) => {
        const user = response.data
        commit('SET_CURRENT_USER', user)
        return user
      })
  },

  // Logs out the current user.
  logOut({ commit }: ActionContext<authState, unknown>) {
    commit('SET_CURRENT_USER', null)
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }: ActionContext<authState, unknown>) {
    if (!state.currentUser) return Promise.resolve(null)

    return axios
      .get('/api/session')
      .then((response) => {
        const user = response.data
        commit('SET_CURRENT_USER', user)
        return user
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          commit('SET_CURRENT_USER', null)
        } else {
          console.warn(error)
        }
        return null
      })
  },
}

export const store = {
  state,
  mutations,
  getters,
  actions
};

// ===
// Private helpers
// ===

function getSavedState(key: string) {
  let obj = window.localStorage.getItem(key);
  if (obj == null) return null;
  return JSON.parse(obj);
}

function saveState(key: string, state: user): void {
  window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders(state:authState): void {
  axios.defaults.headers.common.Authorization = state.currentUser
    ? state.currentUser.token
    : ''
}
