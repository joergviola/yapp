
import config from '@/config.js'
import types from '@/types'
import Vue from 'vue'
import Router from './router';

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

function mixin(type, item) {
    const o = types[type];
    if (o) {
        Object.assign(item, o)
    }
    return item
}

function handleError(err) {
    if (err.status==401) {
        Router.push("/login")
    }
    Vue.swal( err.statusText, err.body.message?err.body.message:err.body, 'error')
}

let dehydrate = function (item) {
    Object.keys(item).forEach(key => {
        if (item[key] && typeof item[key] === 'object') {
            item[key] = item[key].id
        }
    });
    delete item.transient
};

export default {

    mixin: mixin,

    list: (type, query, withs, orderBy) => new Promise(function(resolve, reject) {
        Vue.http.get(queryUrl(type, encodeURIComponent(query), withs, orderBy), {credentials: true})
            .then(response => {
                    const result = response.body
                    console.log('GET RESULT', result);
                    result.forEach(item => mixin(type, item))
                    resolve(result)
                },
                err => {
                    handleError(err)
                    reject(err)
                })
            }
        ),

    create: (type, item) => {
        dehydrate(item)
        console.log('CREATE', item)
        return Vue.http.post(config.api + '/api/1.0/'+type, item, {credentials: true})
    },

    read: (type, id, withs) => new Promise(function(resolve, reject) {
        let  url = config.api + '/api/1.0/'+type+'/' + id
        if (withs.length>0) {
            url += '?with=' + withs.map(w => w.field+':'+w.type).join(',')
        }
        Vue.http.get(url, {credentials: true})
            .then(response => {
                    resolve(mixin(type, response.body));
                },
                err => {
                    handleError(err)
                    reject(err)
                })
    }),

    update: (type, item) => {
        dehydrate(item)
        console.log('UPDATE', item)
        return Vue.http.put(config.api + '/api/1.0/'+type, item, {credentials: true})
    },

    delete: (type, id) => Vue.http.delete(config.api + '/api/1.0/'+type + '/' + id, {credentials: true}),

    login :  (username, password) => Vue.http.post(config.api + '/api/1.0/login', {
        username: username,
        password: password
    }, {credentials: true}),

    logout :  () => Vue.http.post(config.api + '/api/1.0/logout', {}, {credentials: true}),

}