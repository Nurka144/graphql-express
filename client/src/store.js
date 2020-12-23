
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState  from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    userInfo: {
        login: "",
        credentials: "",
        isAuthenticated: false
    }
}

const mutations = {
    login(state, data) {
        state.userInfo.login = data.login
        state.userInfo.credentials = data.token
        state.userInfo.isAuthenticated = true
    },
    logout(state) {
        state.userInfo.login = ""
        state.userInfo.credentials = ""
        state.userInfo.isAuthenticated = false
    }
}

export default new Vuex.Store({
    state,
    mutations,
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer: (data) => {
          if(!data.userInfo.isAuthenticated) {
            return {}
          }
          return data
        }
    })],
})