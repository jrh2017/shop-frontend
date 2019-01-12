import Vue from 'vue'
import Router from 'vue-router'

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
    }]
})
