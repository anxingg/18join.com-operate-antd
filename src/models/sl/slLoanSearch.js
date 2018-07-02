/**
 * Created by fcb on 2017/5/8.
 */
import {querySlLoan,createFinanceAccount} from '../../services/sl/slLoanSearch'

export default {
  namespace:'slLoanSearch',
  state:{
    list:[],
    loading:false,
    createAccountMthno:''
  },
  effects:{
    *preliminary({payload},{call,put}){
      yield put ({type:'showLoading'})
      const {data} = yield call (querySlLoan,payload)
      yield put ({
        type:"querySuccess",
        payload:{
          list:data.message.items
        }
      })
    },
    *createFinanceAccount({payload},{call,put}){
        yield put ({type:'showLoading'})
        const {data} = yield call (createFinanceAccount,payload)
        yield put ({ type:"querySuccess" })
     }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen(location =>{
        if(location.pathname === '/slLoanSearch'){
          dispatch({
            type:"preliminary",
            payload:{
              loanstatus:10
            }
          })
        }
      })
    }
  },
  reducers:{
    showLoading(state){
      return {...state ,loading:true}
    },
    querySuccess(state,action){
      return {...state ,...action.payload,loading:false}
    }
  }
}
