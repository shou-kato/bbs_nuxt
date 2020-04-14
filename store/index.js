export const state = () => ({
  user: ''
})
export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  logout(state, payload) {
    state.user = payload
  }
}
export const actions = {
  async setUser({ commit }, payload) {
    await commit('setUser', payload)
  },
  logout({ commit }) {
    commit('logout')
  }
}
export const getters = {
  isAuthenticated(state) {
    return !!state.user
  }
}
