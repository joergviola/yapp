import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import nav from '@/nav.js'

Vue.use(Router)

function mapRoutes(nav) {
  if (!nav) return null;
  return nav.map(n => ({
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
    }
  ]
})
