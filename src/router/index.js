import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/posters',
    name: 'posters',
    component: () => import(/* webpackChunkName: "about" */ '../views/Posters.vue'),
  },
  {
    path: '/folders',
    name: 'folders',
    component: () => import(/* webpackChunkName: "about" */ '../views/Folders.vue'),
  },
  {
    path: '/businesscards',
    name: 'businesscards',
    component: () => import(/* webpackChunkName: "about" */ '../views/Businesscards.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
