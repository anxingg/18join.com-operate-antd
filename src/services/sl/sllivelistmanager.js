/**
 * Created by fcb on 2017/5/11.
 */
import { request } from '../../utils'
import {PAGE_SIZE,PAGE} from '../../constants';

export async function queryCreditedSLLoanAppInfoList () {
  return request(`/api/operate/queryCreditedSLLoanAppInfoList?format=json&size=${PAGE_SIZE}&page=${PAGE}&loanstatus=2`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}
