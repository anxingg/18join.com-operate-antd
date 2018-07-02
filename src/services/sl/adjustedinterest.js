/**
 * Created by fcb on 2017/7/31.
 */
import { request } from '../../utils';

export function querylistnamemap ({name}) {
  return request(`/api/operate/merchantinfo/querylistnamemap?format=json&name=${name}&businesstype=2`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function queryplatformUname () {
  return request(`/api/operate/platformuser/queryplatformUname?format=json`, {
    method: 'post',
    credentials: 'include',
    mode: 'cors',
  })
}

export function queryFloat (data) {
  return request(`/api/operate/queryFloat?format=json&platformName=${data.platformName}&userIdOfJoinOfDebtor=${data.userIdOfJoinOfDebtor}&code=${data.code}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function addFloatVo (value) {
  return request(`/api/operate/addFloatVo?format=json`, {
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
