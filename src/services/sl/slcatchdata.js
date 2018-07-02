/**
 * Created by fcb on 2017/7/13.
 */
import { request } from '../../utils'
import {PAGE_SIZE,PAGE} from '../../constants'

export function initplatname ({name}) {
  return request(`/api/operate/merchantinfo/querylistnamemap?format=json&name=${name}&businesstype=0`, {
    method: 'post',
    credentials: 'include',
    mode: 'cors'
  })
}

export function queryplatformUname(){
  return request(`/api/operate/platformuser/queryplatformUname?format=json`,{
    method:'post',
    credentials:'include',
    mode:'cors'
  })
}

export function queryByPlatformAndMerchantUserIDAndDate(value){
  return request(`/api/operate/tbslloanstattotal/queryByPlatformAndMerchantUserIDAndDate?format=json&startDate=${value.startDate}&endDate=${value.endDate}&platformName=${value.platformName}&merchantUserId=${value.merchantUserId}`,{
    method:'post',
    credentials:'include',
    mode:'cors',
  })
}


