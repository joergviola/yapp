import Dashboard from '@/views/Dashboard'
import Users from '@/views/Users'
import User from '@/views/User'
import Companies from '@/views/company/List'
import Company from '@/views/company/Edit'
import Projects from '@/views/project/List'
import Project from '@/views/project/Edit'
import Leads from '@/views/lead/List'
import Lead from '@/views/lead/Edit'
import Task from '@/views/task/Edit'


export default [
    { name: 'My Tasks', url: '/dashboard', icon: 'icon-home', component: Dashboard },
//    { name: 'Users', url: '/users', icon: 'icon-user', component: Users },
    { name: 'User', url: '/users/user/:id', component: User },
    { name: 'Companies', url: '/companies', icon: 'icon-organization', component: Companies },
    { name: 'Company', url: '/companies/company/:id', component: Company },
    { name: 'Leads', url: '/lead', icon: 'icon-like', component: Leads },
    { name: 'Lead', url: '/lead/:id', component: Lead },
    { name: 'Projects', url: '/project', icon: 'icon-control-play', component: Projects },
    { name: 'Project', url: '/project/:id', component: Project },
    { name: 'Task', url: '/project/:pid/task/:id', component: Task },
    { name: 'Actions', url: '/Actions', component: () => import('@/views/action/List') },
  ]
