import Vue from 'vue';
import VueRouter from 'vue-router';
import TABSPAGE from '@/views/component/TabsPage.vue';
import PROFILE from '@/views/module/PROFILE.vue';
import DASHBOARD from '@/views/module/DASHBOARD.vue';
import VOTING from '@/views/module/VOTING.vue';
import TEST from '@/views/module/TEST.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/TABSPAGE'
    },
    {
        path: '/TABSPAGE',
        name: '/TABSPAGE',
        component: TABSPAGE,
        children: [
            {
                path: '',
                redirect: { name: 'DASHBOARD' }
            },
            {
                path: 'PROFILE',
                name: 'PROFILE',
                component: PROFILE,
            },
            {
                path: 'VOTING',
                name: 'VOTING',
                component: VOTING,
            },
            {
                path: 'DASHBOARD',
                name: 'DASHBOARD',
                component: DASHBOARD,
            },
        ]
    },
    {
        path: '/TEST',
        name: '/TEST',
        component: TEST,
    },

];

const router = new VueRouter({
    routes,
});

export default router;
