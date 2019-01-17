import Vue from 'vue'
import Router from 'vue-router'
// import Main from '@/pages/Main.vue'
import Table from '@/pages/nav1/Table.vue'
import Form from '@/pages/nav1/Form.vue'
import user from '@/pages/nav1/user.vue'
import Page4 from '@/pages/nav2/Page4.vue'
import Page5 from '@/pages/nav2/Page5.vue'
import Page6 from '@/pages/nav3/Page6.vue'
// import echarts from '@/pages/charts/echarts.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: 'login'
    }, {
        path: '/pages/home',
        name: 'home',
        component: () => import('@/pages/home/home')
    }, {
        path: '/login',
        name: 'login',
        component: () => import('@/components/login')
    }],
    routes1: [
         {
        path: '/pages/home',
        name: '导航一',
        iconCls: 'ios-home', // 图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/pages/home/table', component: Table, name: '表格' },
            { path: '/pages/home/form', component: Form, name: '表单' },
            { path: '/pages/home/user', component: user, name: '列表' }
        ]
    }, {
        path: '/pages/home',
        name: '导航二',
        iconCls: 'ios-paw',
        children: [
            { path: '/pages/home/page4', component: Page4, name: '页面4' },
            { path: '/pages/home/page5', component: Page5, name: '页面5' }
        ]
    }, {
        path: '/pages/home',
        name: '',
        iconCls: 'social-freebsd-devil',
        leaf: true, // 只有一个节点
        children: [
            { path: '/pages/home/page6', component: Page6, name: '导航三' }
        ]
    }, {
        path: '/pages/home',
        name: '导航四',
        iconCls: 'stats-bars',
        children: [
            // { path: '/pages/home/echarts', component: echarts, name: 'echarts' }
        ]
    }
    ]
})
