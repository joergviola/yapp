import Dashboard from '@/views/Dashboard'
import User from '@/views/User'
import Companies from '@/views/company/List'
import Company from '@/views/company/Edit'
import Projects from '@/views/project/List'
import Project from '@/views/project/Edit'
import Leads from '@/views/lead/List'
import Lead from '@/views/lead/Edit'
import Task from '@/views/task/Edit'
import Actions from '@/views/action/List'

export default {
  items: [
    { name: 'Home', url: '/', icon: 'icon-home', nav: true, component: Dashboard },
    { name: 'User', url: '/users/user/:id', component: User },
    { name: 'Companies', url: '/companies', icon: 'icon-organization', nav: true, component: Companies },
    { name: 'Company', url: '/companies/company/:id', component: Company },
    { name: 'Leads', url: '/lead', icon: 'icon-like', nav: true, component: Leads },
    { name: 'Lead', url: '/lead/:id', component: Lead },
    { name: 'Projects', url: '/project', icon: 'icon-control-play', nav: true, component: Projects },
    { name: 'Project', url: '/project/:id', component: Project },
    { name: 'Task', url: '/project/:pid/task/:id', component: Task },
    { name: 'Actions', url: '/actions', component: Actions },
  ]
}
