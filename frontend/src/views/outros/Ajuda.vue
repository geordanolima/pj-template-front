<template>
    <div class="c-lins-helper-container">
        <q-lins-helper :data-table="dataTable" />
    </div>
</template>

<script>
// import DataAjuda from '../../classes/DataAjuda'

export default {
    name: 'PgAjuda',

    // components: {
    //     DataAjuda
    // },

    data() {
        return {
            dataTable: []
        }
    },

    created() {
        this.$_carregarDados()
    },

    methods: {
        $_carregarDados() {
            let dados = []
            // let exibir
            // DataAjuda.forEach(row => {
            //     let header = {
            //         app: row.app,
            //         description: row.description,
            //         items: []
            //     }
            //     row.items.forEach(item => {
            //         exibir = true
            //     })
            //     if (header.items.length > 0) {
            //         dados.push(header)
            //     }
            // })
            this.dataTable = dados
        },
        $_possuiPermissao(permissao){
            // let usuario = this.$login.usuarioLogado()
        }
    }
}
</script>
