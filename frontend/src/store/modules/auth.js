
export default {
    state: {
        autenticado: false,
        usuario: {
            codigo: -1,
            login: '',
            nome: '',
            email: ''
        }
    },

    getters: {
        getCodigoUsuario: (state) => state.usuario.codigo,
        getUsuarioLogado: (state) => state.usuario,
        getUsuarioAutenticado: (state) => state.autenticado
    },

    mutations: {
        defineDadosUsuario({ usuario }, dadosUsuario){
            usuario.login = dadosUsuario.login
            usuario.nome = dadosUsuario.nome
            usuario.email = dadosUsuario.email
        },

        login(state, codigoUsuario){
            state.usuario.codigo = codigoUsuario
            state.autenticado = codigoUsuario > 0
        },

        logout({ usuario, autenticado }){
            usuario = {
                codigo: -1,
                nome: '',
                email: ''
            }
            autenticado = false
        }
    }
}
