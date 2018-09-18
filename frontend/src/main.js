// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import api from './api.js'

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(VueResource);

window.STATE = {}


api.user().then(user => {
    STATE.user = user
    console.log('USER:', STATE.user)
    /* eslint-disable no-new */
    new Vue({
        el: '#app',
        router,
        template: '<App/>',
        components: {
            App
        }
    })
})

