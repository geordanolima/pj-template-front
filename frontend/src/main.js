import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import { quasarConfig, Quasar } from './plugins/quasar'
Vue.use(Quasar, quasarConfig)

import Alerta from './plugins/alerta'
Vue.use(Alerta)

import confirmar from './plugins/confirm'
Vue.use(confirmar)

import EventBus from './plugins/events'
Vue.prototype.$events = EventBus

import linsComponents from 'lins-components'
Vue.use(linsComponents)

import cookie from './store/cookie.js'
Vue.use(cookie)

import local from './store/local.js'
Vue.use(local)

import sessao from './store/session.js'
Vue.use(sessao)

import { Login } from './plugins/login'
Vue.use(Login)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
