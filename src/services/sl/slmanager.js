import { request } from '../../utils'

export function intiplatUname (params) {
  return request('/api/operate/platformuser/queryplatformUname?format=json', {
    method: 'post',
    credentials: 'include',
    mode: 'cors',
  })
}

export function querylistnamemap (params) {
  return request(`/api/operate/merchantinfo/querylistnamemap?format=json&name=${params}&businesstype=2`, {    //businesstype:2	 垫付传1  供应链贷传2 全部传0
    method: 'post',
    credentials: 'include',
    mode: 'cors',
  })
}

export function queryalltbsltaskrunresulttoday ({statDate,merchantUserId,enableFlag,platformName}) {
  return request(`/api/tattaskRunresult/operate/queryalltbsltaskrunresulttoday?format=json&statDate=${statDate}&platformName=${platformName}&merchantUserId=${merchantUserId}&enableFlag=${enableFlag}&page=1&size=15`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function catchData (platformUserId) {
  return request(`/api/operate/catchData/runPlatformUser?format=json&refreshOnly=false&platformUserId=${platformUserId}`, {
    method: 'post',
    credentials: 'include',
    mode: 'cors',
  })
}

export function cookieSave (data) {
  return request(`/api/operate/cookie/cookieSave?format=json`, {
    method: 'post',
    credentials: 'include',
    mode: 'cors',
    body:data
  })
}

