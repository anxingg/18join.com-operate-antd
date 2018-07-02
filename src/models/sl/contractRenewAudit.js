/**
 * Created by fcb on 2017/8/15.
 */
import {listAll,audit,reject} from '../../services/sl/contractRenewAudit'
import {message} from 'antd';

export default {
  namespace:'contractRenewAudit',
  state:{
    loading:false,
    list:[]
  },
  effects:{
    *listAll({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(listAll,payload);
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message
        }
      })
    },
    *audit({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(audit,payload);
      if(data.status=='OK'){
        message.success(data.message,3);
      }
      yield put({ type:'querySuccess'})
    },
    *reject({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(reject,payload);
      if(data.status=='OK'){
        message.success(data.message,3);
      }
      yield put({ type:'querySuccess'})
    }
  },
  reducers:{
    showLoading(state){
      return {...state,loading:true};
    },
    querySuccess(state,action){
      return {...state,...action.payload,loading:false}
    }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen((loaction)=>{
        if(loaction.pathname=='/contractRenewAudit'){
          dispatch({ type:'listAll'})
        }
      })
    }
  }
}
