import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DefaultContainer from './containers/DefaultContainer'
import Login from './views/pages/Login.vue'
import nav from './nav.js'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

function mapRoutes(routes) {
  if (!routes) return null;
  return routes.map(n => ({
    path: n.url.substring(1),
    name: n.name,
    component: n.component,
    children: mapRoutes(n.children),
  }))
}


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: DefaultContainer,
      children: mapRoutes(nav.items)
    },
    {path: '/login', name: 'login',  component: Login}
  ]
})
