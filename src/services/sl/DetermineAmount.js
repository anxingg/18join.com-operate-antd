/**
 * Created by fcb on 2017/7/19.
 */
import { request } from '../../utils'
import {PAGE_SIZE,PAGE} from '../../constants'

export function checksamecredit (value) {
  return request(`/api/operate/checksamecredit?format=json&joinstr=${value.joinidstr}&amount=${value.amount}&realLoanDate=${value.realLoanDate}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors'
  })
}

export function preloans (value) {
  return request(`/api/operate/preloan?format=json&joinidstr=${value.joinidstr}&amount=${value.amount}&loanDate=${value.realLoanDate}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors'
  })
}

export function slapplyloan (value) {
  return request(`/api/operate/slapplyloan?format=json`, {
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
