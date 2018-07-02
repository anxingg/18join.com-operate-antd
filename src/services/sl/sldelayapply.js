/**
 * Created by fcb on 2017/6/7.
 */
import {request} from '../../utils'
import {PAGE_SIZE,PAGE} from '../../constants'

export function queryplatformUname(){
  return request (`/api/operate/platformuser/queryplatformUname?format=json`,{
    method: 'post',
    credentials:'include',
    mode:'cors'
  })
}

export function querylistnamemap({mhtname}){
  return request (`/api/operate/merchantinfo/querylistnamemap?format=json&name=${mhtname}&businesstype=2`,{
    method: 'post',
    credentials:'include',
    mode:'cors'
  })
}

export function queryRenewedCredit(data){
  return request (`/api/operate/queryRenewedCredit?format=json&userIdOfJoinOfDebtor=${data.userIdOfJoinOfDebtor}&idOfPlatform=${data.idOfPlatform}&startDate=${data.startDate}&endDate=${data.endDate}&page=${PAGE}&size=${PAGE_SIZE}`,{
    method: 'get',
    credentials:'include',
    mode:'cors',
  })
}
