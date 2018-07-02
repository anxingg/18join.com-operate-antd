import { request } from '../../utils'

export async function querySlLoan ({loanstatus}) {
  return request(`/api/operate/querySLLoanAppInfoListByStatus?format=json&loanstatus=${loanstatus}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

export async function createFinanceAccount ({mhtno}) {
  return request(`/api/operate/createFinanceAccount?format=json&mhtno=${mhtno}`, {
    method: 'get',
    credentials: 'include',
    mode: 'cors',
  })
}

