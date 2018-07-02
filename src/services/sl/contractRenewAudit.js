/**
 * Created by fcb on 2017/8/15.
 */
import {request} from '../../utils'

export function listAll(){
  return request(`/api/renew/listAll?format=json`,{
    method:'get',
    credentials:'include',
    mode:'cors'
  })
}

export function audit(data){
  return request(`/api/renew/${data.id}/audit?format=json&id=${data.id}&expiredDate=${data.expiredDate}`,{
    method:'post',
    credentials:'include',
    mode:'cors'
  })
}

export function reject(data){
  return request(`/api/renew/${data.id}/reject?format=json`,{
    method:'post',
    credentials:'include',
    mode:'cors'
  })
}
