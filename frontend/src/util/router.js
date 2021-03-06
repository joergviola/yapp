import Vue from 'vue'
import Router from 'vue-router'
import DefaultContainer from '../containers/DefaultContainer'
import Login from '../views/pages/Login.vue'
import nav from '../nav.js'

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
