import { Dialog } from 'quasar'

function confirmar(titulo = 'Confirmar', mensagem = '') {
    return new Promise(function (resolve, reject) {
        Dialog.create({
            title: titulo,
            message: mensagem,
            ok: {
                push: true,
                label: 'Confirmar'
            },
            cancel: {
                push: true,
                label: 'Cancelar',
                color: 'negative'
            }
        }).then(() => {
            resolve(true)
        }).catch(() => {
            resolve(false)
        })
    })
}

Plugin.install = (Vue, options) => {
    Object.defineProperties(Vue.prototype, {
        $confirm: {
            get() {
                return confirmar
            }
        }
    })
}

export default Plugin
