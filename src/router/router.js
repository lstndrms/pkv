import AuthPage from '@/pages/AuthPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import ProfileDataPage from '@/pages/ProfileDataPage.vue';
import ProfileResultsPage from '@/pages/ProfileResultsPage.vue';
import RecoverPage from '@/pages/RecoverPage';
import { createRouter, createWebHistory} from 'vue-router';
import TestDates from "@/pages/TestDates.vue";
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
        path: '/profile/data',
        component: ProfileDataPage
    },
    {
        path: '/profile/results',
        component: ProfileResultsPage
    },
    {
        path: '/tds',
        component: TestDates,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;