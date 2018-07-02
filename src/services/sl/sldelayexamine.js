/**
 * Created by fcb on 2017/8/18.
 */
import {request} from '../../utils'

export function queryRenewedInfo (data){
  return request(`/api/operate/queryRenewedInfo?format=json&id=${data.id}&joinid=${data.joinid}`,{
    method:'get',
    credentials:'include',
    mode:'cors'
  })
}

export function queryReNewedByID (data){
  return request(`/api/operate/queryReNewedByID?format=json&idOfcredit=${data.id}`,{
    method:'get',
    credentials:'include',
    mode:'cors'
  })
}

export function agreeRenewed (data){
  return request (`/api/operate/agreeRenewed?format=json`,{
    headers: {
      "X-Requested-With":"XMLHttpRequest",
      'Content-Type':'application/json'
    },
    method: 'post',
    credentials: 'include',
    mode: 'cors',
    body:JSON.stringify(data)
  })
}

export function refuseRenewed (data){
  return request(`/api/operate/refuseRenewed?format=json&id=${data.id}&rowUpdateTime=${data.rowUpdateTime}&memo=${data.memo}`,{
    method:'post',
    credentials:'include',
    mode:'cors'
  })
}
