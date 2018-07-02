/**
 * Created by fcb on 2017/10/30.
 */
import {message} from 'antd';
import {queryAllTxLoanJoinUserTransanctionTotalListBySzqh,creditApprove,creditRefuse,querySzqhCreditorBalance} from '../../services/df/t1loanfirsttrial_szqh'

export default {
  namespace:'t1loanfirsttrial_szqh',
  state:{
    loading:false,
    list:[],
    balance:0
  },
  effects:{
    *queryAllTxLoanJoinUserTransanctionTotalListBySzqh({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(queryAllTxLoanJoinUserTransanctionTotalListBySzqh,payload);
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message.items
        }
      })
    },
    *creditApprove({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(creditApprove,payload);
      if(data.status=='OK'){
        message.success(data.message,3);
      }else{
        message.error(data.message,3);
      }
      yield put({ type:'querySuccess' })
    },
    *creditRefuse({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(creditRefuse,payload);
      if(data.status=='OK'){
        message.success(data.message,3);
      }else{
        message.error(data.message,3);
      }
      yield put({ type:'querySuccess' })
    },
    *querySzqhCreditorBalance({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(querySzqhCreditorBalance,payload);
      yield put({
        type:'querySuccess',
        payload:{
          balance:data.message
        }
      })
    },
  },
  reducers:{
    showLoading(state){
      return {...state,loading:true}
    },
    querySuccess(state,action){
      return {...state,...action.payload,loading:false}
    }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen(loaction=>{
        if(loaction.pathname=='/t1loanfirsttrial_szqh'){
          dispatch({type:'queryAllTxLoanJoinUserTransanctionTotalListBySzqh'});
          dispatch({type:'querySzqhCreditorBalance'})
        }
      })
    }
  }
}
