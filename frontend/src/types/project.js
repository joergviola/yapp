
import api from '@/api.js'
import Vue from "vue";

export default {
    progress() {
        if (!this.planned || !this.used) return 0
        if (this.used > this.planned) return 100
        if (this.used < 0 ) return 0
        return Math.round(100*this.used/this.planned)
    }
}
