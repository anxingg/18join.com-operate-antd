/**
 * Created by fcb on 2017/5/17.
 */
import { request } from '../../utils'
import {PAGE_SIZE,PAGE} from '../../constants'
import RSAUtils from '../../utils/RSA'


export function queryNotpaybackByMhtno ({mhtno}) {
  return request(`/api/operate/queryNotpaybackByMhtno?format=json&mhtno=${mhtno}&page=${PAGE}&size=${PAGE_SIZE}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function querylistnamemap ({name}) {
  return request(`/api/operate/merchantinfo/querylistnamemap?format=json&name=${name}&businesstype=2`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function queryAccountBalanceByMhtnoAndType ({mhtno,acctype}) {
  return request(`/api/operate/queryAccountBalanceByMhtnoAndType?format=json&mhtno=${mhtno}&acctype=${acctype}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function calculatefeeByMhtno ({mhtno}) {
  return request(`/api/operate/calculatefeeByMhtno?format=json&mhtno=${mhtno}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function manualRechargeAccountToBase ({mhtno,toBaseAccount}) {
  return request(`/api/operate/manualRechargeAccountToBase?format=json&mhtno=${mhtno}&toBaseAccount=${toBaseAccount}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function manualPartRefund ({pageRefundAmount,mhtno,withdrawFlag,pwd,listvo,loanInfoVo,RSAKey}) {
  // pwd = RSAUtils.encryptedString(RSAKey, pwd);
  return request(`/api/operate/manualPartRefund?format=json&pageRefundAmount=${pageRefundAmount}&mhtno=${mhtno}&withdrawFlag=${withdrawFlag}`, {
    headers: {
      "X-Requested-With":"XMLHttpRequest",
      'Content-Type':'application/json'
    },
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    body:JSON.stringify({pwd:pwd,listvo:listvo,loanInfoVo:loanInfoVo})
  })
}

