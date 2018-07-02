/**
 * Created by fcb on 2017/10/12.
 */
import {
          queryAllTxLoanLiveInfoByApplying,
          queryAllT0LoanLiveInfoByStatus,
          updateTxLoanLiveInfoAndCreateFinanceAccount,
          updateTxLoanLiveInfoApplyNoPassByLiveID,
          updateTxLoanLiveInfoAndSetFinanceAccountAndRatio
        } from '../../services/df/t+1'

import {message} from 'antd'

export default {
  namespace:'t1',
  state:{
    loading:false,
    list:[]
  },
  effects:{
    *queryAllTxLoanLiveInfoByApplying({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(queryAllTxLoanLiveInfoByApplying,payload);
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message.items
        }
      })
    },
    *queryAllT0LoanLiveInfoByStatus({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(queryAllT0LoanLiveInfoByStatus,payload);
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message.items
        }
      })
    },
    *updateTxLoanLiveInfoAndCreateFinanceAccount({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(updateTxLoanLiveInfoAndCreateFinanceAccount,payload);
      if(data.status=='OK'){
        message.success(data.message,3)
      }
      yield put({ type:'querySuccess'})
    },
    *updateTxLoanLiveInfoApplyNoPassByLiveID({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(updateTxLoanLiveInfoApplyNoPassByLiveID,payload);
      if(data.status=='OK'){
        message.success(data.message,3)
      }
      yield put({ type:'querySuccess'})
    },
    *updateTxLoanLiveInfoAndSetFinanceAccountAndRatio({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(updateTxLoanLiveInfoAndSetFinanceAccountAndRatio,payload);
      if(data.status=='OK'){
        message.success(data.message,3)
      }
      yield put({ type:'querySuccess'})
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
        if(loaction.pathname=='/admin/t+1'){
          dispatch({ type:'queryAllTxLoanLiveInfoByApplying' })
        }
      })
    }
  }
}
