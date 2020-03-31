import axios from 'axios'
import { ActionContext } from "vuex";
import { authState, user } from './auth';

// ===
// Interfaces
// ===

export interface userState {
  cached: user[];
}
// ===
// Module components
// ===

export const state: userState = {
  cached: [],
}

export const getters = {}

export const mutations = {
  CACHE_USER(state: userState, newUser: user) {
    state.cached.push(newUser)
  },
}

interface rootState {
  auth: authState;
}

export const actions = {
  fetchUser({ commit, state, rootState }: ActionContext<userState, unknown>, { username }: user) {
    // 1. Check if we already have the user as a current user.
    const { currentUser } = (rootState as rootState).auth;
    if (currentUser && currentUser.username === username) {
      return Promise.resolve(currentUser)
    }

    // 2. Check if we've already fetched and cached the user.
    const matchedUser = state.cached.find((user) => user.username === username)
    if (matchedUser) {
      return Promise.resolve(matchedUser)
    }

    // 3. Fetch the user from the API and cache it in case
    //    we need it again in the future.
    return axios.get(`/api/users/${username}`).then((response) => {
      const user = response.data
      commit('CACHE_USER', user)
      return user
    })
  },
}

export const store = {
  state,
  mutations,
  getters,
  actions
};
