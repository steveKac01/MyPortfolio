import Vue from 'vue'
import VueRouter from 'vue-router'
import ProjetsCompo from '../views/ProjetsCompo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProjetsCompo
  },
  {
    path: '/project',
    name: 'project',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Project1.vue')
  },
  {
    path: '/#contact',
    name: 'contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/FooterPortfolio.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
