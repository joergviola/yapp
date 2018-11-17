import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import BootstrapVue from 'bootstrap-vue'
import filters from './filters'
import router from './router'

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);

Vue.config.productionTip = false

import ModuleLibrary from '@coreui/vue';
import api from "./api";

// Install this library
Vue.use(ModuleLibrary);

import uploader from 'v-uploader';

const uploaderConfig = {
    // file uploader service url
    uploadFileUrl: 'http://xxx/upload/publicFileUpload',
    // file delete service url
    deleteFileUrl: 'http://xxx/upload/deleteUploadFile',
    // set the way to show upload message(upload fail message)
    showMessage: (vue, message) => {
        //using v-dialogs to show message
        vue.$vDialog.alert(message, null, {messageType: 'error'});
    }
};

// install plugin with options
Vue.use(uploader, {});




window.STATE = {}

api.user().then(user => {
  STATE.user = user
  console.log('USER:', STATE.user)

  new Vue({
    router: router(),
    render: h => h(App)
  }).$mount('#app')
})