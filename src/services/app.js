import { request } from '../utils'

const  transformRequest = (obj) => {
  var str = [];
  for(var p in obj)
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}

export  function login (params) {
  return request('/api/login', {
    headers: {
      "X-Requested-With":"XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: 'include',//TODO:rm when product
    mode: 'cors',
    method: 'POST',
    body: transformRequest(params)
  })
}

export  function logout (params) {
  return request('/api/logout', {
    headers: {
      "X-Requested-With":"XMLHttpRequest",
    },
    credentials: 'include',//TODO:rm when product
    mode: 'cors',
    method: 'POST',
    body: params
  })
}

export  function userMenu (params) {
  return request('/api/sys/menu/mblist?format=json', {
    method: 'GET',
    credentials: 'include',//TODO:rm when product
    mode: 'cors',
    body: params
  })
}

export  function userInfo (params) {
  return request('/api/initcfg?format=json', {
    credentials: 'include',//TODO:rm when product
    mode: 'cors',
    method: 'GET',
    body: params
  })
}
