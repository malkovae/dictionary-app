import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import FavoritesWords from '../views/FavoritesWords.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesWords,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
