/**
 * Created by fcb on 2017/6/28.
 */
import { request } from '../../utils'
import {PAGE_SIZE,PAGE} from '../../constants'


export function initplatname ({name}) {
  return request(`/api/operate/merchantinfo/querylistnamemap?format=json&name=${name}&businesstype=2`, {
    method: 'post',
    credentials: 'include',
    mode: 'cors'
  })
}

export function queryplatformUname () {
  return request(`/api/operate/platformuser/queryplatformUname?format=json`, {
    method: 'post',
    credentials: 'include',
    mode: 'cors'
  })
}

export function queryplatformstatues () {
  return request(`/api/operate/platformuser/queryplatformstatues?format=json`, {
    method: 'post',
    credentials: 'include',
    mode: 'cors'
  })
}

export function queryplatformUser (value) {
  return request(`/api/operate/platformuser/queryplatformUser?format=json&page=${PAGE}&size=${PAGE_SIZE}&joinuserid=${value.joinuserid}&iscontactfinaceaccount=${value.iscontactfinaceaccount}&paltformStatues=${value.paltformStatues}&platform_name=${value.platform_name}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
    // body:value
  })
}

export function platformRule () {
  return request(`/api/operate/platformRule?format=json`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function slPlatformUserCredit (value) {
  return request(`/api/operate/slPlatformUserCredit?format=json`, {
    headers: {
      "X-Requested-With":"XMLHttpRequest",
      'Content-Type':'application/json'
    },
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    body:JSON.stringify(value)
  })
}

export function updatePlatformUserCreditCheckInfo (value) {
  return request(`/api/operate/updatePlatformUserCreditCheckInfo?format=json`, {
    headers: {
      "X-Requested-With":"XMLHttpRequest",
      'Content-Type':'application/json'
    },
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    body:JSON.stringify(value)
  })
}

export function queryFinaceaccount (value) {
  return request(`/api/operate/queryFinaceaccount?format=json&joinid=${value}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function addFinaceaccount(value){
  return request(`/api/operate/addFinaceaccount?format=json`,{
    headers: {
      "X-Requested-With":"XMLHttpRequest",
      'Content-Type':'application/json'
    },
    method:'post',
    credentials:'include',
    mode:'cors',
    body:JSON.stringify(value)
  })
}

export function bindFinaceaccount (value){
  return request (`/api/operate/bindFinaceaccount?format=json`,{
    headers: {
      "X-Requested-With":"XMLHttpRequest",
      'Content-Type':'application/json'
    },
    method:'post',
    credentials:'include',
    mode:'cors',
    body:JSON.stringify(value)
  })
}

export function updateplatformUser(value){
  return request(`/api/operate/platformuser/updateplatformUser?format=json`,{
    headers: {
      "X-Requested-With":"XMLHttpRequest",
      'Content-Type':'application/json'
    },
    method: 'post',
    credentials: 'include',
    mode: 'cors',
    body:value
  })
}
