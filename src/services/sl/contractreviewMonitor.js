/**
 * Created by fcb on 2017/8/11.
 */
import {request} from '../../utils'

export function querywillexpire(){
  return request(`/api/operate/querywillexpire?format=json`,{
    method:'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export function queryWillExpireForApplication(){
  return request(`/api/operate/queryWillExpireForApplication?format=json`,{
    method:'get',
    credentials: 'include',
    mode: 'cors',
  })
}
