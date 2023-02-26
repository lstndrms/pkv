import AuthPage from '@/pages/AuthPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import RecoverPage from '@/pages/RecoverPage';
//import TestDates from "@/pages/TestDates.vue";
import ProfileDataPage from "@/pages/ProfileDataPage.vue";
import ProfileResultsPage from "@/pages/ProfileResultsPage.vue";
import { createRouter, createWebHistory} from 'vue-router';
const routes = [
    {
        path: '/',
        redirect: '/profile'
    },
    {
        path: '/login',
        component: AuthPage
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/profile',
        component: ProfilePage
    },
    {
        path: '/password_recover',
        component: RecoverPage
    },
    {
        path: '/tds',
        component: ProfileResultsPage,
    },
    {
        path: '/profile/data',
        component: ProfileDataPage
    },
    {
        path: '/profile/results',
        component: ProfileResultsPage
    },
    {
        path: '/profile/users',
        component: ProfileResultsPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;