/**
 * Created by fcb on 2017/8/4.
 */
import {querylistnamemap,queryLoanbill,queryLoanSum,queryRefundBill,queryRefundSum} from '../../services/sl/supplyChainStatement';

export default {
  namespace:'supplyChainStatement',
  state:{
    loading:false,
    list:[],
    listnamemap:[],
    queryLoanSum:{},
    refundList:[],
    queryRefundSum:{},
  },
  effects:{
    *querylistnamemap({payload},{put,call}){
      yield put ({type:'showLoading'});
      const {data} = yield call(querylistnamemap,payload);
      yield put ({
        type:'querySuccess',
        payload:{
          listnamemap:data.message
        }
      })
    },
    *queryLoanbill({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryLoanbill,payload);
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message.items
        }
      })
    },
    *queryLoanSum({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryLoanSum,payload);
      yield put({
        type:'querySuccess',
        payload:{
          queryLoanSum:data.message
        }
      })
    },
    *queryRefundBill({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryRefundBill,payload);
      yield put({
        type:'querySuccess',
        payload:{
          refundList:data.message.items
        }
      })
    },
    *queryRefundSum({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryRefundSum,payload);
      yield put({
        type:'querySuccess',
        payload:{
          queryRefundSum:data.message
        }
      })
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
        if(loaction.pathname=='/supplyChainStatement'){
          dispatch({
            type:'querylistnamemap',
            payload:{
              name:''
            }
          })
        }
      })
    }
  }
}
