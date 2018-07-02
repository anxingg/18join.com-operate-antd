/**
 * Created by fcb on 2017/7/18.
 */
import { request } from '../../utils'
import {PAGE_SIZE,PAGE} from '../../constants'

export function querylistnamemap ({name}) {
  return request(`/api/operate/merchantinfo/querylistnamemap?format=json&name=${name}&businesstype=2`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function queryplatdetail ({name}) {
  return request(`/api/operate/queryplatdetail?format=json&joinidstr=${name}&businesstype=2`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}
