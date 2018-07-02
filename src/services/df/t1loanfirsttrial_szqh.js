/**
 * Created by fcb on 2017/10/12.
 */
import {request} from '../../utils'

export function queryAllTxLoanJoinUserTransanctionTotalListBySzqh () {
  return request(`/api/operate/queryAllTxLoanJoinUserTransanctionTotalListBySzqh?format=json`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function creditApprove (data) {
  return request(`/api/operate/creditApprove?format=json&operatetype=${data.operatetype}&joinuserid=${data.joinuserid}&transdate=${data.transdate}&realnetamount=${data.realnetamount}&blname=szqh`, {
    method: 'post',
    credentials: 'include',
    mode: 'cors',
  })
}

export function creditRefuse (data) {
  return request(`/api/operate/creditRefuse?format=json&operatetype=${data.operatetype}&joinuserid=${data.joinuserid}&transdate=${data.transdate}&realnetamount=${data.realnetamount}&blname=szqh`, {
    method: 'post',
    credentials: 'include',
    mode: 'cors',
  })
}

export function querySzqhCreditorBalance () {
  return request(`/api/operate/querySzqhCreditorBalance?format=json`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

