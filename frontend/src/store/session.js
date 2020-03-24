import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Auth from './modules/auth.js'

Vue.use(Vuex)

const sessao = new Vuex.Store({
    modules: {
        auth: Auth
    },

    namespaced: true,

    state: {

    },

    getters: {

    },

    mutations: {

    },

    actions: {

    },

    plugins: [
        createPersistedState({
            key: 'app_proposta',

            storage: window.sessionStorage
        })
    ]
})

sessao.install = (Vue, options) => {
    Object.defineProperties(Vue.prototype, {
        $sessionStore: {
            get() {
                return sessao
            }
        }
    })
}

export default sessao
