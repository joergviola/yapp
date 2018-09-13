
import config from '@/config.js'
import Vue from 'vue'


function queryUrl(type, query, withs=null, orderBy=null) {
    let url = config.api + '/api/1.0/'+type
    let sep = '?'
    if (query) {
        url += sep + "q="+ query
        sep = '&'
    }
    if (withs) {
        url += sep + 'with=' + withs
        sep = '&'
    }
    if (orderBy) {
        url += sep + 'orderBy=' + orderBy
        sep = '&'
    }
    return url;
}

export default {

    list: (type, query, withs, orderBy) => new Promise(function(resolve, reject) {
        Vue.http.get(queryUrl(type, encodeURIComponent(query), withs, orderBy), {credentials: true})
            .then(response => {
                    console.log('GET RESULT', response.body);
                    resolve(response.body);
                },
                err => {
                    this.$swal( err.statusText, err.body.message?err.body.message:err.body, 'error')
                    reject(err)
                })
            }
        ),

    create: (type, item) => Vue.http.post(config.api + '/api/1.0/'+type, item, {credentials: true}),

    read: (type, id, withs) => {
        let  url = config.api + '/api/1.0/'+type+'/' + id
        if (withs.length>0) {
            url += '?with=' + withs.map(w => w.field+':'+w.type).join(',')
        }
        return Vue.http.get(url, {credentials: true})
    },

    update: (type, item) => Vue.http.put(config.api + '/api/1.0/'+type, item, {credentials: true}),

    delete: (type, id) => Vue.http.delete(config.api + '/api/1.0/'+type + '/' + id, {credentials: true}),

    login :  (username, password) => Vue.http.post(config.api + '/api/1.0/login', {
        username: username,
        password: password
    }, {credentials: true}),

    logout :  () => Vue.http.post(config.api + '/api/1.0/logout', {}, {credentials: true}),

}