/**
 * Created by fcb on 2017/7/26.
 */
import {request} from '../../utils';

export async function preRefunds (data) {
  return request(`/api/operate/preRefund?format=json&amount=${data.amount}&joinidstr=${data.joinidstr}&refundDate=${data.refundDate}&isBefore3=${data.isBefore3}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export async function checkSameRefund (data) {
  return request(`/api/operate/checkSameRefund?format=json&amount=${data.amount}&joinidstr=${data.joinidstr}&refundDate=${data.refundDate}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}


export async function autoRefund (data) {
  return request(`/api/operate/autoRefund?format=json`, {
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
