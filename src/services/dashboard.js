import { request } from '../utils'

export async function myCity (params) {
  return request('http://www.zuimeitianqi.com/zuimei/myCity', {
    method: 'get',
    cross: true,
    body: params
  })
}

export async function queryWeather (params) {
  return request('http://www.zuimeitianqi.com/zuimei/queryWeather', {
    method: 'get',
    cross: true,
    body: params
  })
}

export async function query (params) {
  return request('/api/dashboard', {
    method: 'get',
    body: params
  })
}


export  function todo (params) {
  return request('/api/bpm/task/todo?format=json',{
    credentials: 'include',//TODO:rm when product
      mode: 'cors',
  })
}

export  function done ({current}) {
  return request(`/api/bpm/task/done?format=json&page=${current}`,{
    credentials: 'include',//TODO:rm when product
    mode: 'cors',
  })
}
