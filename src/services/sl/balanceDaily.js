/**
 * Created by fcb on 2017/8/11.
 */
import {request} from '../../utils';

export function querylistnamemap(data){
  return request(`/api/operate/merchantinfo/querylistnamemap?format=json&businesstype=2&name=${data.name}`,{
    method:'post',
    credentials: 'include',
    mode: 'cors',
  })
}

export function queryDailyLoanInfo (data) {
  return request(`/api/operate/queryDailyLoanInfo?format=json&idOfTbMerchantUser=${data.idOfTbMerchantUser}&curdate=${data.curdate}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function queryDailySum (data) {
  return request(`/api/operate/queryDailySum?format=json&idOfTbMerchantUser=${data.idOfTbMerchantUser}&curdate=${data.curdate}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}
