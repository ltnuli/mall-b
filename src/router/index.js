import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import Register from '../views/layout/Register.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
},
{
  path: '/login',
  name: 'Login',
  component: Login,
},
{
  path: '/register',
  name: 'Register',
  component: Register,
},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (from.path === '/login' && to.path === '/register') {
    return next();
  }
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
