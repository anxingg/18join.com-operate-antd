/**
 * Created by fcb on 2017/10/12.
 */
import {request} from '../../utils'

export function queryAllTxLoanLiveInfoByApplying () {
  return request(`/api/operate/queryAllTxLoanLiveInfoByApplying?format=json`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function queryAllT0LoanLiveInfoByStatus (loanstatus) {
  return request(`/api/operate/queryAllT0LoanLiveInfoByStatus?format=json&loanstatus=${loanstatus}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function updateTxLoanLiveInfoAndCreateFinanceAccount (data) {
  return request(`/api/operate/updateTxLoanLiveInfoAndCreateFinanceAccount?format=json&operatetype=${data.operatetype}&liveid=${data.liveid}&pagets=${data.pagets}`, {
    method: 'post',
    credentials: 'include',
    mode: 'cors',
  })
}

export function updateTxLoanLiveInfoApplyNoPassByLiveID (data) {
  return request(`/api/operate/updateTxLoanLiveInfoApplyNoPassByLiveID?format=json&operatetype=${data.operatetype}&liveid=${data.liveid}&pagets=${data.pagets}&memo=${data.memo}`, {
    method: 'post',
    credentials: 'include',
    mode: 'cors',
  })
}

export function updateTxLoanLiveInfoAndSetFinanceAccountAndRatio (data) {
  return request(`/api/operate/updateTxLoanLiveInfoAndSetFinanceAccountAndRatio?format=json&operatetype=${data.operatetype}&liveid=${data.liveid}&pagets=${data.pagets}&financeAccount=${data.financeAccount}&ratio=${data.ratio}`, {
    method: 'post',
    credentials: 'include',
    mode: 'cors',
  })
}
