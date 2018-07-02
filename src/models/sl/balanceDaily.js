/**
 * Created by fcb on 2017/8/11.
 */
import {querylistnamemap,queryDailyLoanInfo,queryDailySum} from '../../services/sl/balanceDaily';

export default {
  namespace:'balanceDaily',
  state:{
    loading:false,
    list:[],
    listnamemap:[],
    dailySum:''
  },
  effects:{
    *querylistnamemap({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(querylistnamemap,payload);
      yield put({
        type:"querySuccess",
        payload:{
          listnamemap:data.message
        }
      })
    },
    *queryDailyLoanInfo({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryDailyLoanInfo,payload);
      yield put ({
        type:'querySuccess',
        payload:{
          list:data.message.items
        }
      })
    },
    *queryDailySum({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(queryDailySum,payload);
      yield put({
        type:"querySuccess",
        payload:{
          dailySum:data.message
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
      history.listen((loaction)=>{
        if(loaction.pathname=='/balanceDaily'){
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
