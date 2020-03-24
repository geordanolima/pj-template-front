<template>
    <q-layout
        class="c-layout"
        ref="layout"
        view="lHh Lpr fff"
    >
        <q-window-resize-observable @resize="$_onResize" />
        <q-layout-header>
            <q-toolbar
                color="primary"
                :inverted="$q.theme === 'ios'"
            >
                <q-btn
                    id="btnLayVoltar"
                    class="c-btn-voltar text-white no-padding"
                    dense
                    color="primary"
                    :big="isMobile"
                    icon="navigate_before"
                    round
                    v-show="!$route.meta.noBack"
                    flat
                    @click="$_voltar()"
                >
                    <q-tooltip
                        anchor="center right"
                        self="center left"
                        :delay="500"
                    >
                        Voltar
                    </q-tooltip>
                </q-btn>
                <q-btn
                    id="btnLayMenuLeft"
                    flat
                    dense
                    :size="isMobile ? 'xl' : 'lg'"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                    aria-label="Menu"
                >
                    <q-icon name="menu" />
                </q-btn>
                <q-toolbar-title v-html="titulo">
                    <div
                        slot="subtitle"
                        v-html="subtitulo"
                    />
                </q-toolbar-title>
                <q-btn
                    id="btnLayMenuRight"
                    flat
                    dense
                    v-show="!acoes.hidden && (acoes.itens.length > 0)"
                    :size="isMobile ? 'xl' : 'lg'"
                    @click="rightDrawerOpen = !rightDrawerOpen"
                    aria-label="Menu"
                >
                    <q-icon name="more_vert" />
                    <q-tooltip
                        anchor="center left"
                        self="center right"
                        :delay="500"
                    >
                        Ações
                    </q-tooltip>
                </q-btn>
            </q-toolbar>
        </q-layout-header>

        <q-layout-drawer
            class="c-menu-left"
            v-model="leftDrawerOpen"
            :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
        >
            <div class="c-menu-login-container row">
                <q-field class="c-menu-login-info">
                    <img
                        src="../assets/logo-pomp-min.png"
                        class="img-menu"
                    ><br>
                    <div class="c-label-user items-center">
                        <q-icon name="person" />
                        <span v-html="usuarioLogado.nome" />
                    </div>
                    <q-btn
                        id="btnLayMenuLogin"
                        class="c-btn-menu-login fixed-top"
                        :big="isMobile"
                        icon="more_vert"
                        flat
                    >
                        <q-popover
                            class="text-primary column"
                            ref="popSair"
                            anchor="bottom right"
                            self="top right"
                        >
                            <q-btn
                                id="btnLayTelaCheia"
                                :big="isMobile"
                                v-close-overlay
                                icon="fullscreen"
                                @click="$_fullscreen"
                            >
                                Tela cheia
                            </q-btn>
                            <q-btn
                                id="btnLaySair"
                                :big="isMobile"
                                v-close-overlay
                                icon="exit_to_app"
                                @click="$_logout"
                            >
                                Sair
                            </q-btn>
                        </q-popover>
                    </q-btn>
                </q-field>
            </div>
            <q-list
                no-border
                link
                inset-delimiter
            >
                <template v-for="item in rotas">
                    <q-item
                        :id="item.id"
                        v-if="!item.isHeader"
                        class="c-menu-left-side-link"
                        :key="item.name"
                        item
                        :to="item.path"
                    >
                        <q-item-side :icon="item.icone" />
                        <q-item-main :label="item.meta.titulo" />
                    </q-item>
                    <q-collapsible
                        :id="item.id"
                        v-else
                        :key="item.name"
                        :icon="item.icone"
                        :label="item.name"
                        opened
                    >
                        <q-item
                            :id="subitem.id"
                            v-for="subitem in item.children"
                            v-show="!subitem.hidden"
                            class="c-menu-left-side-link"
                            :key="subitem.name"
                            item
                            :to="subitem.path"
                        >
                            <q-item-side :icon="subitem.icone" />
                            <q-item-main :label="subitem.meta.titulo" />
                        </q-item>
                    </q-collapsible>
                </template>
            </q-list>
        </q-layout-drawer>

        <q-layout-drawer
            class="c-menu-rigth"
            side="right"
            v-model="rightDrawerOpen"
        >
            <q-list
                no-border
                link
                inset-delimiter
            >
                <q-item
                    :id="`acao${acoes.itens.indexOf(item)}`"
                    class="items-stretch"
                    :class="{
                        'font-mobile': isMobile,
                        'no-pointer-events': item.isHeader,
                        'c-acoes-header': item.isHeader,
                        'no-padding': item.isHeader
                    }"
                    v-for="item in acoes.itens"
                    :key="item.index"
                    v-show="!item.hidden"
                    link
                    @click.native="$_clickItemMenu(item)"
                >
                    <div
                        v-if="item.isHeader"
                        class="row col-12"
                    >
                        <p
                            class="quote font-mobile no-margin"
                            v-html="item.label"
                        />
                    </div>
                    <q-item-side
                        v-if="!item.isHeader"
                        :icon="item.icon"
                    />
                    <q-item-main
                        v-if="!item.isHeader"
                        :label="item.label"
                    />
                </q-item>
            </q-list>
        </q-layout-drawer>
        <div class="c-alert-container fixed-top-right z-top group">
            <transition
                v-for="alerta in alertas"
                :key="alertas.indexOf(alerta)"
                :ref="'alerta_' + alertas.indexOf(alerta)"
                :enter-active-class="alerta.enter"
                :leave-active-class="alerta.leave"
                appear
            >
                <q-alert
                    id="alertLayout"
                    v-if="alerta.visible"
                    :type="alerta.type"
                    appear
                    class="q-mb-sm"
                >
                    <span
                        id="btnAlertFechar"
                        v-html="alerta.html"
                        @click="$_fecharAlerta(alerta)"
                    />
                </q-alert>
            </transition>
        </div>
        <q-page-container>
            <router-view
                class="generic-margin"
                @alterarTituloLayout="$_alterarTituloLayout"
            />
            <q-page-sticky
                corner="bottom-right"
                :offset="[30, 60]"
            >
                <q-btn
                    id="btnGoTop"
                    color="primary"
                    round
                    :big="isMobile"
                    class="animate-pop"
                    v-back-to-top.animate="{offset: 500, duration: 200}"
                    icon="keyboard_arrow_up"
                />
            </q-page-sticky>
        </q-page-container>
    </q-layout>
</template>

<script>
import { AppFullscreen } from 'quasar'
export default {
    name: 'LayoutDefault',

    data () {
        return {
            leftDrawerOpen: this.$q.platform.is.desktop,
            rightDrawerOpen: true,
            titulo: '',
            subtitulo: '',
            showMenuRight: false,
            isMobile: false,
            acoes: {
                hidden: false,
                itens: []
            },
            menuSair: [
                {
                    hint: 'Sair',
                    icon: 'target',
                    click: this.$_logout
                }
            ],
            alertas: [],
            visible: true
        }
    },

    computed: {
        usuarioLogado(){
            return this.$login.usuarioLogado()
        },

        rotas() {
            return this.$router.options.routes[0].children.filter((item) => !item.hidden)
        }
    },

    watch: {
        '$route' (to, from) {
            this.$_alterarTituloLayout(to.meta.titulo, to.meta.descricao)
        }
    },

    mounted() {
        this.$_setIsMobile()
    },

    created () {
        this.$_onResize()
        this.$_alterarTituloLayout(this.$route.meta.titulo, this.$route.meta.descricao)
        this.$events.$on('carregarAcoes', this.carregarAcoes)
        this.$events.$on('alerta', this.$_mostraAlerta)
    },

    destroyed() {
        this.$events.$off('carregarAcoes', this.carregarAcoes)
        this.$events.$off('alerta', this.$_mostraAlerta)
        AppFullscreen.exit()
    },

    methods: {
        $_alterarTituloLayout(title, subtitle) {
            this.titulo = title
            this.subtitulo = subtitle
        },

        carregarAcoes(acoes) {
            this.acoes = acoes
            this.rightDrawerOpen = false
        },

        $_alterouEstabelecimento() {
            this.rightDrawerOpen = false
        },

        $_clickItemMenu(item) {
            item.to ? this.$router.push(item.to) : item.click()
        },

        $_fecharAlerta(alerta){
            alerta.visible = false
        },

        $_fullscreen(){
            AppFullscreen.toggle()
        },

        $_logout() {
            AppFullscreen.exit()
            this.$login.logout()
        },

        $_mostraAlerta(alerta){
            this.alertas.push(alerta)
            if (alerta.duration) {
                setTimeout(function(){
                    alerta.visible = false
                }, alerta.duration)
            }
        },

        $_onResize(size) {
            this.showMenuRight = (document.documentElement.clientWidth < 577)
            if (!this.showMenuRight) {
                this.rightDrawerOpen = false
            }
        },

        $_setIsMobile(){
            this.isMobile = this.$q.platform.is.mobile
        },

        $_voltar() {
            if (this.$route.meta['backTo']) {
                this.$router.push(this.$route.meta['backTo'])
            } else {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            }
        }
    }
}
</script>

<style lang="scss">
.c-layout {
    .c-alert-container {
        margin-top: 55px
    }

    .router-link-active{
        background-color: #FFE4B5;
        color: #808080;
    }

    .c-btn-voltar {
        margin: 0;
        min-height: 40px;
        height: 40px;
        width: 40px;
        min-width: 40px;
    }

    #c-title {
        padding-left: 5px;
    }
    .c-menu-login-container{
        background-size: 300px 150px;
        background-position: right bottom;
        background-repeat: no-repeat;
        height: 140px;
        background-blend-mode: screen;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);

        .c-menu-login-info{
            margin: 0;
            padding: 5px 5px 0 5px;
            height: 70px;

            .img-menu{
                margin: -25px 0 -30px 60px;
                width: 140px;
                height: 130px;
            }

            .c-label-user {
                span { font-size: 14px }
                .q-icon { font-size: 25px }
            }

            .c-btn-menu-login {
                left: 81%;
                height: 30px;
            }
        }
        .c-select-estabelecimento{
            height: 10px;
            margin: 25px 0 5px 0;
            padding: 0px 5px 0 5px;
        }
    }

    .c-menu-rigth{

        .c-item-right-menu {
            margin-left: 16px !important;
        }

        .quote {
            margin: 15px 0 5px 0;
        }
        .c-acoes-header {
            padding-left: 0;
        }
    }

    .font-mobile {
        font-size: 1.3rem !important;
    }
}

.lins-layout-page {
    padding: 10px 20px 20px 20px !important;
}

</style>
