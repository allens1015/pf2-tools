import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/spells',
    name: 'SpellsInterface',
    component: () => import('../views/SpellsInterface.vue')
  },
  {
    path: '/items',
    name: 'ItemsInterface',
    component: () => import('../views/ItemsInterface.vue')
  },
  {
    path: '/monsterchanger',
    name: 'monsterchanger',
    component: () => import('../views/MonsterChanger.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
