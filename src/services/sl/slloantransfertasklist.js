/**
 * Created by fcb on 2017/8/8.
 */
import {request} from '../../utils';

export function queryErrorTransferList(){
  return request (`/api/operate/queryErrorTransferList?format=json`,{
    method:'get',
    credentials: 'include',
    mode: 'cors',
  })
}
