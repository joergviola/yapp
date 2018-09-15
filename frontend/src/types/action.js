
import api from '@/api.js'

export default {
    duration() {
        if (!this.to || !this.from) return 0
        const ms = new Date(this.to).getTime() - new Date(this.from).getTime()
        if (ms<=0) return 0
        return ms/1000
    }
}
