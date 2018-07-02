/**
 * Created by fcb on 2017/8/16.
 */
import {request} from '../../utils'

export function queryRealNameInfo(data){
  return request(`/api/operate/queryRealNameInfo?format=json&joinuserid=${data.joinuserid}`,{
    method:'get',
    credentials:'include',
    mode:'cors'
  })
}

export function selectAllSLLoanCreditAggVOByJoinID(data){
  return request(`/api/operate/selectAllSLLoanCreditAggVOByJoinID?format=json&joinuserid=${data.joinuserid}`,{
    method:'get',
    credentials:'include',
    mode:'cors'
  })
}
//&creditDate=${data.creditDate}&creditFile=${data.file}&creditNo=${data.creditNo}&idOfTbMerchantUser=${data.idOfTbMerchantUser}
export function updateMerchantUserCreditCheckInfo(data){
  return request(`/api/operate/updateMerchantUserCreditCheckInfo?format=json`,{
    headers: {
      "X-Requested-With":"XMLHttpRequest",
      'Content-Type':'application/json'
    },
    method:'post',
    credentials:'include',
    mode:'cors',
    body:JSON.stringify({
      creditDate:data.creditDate,
      creditFile:data.creditFile,
      creditNo:data.creditNo,
      idOfTbMerchantUser:data.idOfTbMerchantUser
    })
  })
}

export function reject(data){
  return request(`/api/renew/${data.id}/reject?format=json&comment=${data.comment}`,{
    method:'post',
    credentials:'include',
    mode:'cors'
  })
}

export function audit(data){
  return request(`/api/renew/${data.id}/audit?format=json&expiredDate=${data.expiredDate}`,{
    method:'post',
    credentials:'include',
    mode:'cors'
  })
}






