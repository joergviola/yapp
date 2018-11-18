
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

function mixinAndOld(type, item) {
    const o = types[type];
    if (o) {
        Object.assign(item, o)
    }
    item._old = Object.assign({}, item);
    return item
}

function handleError(response) {
    if (response.status==401) {
        Router.push("/login")
        return true
    }
    Vue.swal( response.statusText, 'Error', 'error')
    return false
}

let dehydrate = function (item) {
    const result = Object.assign({}, item);
    Object.keys(result).forEach(key => {
        if (result[key] && result[key].id) {
          result[key] = result[key].id
        }
    });
    delete result._old
    delete result.transient
    return result
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
            console.log("API STATUS", response.status, method, endpoint, body);
            //if (response.status==401) resolve(null);
            if (handleError(response)) resolve(null)
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

function trigger(item, event) {
  if (item[event]) item[event]()
}

export default {

    mixin: mixinAndOld,

    url: () => config.api + '/api/1.0',

    doc: (type, id, field, name) => config.api + '/api/1.0/' + type + '/' + id + '/' + field + '/' + name,

    list: (type, query, withs, orderBy) => perform(
      "GET",
      queryUrl(type, encodeURIComponent(query), withs, orderBy),
      null,
      result => result.map(item => mixinAndOld(type, item))),

    create: (type, item) => perform("POST", '/'+type, dehydrate(item), result => mixinAndOld(type, result)),

    read: (type, id, withs) => {
      let url = '/' + type + '/' + id
      if (withs) {
        url += '?with=' + withs
      }
      return perform("GET", url, null, result => mixinAndOld(type, result))
    },

    update: (type, item) => perform("PUT", '/'+type, dehydrate(item), result => {
      trigger(item, 'afterUpdate')
      return mixinAndOld(type, result)
    }),

    delete: (type, id) => perform("DELETE", '/'+type + '/' + id),

    user : () => perform("GET", "/login", null, result => mixinAndOld('user', result)),

    login :  (username, password) => perform("POST", "/login", {username: username, password: password}, result => mixinAndOld('user', result)),

    logout :  () => perform("POST", '/logout'),

}