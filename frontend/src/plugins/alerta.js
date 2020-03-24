import EventBus from './events'

class ClassAlertas{
    error({ title = 'Erro!', message = 'Ocorreu um erro!', apiError = {}, duration = 0 }){
        this.$exibeErroConsole(apiError)
        let msg = message
        let erro = apiError.response
        if (erro) {
            if (erro.status) {
                msg += `<br>Código: ${erro.status} - ${erro.data.message}`
                if (erro.status !== 500) {
                    switch (erro.status) {
                    case 404:
                        msg += `<br>${erro.data.status ? erro.data.status : ''}`
                        break
                    case 400:
                        for (let prop in erro.data.data) {
                            if (erro.data.data.hasOwnProperty(prop)) {
                                if (prop !== 'general') {
                                    msg += `<br>- ${prop}: ${erro.data.data[prop]}`
                                } else {
                                    msg += `<br>- ${erro.data.data[prop]}`
                                }
                            }
                        }
                        break
                    default:
                        if (erro.data.data.status) {
                            msg += `<br>${erro.data.data.status}`
                        } else if (erro.data.data.general) {
                            msg += `<br>${erro.data.data.general[0]}`
                        }
                    }
                }
            } else {
                msg += `<br> ${apiError}`
            }
        } else if (JSON.stringify(apiError) !== '{}'){
            msg += `<br>${apiError.message === 'Network Error' ? 'Verifique a conexão com a internet!' : apiError}`
        }

        this.$mostraAlerta('negative', title, msg, duration)
    }

    warning({ title = 'Atenção!', message = 'Ocorreu um alerta!', duration = 0 }){
        this.$mostraAlerta('warning', title, message, duration)
    }

    success({ title = 'Sucesso!', message = 'Ocorreu um sucesso!', duration = 0 }){
        this.$mostraAlerta('positive', title, message, duration)
    }

    $exibeErroConsole(error){
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Erro:', error.message)
        }
        console.log(error.config)
    }

    $mostraAlerta(type, title, message, duration){
        EventBus.$emit('alerta', {
            type,
            enter: 'animated bounceInLeft',
            leave: 'animated bounceOutRight',
            html: ` <div>
                        <b>${title}</b>
                    </div>
                    <hr color="white">
                    <div>${message}</div>`,
            duration,
            visible: true
        })
    }
}

const alertas = new ClassAlertas()

const Alertas = {
    install: (Vue, options) => {
        Object.defineProperties(Vue.prototype, {
            $alerta: {
                get() {
                    return alertas
                }
            }
        })
    }
}

export default { alertas, Alertas }
