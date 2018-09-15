
import api from '@/api.js'

export default {
    refreshUsed() {
        console.log("TASK REFRESH ", this.id)
        api.list('action', 'task_id='+this.id).then(actions => {
            this.used = actions.reduce((used, action) => used + action.duration(), 0)
        })
    }
}
