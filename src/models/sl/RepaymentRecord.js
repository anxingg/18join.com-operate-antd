/**
 * Created by fcb on 2017/7/21.
 */
import {querylistnamemap,queryNotpayback,queryAccountBalanceByMhtnoAndType,rechargeDiffAccountBalance} from '../../services/sl/RepaymentRecord';
import {message} from 'antd';

 export default {
  namespace:'RepaymentRecord',
  state:{
    loading:false,
    list:[],
    querylistnamemap:[],
    accountBalance:0
  },
  effects:{
    *querylistnamemap({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(querylistnamemap,payload);
      yield put({
        type:'querySuccess',
        payload:{
          querylistnamemap:data.message,
          list:[]
        }
      })
    },
    *queryNotpayback({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryNotpayback,payload);
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message
        }
      })
    },
    *queryAccountBalanceByMhtnoAndType({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryAccountBalanceByMhtnoAndType,payload);
      yield put({
        type:'querySuccess',
        payload:{
          accountBalance:data.message
        }
      })
    },
    *rechargeDiffAccountBalance({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(rechargeDiffAccountBalance,payload);
      if(data.status){ message.success(data.message) }
      yield put({ type:'querySuccess'});
    }
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
        if(loaction.pathname=='/RepaymentRecord'){
          dispatch({type:'querylistnamemap',payload:{name:''}})
        }
      })
    }
  }
}
