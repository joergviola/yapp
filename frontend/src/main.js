import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import BootstrapVue from 'bootstrap-vue'
import filters from './filters'

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);

Vue.config.productionTip = false

import ModuleLibrary from '@coreui/vue';
import api from "./api";

// Install this library
Vue.use(ModuleLibrary);

window.STATE = {}

api.user().then(user => {
  STATE.user = user
  console.log('USER:', STATE.user)

  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})