import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Auth',
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/blog',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/Blog.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name !== 'Auth' && !store.state.userInfo.isAuthenticated) next({path: '/login'})
  else next()
})

export default router
