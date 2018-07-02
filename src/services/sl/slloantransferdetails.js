/**
 * Created by fcb on 2017/8/9.
 */
import {request} from '../../utils';

export function queryAccBaseTransDetail(data){
  return request(`/api/operate/queryAccBaseTransDetail?format=json&token=${data.token}&id=${data.id}`,{
    method:'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function updateForDealRedoWithStatus(data){
  return request(`/api/operate/updateForDealRedoWithStatus?format=json&orderid=${data.orderId}&trademsg=${data.tradeMsg!=undefined?data.tradeMsg:''}&finalstatus=3`,{
    method:'post',
    credentials: 'include',
    mode: 'cors',
  })
}

export function redo(data){
  return request(`/api/operate/redo?format=json&orderid=${data.orderId}`,{
    method:'post',
    credentials: 'include',
    mode: 'cors',
  })
}

export function updateForDealRedoWithStatus2(data){
  return request(`/api/operate/updateForDealRedoWithStatus?format=json&orderid=${data.orderId}&trademsg=${data.tradeMsg!=undefined?data.tradeMsg:''}&finalstatus=4`,{
    method:'post',
    credentials: 'include',
    mode: 'cors',
  })
}




