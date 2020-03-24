import Layout from '../../layouts/Default'
import outros from './outros'

export default [
    {
        path: '/',
        component: Layout,
        hidden: true,
        meta: {
            auth: true,
            noBack: true
        },
        children: [
            {
                path: '/',
                hidden: true,
                component: () => import('../../views/index'),
                meta: {
                    hidden: true,
                    auth: true,
                    titulo: 'Página inicial',
                    descricao: 'Página inicial',
                    noBack: true
                }
            },
            outros
        ]
    },
    {
        path: '/login',
        name: 'Acesso',
        component: () => import('../../views/Login'),
        hidden: true,
        meta: {
            auth: false
        }
    },

    {
        path: '*',
        name: 'Página de erro',
        hidden: true,
        meta: {
            auth: false
        },
        component: () => import('../../views/404')
    }
    // Exemplo uso de rota sem collapsable
    // {
    //     path: '/',
    //     name: 'Home',
    //     redirect: '/home',
    //     hidden: false,
    //     icone: 'event note',
    //     component: () => import('layouts/default'),
    //     isHeader: false,
    //     meta: {
    //         auth: true,
    //         titulo: 'Home'
    //     },
    //     children: [
    //         {
    //             id: 'homePage',
    //             path: '/home',
    //             component: () => import('pages/home'),
    //             meta: {
    //                 auth: true,
    //                 titulo: 'Home Page',
    //                 descricao: 'Página inicial da aplicação',
    //                 noBack: true
    //             }
    //         }
    //     ]
    // }
]
