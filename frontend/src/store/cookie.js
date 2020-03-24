import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const cookie = new Vuex.Store({
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

            getState: (key) => {
                Cookies.getJSON(key)
            },

            setState: (key, state) => {
                Cookies.set(key, JSON.stringify(state), {
                    expires: 3,
                    secure: false
                })
            }
        })
    ]
})

cookie.install = (Vue, options) => {
    Object.defineProperties(Vue.prototype, {
        $cookie: {
            get() {
                return cookie
            }
        }
    })
}

export default cookie
