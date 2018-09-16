
import api from '@/api.js'

export default {
    refreshUsed() {
        console.log("TASK REFRESH ", this.id)
        api.list('action', 'task_id='+this.id).then(actions => {
            this.used = actions.reduce((used, action) => used + action.duration(), 0)
            api.update('task', this)
        })
    },
    progress() {
        if (!this.planned || !this.used) return 0
        if (this.used > this.planned) return 100
        if (this.used < 0 ) return 0
        return Math.round(100*this.used/this.planned)
    }
}
