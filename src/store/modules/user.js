const user = {
  state: {
    permissions: [],
    code:[]
  },

  mutations: {
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_CODE: (state, data) => {
      state.code = data
    }
  },

  actions: {
    SET_PERMI({commit}, data) {
      return new Promise(resolve => {
        commit('SET_PERMISSIONS', data)
        resolve()
      })
    },
    SET_CODES({commit}, data) {
      return new Promise(resolve => {
        commit('SET_CODE', data)
        resolve()
      })
    },
  }
}

export default user
