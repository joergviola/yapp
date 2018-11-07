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

function allowed(types) {
  let result = false;
  types.forEach(type => {
    if (window.STATE.user.allows(type,'R')) result=true;
  })
  return result;
}


export default () => ({
  items: [
    { name: 'Home', url: '/', icon: 'icon-home', nav: true, component: Dashboard, types:['task','action'] },
    { name: 'User', url: '/users/user/:id', component: User, types:['user'] },
    { name: 'Companies', url: '/companies', icon: 'icon-organization', nav: true, component: Companies, types:['company'] },
    { name: 'Company', url: '/companies/company/:id', component: Company, types:['company', 'user'] },
    { name: 'Leads', url: '/lead', icon: 'icon-like', nav: true, component: Leads, types:['project'] },
    { name: 'Lead', url: '/lead/:id', component: Lead, types:['project', 'task'] },
    { name: 'Projects', url: '/project', icon: 'icon-control-play', nav: true, component: Projects, types:['project'] },
    { name: 'Project', url: '/project/:id', component: Project, types:['project', 'task'] },
    { name: 'Task', url: '/project/:pid/task/:id', component: Task, types:['task','action'] },
    { name: 'Actions', url: '/actions', component: Actions, types:['action'] },
  ].filter(n => allowed(n.types))
})
