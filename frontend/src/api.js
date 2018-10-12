
import config from '@/config.js'
import types from '@/types'
import Vue from 'vue'
import Router from './router';

function queryUrl(type, query, withs=null, orderBy=null) {
    let url = '/'+type
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

function handleError(response) {
    if (response.status==401) {
        Router.push("/login")
    }
    Vue.swal( response.statusText, 'Error', 'error')
}

let dehydrate = function (item) {
    Object.keys(item).forEach(key => {
        if (item[key] && item[key].id) {
            item[key] = item[key].id
        }
    });
    delete item.transient
    return item
};

function options(method, body=null) {
  const result = {
    method: method,
    mode: "cors",
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (body) result.body = JSON.stringify(body)
  return result;
}


function perform(method, endpoint, body=null, cb=null) {
  return new Promise(function(resolve, reject) {
    let  url = config.api + '/api/1.0' + endpoint
    fetch(url, options(method, body))
      .then(response => {
          if (response.status != 200) {
            console.log("API STATUS", method, endpoint, body, response.status);
            if (response.status==401) resolve(null);
            handleError(response)
            reject(response)
          } else {
            response.json().then(result => {
              if (cb) result = cb(result)
              console.log("API OK", method, endpoint, result);
              resolve(result)
            })
          }
        },
        err => {
          console.log("API ERROR", method, endpoint, err);
          handleError(err)
          reject(err)
        })
  })
}

export default {

    mixin: mixin,

    url: () => config.api,

    list: (type, query, withs, orderBy) => perform("GET", queryUrl(type, encodeURIComponent(query), withs, orderBy), null, result => result.map(item => mixin(type, item))),

    create: (type, item) => perform("POST", '/'+type, dehydrate(item), result => mixin(type, result)),

    read: (type, id, withs) => {
      let url = '/' + type + '/' + id
      if (withs) {
        url += '?with=' + withs
      }
      return perform("GET", url, null, result => mixin(type, result))
    },

    update: (type, item) => perform("PUT", '/'+type, dehydrate(item), result => mixin(type, result)),

    delete: (type, id) => perform("DELETE", '/'+type + '/' + id),

    user : () => perform("GET", "/login", null, result => mixin('user', result)),

    login :  (username, password) => perform("POST", "/login", {username: username, password: password}, result => mixin('user', result)),

    logout :  () => perform("POST", '/logout'),

}