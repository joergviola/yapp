
import api from '@/api.js'
import Vue from "vue";

export default {
    refreshUsed() {
        console.log("TASK REFRESH ", this.id, this.project_id.id)
        api.list('action', 'task_id='+this.id).then(actions => {
            this.used = actions.reduce((used, action) => used + action.duration(), 0)
            this.refreshProject()
            api.update('task', this)
        })
    },
    refreshProject() {
      if (!this.project_id.id) {
        Vue.swal( "Project not available for update", 'Include project with task loading...', 'error')
        return
      }
      api.list('task', 'project_id='+this.project_id.id).then(tasks => {
        this.project_id.used = tasks.reduce((used, task) => used + task.used, 0)
        this.project_id.planned = tasks.reduce((planned, task) => planned + task.planned, 0)
        api.update('project', this.project_id)
      })
    },
    progress() {
        if (!this.planned || !this.used) return 0
        if (this.used > this.planned) return 100
        if (this.used < 0 ) return 0
        return Math.round(100*this.used/this.planned)
    }
}
