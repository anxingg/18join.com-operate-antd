/**
 * Created by fcb on 2017/8/15.
 */
import {queryRealNameInfo,selectAllSLLoanCreditAggVOByJoinID,updateMerchantUserCreditCheckInfo,reject,audit} from '../../services/sl/contractReviewAuditTwo'
import {message} from 'antd'

export default {
  namespace:'contractReviewAuditTwo',
  state:{
    loading:false,
    queryRealNameInfo:{},
    userList:{},
    joinuserid:'',
    id:''
  },
  effects:{
    *queryRealNameInfo({payload},{put,call}){
      yield put({type:'showLoading'})
      const {data} = yield call(queryRealNameInfo,payload)
      yield put({
        type:'querySuccess',
        payload:{
          queryRealNameInfo:data.message,
          joinuserid:payload.joinuserid
        }
      })
    },
    *selectAllSLLoanCreditAggVOByJoinID({payload},{put,call}){
      yield put({type:'showLoading'})
      const {data} = yield call(selectAllSLLoanCreditAggVOByJoinID,payload)
      yield put({
        type:'querySuccess',
        payload:{
          userList:data.message,
          joinuserid:payload.joinuserid,
          id:payload.id
        }
      })
    },
    *updateMerchantUserCreditCheckInfo({payload},{put,call}){
      yield put({type:'showLoading'})
      const {data} = yield call(updateMerchantUserCreditCheckInfo,payload)
      const {auditData} = yield call(audit,payload);
      if(data.status=='OK') {
        message.success(data.message, 3);
      }
      yield put({ type:'querySuccess'})
    },
    *reject({payload},{put,call}){
      yield put({type:'showLoading'})
      const {data} = yield call(reject,payload)
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
      history.listen((loaction)=>{
        if(loaction.pathname=='/contractReviewAuditTwo'){
          const {joinuserid,id} = loaction.query;
          dispatch({
            type:'selectAllSLLoanCreditAggVOByJoinID',
            payload:{
              joinuserid:joinuserid,
              id:id
            }
          });
          dispatch({
            type:'queryRealNameInfo',
            payload:{
              joinuserid:joinuserid
            }
          });
        }
      })
    }
  }
}
