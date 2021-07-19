import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/spells',
    name: 'Spells',
    component: () => import('../views/Spells.vue')
  },
  {
    path: '/items',
    name: 'Items',
    component: () => import('../views/Items.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
