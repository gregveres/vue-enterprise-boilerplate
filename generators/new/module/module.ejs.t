---
to: src/state/modules/<%= h.changeCase.kebab(name) %>.ts
---
import { ActionContext } from "vuex"; // used for {commit, state} arguments on actions

// ===
// Interfaces
// ===
export interface <%= name %>State {}

// ===
// Module components
// ===
export const state: <%= name %>State = {}

export const getters = {}

export const mutations = {}

export const actions = {}

// ===
// exported store
// ===
export const store = {
  state,
  mutations,
  getters,
  actions
};
