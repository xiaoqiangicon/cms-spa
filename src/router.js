import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [
  {
    path: '',
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: () => import('./Home'),
        name: '首页',
      }
    ]
  },
  {
    path: '/404',
    component: () => import('./404'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes,
})
