import Layout from '../../layouts/Children'

export default {
    id: 'mapOutros',
    path: '/outros',
    name: 'Outros',
    component: Layout,
    isHeader: true,
    icone: 'lightbulb outline',
    meta: {
        auth: true
    },
    children: [
        {
            id: 'mnAjuda',
            path: '/outros/ajuda',
            name: 'Ajuda',
            icone: 'help',
            component: () => import('../../views/outros/Ajuda'),
            meta: {
                auth: true,
                titulo: 'Documentação',
                descricao: 'Questões comuns sobre os processos do sistema',
                noBack: true
            }
        },

        {
            id: 'mnProblemas',
            path: '/outros/problemas',
            name: 'Problemas Técnicos',
            icone: 'help',
            hidden: true,
            component: () => import('../../views/outros/Problemas'),
            meta: {
                auth: true,
                titulo: 'Problemas Técnicos',
                descricao: 'Resolução de problemas Técnicos',
                noBack: true
            }
        }
    ]
}
