import axios from 'axios'

export default class {
    constructor(){
        this.axios = axios.create({
            baseURL: process.env.VUE_APP_API_DS_ACESSO_URL,
            timeout: 5000,
            auth: {
                username: process.env.VUE_APP_API_DS_ACESSO_USER,
                password: process.env.VUE_APP_API_DS_ACESSO_PASS
            }
        })
    }

    alterarSenha(codigoUsuario, senhaAtual, novaSenha){
        let axios = this.axios
        return new Promise(function(resolve, reject){
            axios.get('/AlterarSenha/' + codigoUsuario + '/' + senhaAtual + '/' + novaSenha
            ).then(response => {
                resolve({
                    mensagem: response.data.result[0],
                    retorno: response.data.result[1]
                })
            }).catch(error => {
                reject(error)
            })
        })
    }

    listarUsuarios(){
        let axios = this.axios
        return new Promise(function(resolve, reject){
            axios.get('/ListarUsuarios'
            ).then(response => {
                resolve(response.data.result)
            }).catch(error => {
                reject(error)
            })
        })
    }

    obterDadosUsuario(codigoUsuario){
        let axios = this.axios
        return new Promise(function(resolve, reject){
            axios.get('/ObterDadosUsuario/' + codigoUsuario
            ).then(response => {
                resolve({
                    nome: response.data.result[0],
                    email: response.data.result[1],
                    retorno: response.data.result[2]
                })
            }).catch(error => {
                reject(error)
            })
        })
    }

    obterEstabelecimentosDoUsuario(codigoUsuario){
        let axios = this.axios
        return Promise(function(resolve, reject){
            axios.get('/ObterEstabelecimentosDoUsuario/' + codigoUsuario
            ).then(response => {
                resolve(response.data.result)
            }).catch(error => {
                reject(error)
            })
        })
    }

    obterPermissao(codigoUsuario, permissao){
        let axios = this.axios
        return new Promise(function(resolve, reject){
            axios.get('/ObterPermissao/' + codigoUsuario + '/' + permissao
            ).then(response => {
                resolve(response.data.result[0])
            }).catch(error => {
                reject(error)
            })
        })
    }

    validarUsuario(login, senha) {
        return new Promise((resolve, reject) => {
            this.axios.get(`/ValidarUsuario/${login}/${senha}`)
                .then(response => {
                    resolve(response.data.result[0])
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}
