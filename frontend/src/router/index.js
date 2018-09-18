import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'
import Login from '@/views/pages/Login'

// Views
import nav from '@/nav.js'

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
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
      {
          path: '/',
          redirect: '/dashboard',
          name: 'Home',
          component: Full,
          children: mapRoutes(nav)
      },
      {
          path: '/login',
          name: 'Login',
          component: Login,
      }
  ]
})
