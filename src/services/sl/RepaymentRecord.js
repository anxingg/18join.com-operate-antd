/**
 * Created by fcb on 2017/7/25.
 */
import {request} from '../../utils';
import {PAGE_SIZE,PAGE} from '../../constants'

export function querylistnamemap({name}) {
  return request (`/api/operate/merchantinfo/querylistnamemap?format=json&name=${name}&businesstype=2`,{
    method:'post',
    credentials:'include',
    mode:'cors'
  })
}

export function queryNotpayback({joinidstr}){
  return request (`/api/operate/queryNotpayback?format=json&joinidstr=${joinidstr}`,{
    method:'get',
    credentials:'include',
    mode:'cors'
  })
}

export function rechargeDiffAccountBalance(data){
  return request (`/api/operate/rechargeDiffAccountBalance?format=json&refundAmount=${data.refundAmount}&mhtno_from=${data.mhtno_from}`,{
    method:'get',
    credentials:'include',
    mode:'cors'
  })
}

export function queryAccountBalanceByMhtnoAndType({mhtno}){
  return request(`/api/operate/queryAccountBalanceByMhtnoAndType?format=json&mhtno=${mhtno}&businesstype=2`,{
    method:'get',
    credentials:'include',
    mode:'cors'
  })
}
