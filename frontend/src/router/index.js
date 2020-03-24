import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { login } from '../plugins/login.js'
import { Loading } from 'quasar'
import EventBus from '../plugins/events'

Vue.use(VueRouter)

const Router = new VueRouter({
    /*
    * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
    *
    * If you decide to go with "history" mode, please also set "build.publicPath"
    * to something other than an empty string.
    * Example: '/' instead of ''
    */
    // Leave as is and change from quasar.conf.js instead!

    // mode: process.env.VUE_ROUTER_MODE,
    // base: process.env.VUE_ROUTER_BASE,
    // scrollBehavior: () => ({ y: 0 }),
    routes
})

Router.afterEach((to, from) => {
    Loading.hide()
})

Router.beforeEach((to, from, next) => {
    if ((!to.meta.auth) || (login.storage.getters.getUsuarioAutenticado)) {
        EventBus.$emit('carregarAcoes', { hidden: true })
        Loading.show()
        next()
    } else {
        next({ path: '/login' })
    }
})

export default Router
