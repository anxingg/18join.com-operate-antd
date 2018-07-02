/**
 * Created by fcb on 2017/8/4.
 */
import {request} from '../../utils'

export function querylistnamemap({name}){
  return request(`/api/operate/merchantinfo/querylistnamemap?format=json&name=${name}&businesstype=2`,{
    mothod:'get',
    credentials:'include',
    mode:'cors'
  })
}

export function queryLoanbill(data){
  return request(`/api/operate/queryLoanbill?format=json&begintime=${data.startDate}&endtime=${data.endDate}&userIdOfJoinOfDebtor=${data.userIdOfJoinOfDebtor}&pageable=10`,{
    mothod:'get',
    credentials:'include',
    mode:'cors'
  })
}

export function queryLoanSum(data){
  return request(`/api/operate/queryLoanSum?format=json&begintime=${data.startDate}&endtime=${data.endDate}&userIdOfJoinOfDebtor=${data.userIdOfJoinOfDebtor}&pageable=10`,{
    mothod:'get',
    credentials:'include',
    mode:'cors'
  })
}

export function queryRefundBill(data){
  return request(`/api/operate/queryRefundBill?format=json&begintime=${data.startDate}&endtime=${data.endDate}&userIdOfJoinOfDebtor=${data.userIdOfJoinOfDebtor}&pageable=10`,{
    mothod:'get',
    credentials:'include',
    mode:'cors'
  })
}

export function queryRefundSum(data){
  return request(`/api/operate/queryRefundSum?format=json&begintime=${data.startDate}&endtime=${data.endDate}&userIdOfJoinOfDebtor=${data.userIdOfJoinOfDebtor}&pageable=10`,{
    mothod:'get',
    credentials:'include',
    mode:'cors'
  })
}
