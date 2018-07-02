/**
 * Created by fcb on 2017/7/25.
 */
import {request} from '../../utils'

export function queryRefund({joinid}){
  return request(`/api/operate/queryRefund?format=json&joinid=${joinid}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}
