import Vue from 'vue'
import Router from 'vue-router'
import Table from '@/pages/nav1/Table.vue'
import Form from '@/pages/nav1/Form.vue'
import user from '@/pages/nav1/user.vue'
import Page4 from '@/pages/nav2/Page4.vue'
import Page5 from '@/pages/nav2/Page5.vue'
import Page6 from '@/pages/nav3/Page6.vue'
import echarts from '@/pages/charts/echarts.vue'
import Patients from '@/pages/patients/patientsList.vue'
import PatientsDetail from '@/pages/patients/patientDetail.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: 'login',
        hidden: true
    }, {
        path: '/pages/home',
        component: () => import('@/pages/home/home'),
        name: '导航一',
        iconCls: 'ios-home', // 图标样式class
        children: [
            { path: '/pages/home/patients', component: Patients, name: '患者列表' },
            { path: '/pages/home/detail/:id', component: PatientsDetail, name: '患者详情', hidden: true},
            { path: '/pages/home/table', component: Table, name: '表格' },
            { path: '/pages/home/form', component: Form, name: '表单' },
            { path: '/pages/home/user', component: user, name: '列表' }
        ]
    }, {
        path: '/pages/home',
        name: '导航二',
        component: () => import('@/pages/home/home'),
        iconCls: 'ios-paw',
        children: [
            { path: '/pages/home/page4', component: Page4, name: '页面4' },
            { path: '/pages/home/page5', component: Page5, name: '页面5' }
        ]
    }, {
        path: '/pages/home',
        name: '',
        iconCls: 'ios-cog-outline',
        component: () => import('@/pages/home/home'),
        leaf: true, // 只有一个节点
        children: [
            { path: '/pages/home/page6', component: Page6, name: '导航三' }
        ]
    }, {
        path: '/pages/home',
        name: '导航四',
        iconCls: 'ios-chatboxes-outline',
        component: () => import('@/pages/home/home'),
        children: [
            { path: '/pages/home/echarts', component: echarts, name: 'echarts' }
        ]
    }, {
        path: '/login',
        name: 'login',
        component: () => import('@/components/login'),
        hidden: true
    }]
})
