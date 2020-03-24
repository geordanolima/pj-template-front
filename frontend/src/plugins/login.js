import Router from '../router/index.js'
import local from '../store/local.js'
import sessao from '../store/session.js'
import Acesso from '../services/DSAcesso.js'

class ClassLogin{
    constructor(){
        this.$defineStorage()
        this.acesso = new Acesso()
    }

    $defineStorage(){
        if (local.state.manterLogado){
            this.storage = local
        } else {
            this.storage = sessao
        }
    }

    usuarioLogado(){
        return this.storage.getters.getUsuarioLogado
    }

    login(login, senha){
        return new Promise((resolve, reject) => {
            this.acesso.validarUsuario(login, senha)
                .then(codigoUsuario => {
                    this.$defineStorage()
                    this.storage.commit('login', codigoUsuario)
                    if (codigoUsuario > 0) {
                        Promise.all([
                            this.acesso.obterDadosUsuario(codigoUsuario)
                        ])
                            .then(dadosUsuario => {
                                resolve(this.$alimentaDadosDoUsuario(login, ...dadosUsuario))
                            })
                            .catch(erro => {
                                alert(erro)
                                this.logout()
                                reject(erro)
                            })
                    } else {
                        reject(new Error())
                    }
                }).catch(erro => {
                    alert(erro)
                    this.logout()
                    reject(erro)
                })
        })
    }

    $alimentaDadosDoUsuario(login, dadosUsuario) {
        this.storage.commit('defineDadosUsuario', {
            login,
            nome: dadosUsuario.nome,
            email: dadosUsuario.email
        })
        return true
    }

    logout(){
        this.storage.commit('logout')
        Router.push('/login')
    }

    validarNivel(...nivel) {
        return () => {
            let permitido = false
            nivel.forEach(element => {
                permitido = permitido || (this.storage.getters[`getNivel${element}`] > 0)
            })
            return permitido
        }
    }
}

const login = new ClassLogin()

const Login = {
    install: (Vue, options) => {
        Object.defineProperties(Vue.prototype, {
            $login: {
                get() {
                    return login
                }
            }
        })
    }
}

export { login, Login }
