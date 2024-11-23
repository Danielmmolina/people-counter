import { createRouter, createWebHistory } from "vue-router";

import Counter from '../components/Counter.vue'

const routes = [
    { path: '/', component: Counter },
    { path: '/:pathMatch(.*)*', component: Counter},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;