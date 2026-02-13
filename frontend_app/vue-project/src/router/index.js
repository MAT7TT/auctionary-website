import { createRouter, createWebHistory } from 'vue-router';

import Home from "../views/pages/Home.vue"
import AuthPage from "../views/pages/AuthPage.vue"
import CreateItem from "../views/pages/CreateItem.vue"
import ItemView from "../views/pages/ItemView.vue"
import Profile from "../views/pages/Profile.vue"
import NotFound from "../views/pages/NotFound.vue"

const isAuthenticated = (to, from, next) => {
    const isLoggedIn = !!localStorage.getItem("session_token")
    if (isLoggedIn) {
        next()
    } else {
        next('/auth')
    }
}

const routes = [
    { path: "/", component: Home },
    { path: "/auth", component: AuthPage },
    { path: "/create", component: CreateItem, beforeEnter: isAuthenticated },
    { path: "/item/:id", component: ItemView },
    { path: "/profile", component: Profile, beforeEnter: isAuthenticated },
    { path: "/:pathMatch(.*)*", component: NotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;