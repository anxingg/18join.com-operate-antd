/**
 * Created by fcb on 2017/8/22.
 */
import {request} from '../../utils'

export function selectAllSLLoanCreditAggVOByJoinID(data){
  return request(`/api/operate/selectAllSLLoanCreditAggVOByJoinID?format=json&joinuserid=${data.joinuserid}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function saveSLLoanCreditAggVO ({shortname,applyvo,platformuserList}) {
  return request(`/api/operate/saveSLLoanCreditAggVO?format=json`, {
    headers: {
      "X-Requested-With":"XMLHttpRequest",
      'Content-Type':'application/json'
    },
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    body:JSON.stringify({shortname:shortname,applyvo:applyvo,platformuserList:platformuserList})
  })
}

export function needBindAlipay(data){
  return request(`/api/operate/needBindAlipay?format=json&id=${data}`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
  })
}

export function unNeedBindAlipay(data){
  return request(`/api/operate/unNeedBindAlipay?format=json&id=${data}`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
  })
}

