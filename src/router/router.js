import AuthPage from '@/pages/AuthPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
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
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;