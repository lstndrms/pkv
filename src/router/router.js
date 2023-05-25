import AuthPage from '@/pages/AuthPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import RecoverPage from '@/pages/RecoverPage';
//import TestDates from "@/pages/TestDates.vue";
import SetPassword from '@/pages/SetPassword.vue'
import UserPanel from '@/pages/UserPanel.vue'
import NotificationPage from '@/pages/NotificationPage.vue'
import TestPanel from '@/pages/TestPanel.vue'
import ProfileDataPage from "@/pages/ProfileDataPage.vue";
import ProfileResultsPage from "@/pages/ProfileResultsPage.vue";
import { createRouter, createWebHistory} from 'vue-router';
import UserList from "@/pages/UserList.vue";
const routes = [
    {
        path: '/',
        redirect: '/profile',
        meta: {
            title: 'Профиль',
        }
    },
    {
        path: '/login',
        component: AuthPage,
        meta: {
            title: 'Войти',
        }
    },
    {
        path: '/register',
        component: RegisterPage,
        meta: {
            title: 'Зарегистрироваться',
        }
    },
    {
        path: '/notification',
        component: NotificationPage,
        meta: {
            title: 'Создать рассылку',
        }
    },
    {
        path: '/profile',
        component: ProfilePage,
        meta: {
            title: 'Профиль',
        }
    },
    {
        path: '/password_recover',
        component: RecoverPage,
        meta: {
            title: 'Восстановить пароль',
        }
    },
    {
        path: '/profile/data',
        component: ProfileDataPage,
        meta: {
            title: 'Профиль - персональные данные',
        }
    },
    {
        path: '/profile/results',
        component: ProfileResultsPage,
        meta: {
            title: 'Профиль - тестирования и результаты',
        }
    },
    {
        path: '/profile/users',
        component: UserList,
        meta: {
            title: 'Пользователи',
        }
    },
    {
        path: '/setPassword/:token',
        component: SetPassword,
        meta: {
            title: 'Восстановить пароль',
        }
    },
    {
        path: '/profile/users/:id',
        component: UserPanel,
        meta: {
            title: 'Пользователи',
        }
    },
    {
        path: '/tds',
        component: ProfileResultsPage,
        meta: {
            title: 'Тестирования',
        }
    },
    {
        path: '/tds/:id',
        component: TestPanel,
        meta: {
            title: 'Тестирования',
        }
    },
    { 
        path: '/:pathMatch(.*)*',
        redirect: '/profile'
    },
  // if you omit the last `*`, the `/` character in params will be encoded when resolving or pushing
    { 
        path: '/:pathMatch(.*)',
        redirect: '/profile'
    },
    
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
})

export default router;