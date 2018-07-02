/**
 * Created by fcb on 2017/4/18.
 */
import {request} from '../../utils'

export function queryAllSlLoanDebtBalance(){
  return request (`/api/operate/queryAllSlLoanDebtBalance?format=json`,{
    method: 'get',
    credentials:'include',
    mode:'cors'
  })
}
