/**
 * Created by fcb on 2017/6/28.
 */
import {initplatname,
          queryplatformUname,
          queryplatformstatues,
          queryplatformUser,
          platformRule,
          slPlatformUserCredit,
          updatePlatformUserCreditCheckInfo,
          queryFinaceaccount,
          bindFinaceaccount,
          updateplatformUser,
          addFinaceaccount
        } from '../../services/sl/paltformcheck'
import {message} from 'antd';

export default {
  namespace:'paltformcheck',
  state:{
    loading:false,
    platnamemap:[],
    platformUname:[],
    queryplatformstatues:[],
    list:[],
    platformRule:'',
    slPlatformUserCredit:'',
    queryFinaceaccountList:[]
  },
  effects:{
    *initplatname({payload},{call,put}){
      yield put({type:'showLoading'});
      const {data} = yield call(initplatname,payload);
      yield put ({
        type:'querySuccess',
        payload:{
          platnamemap:data.message
        }
      })
     },
    *queryplatformUname({payload},{call,put}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryplatformUname,payload);
      yield put ({
        type:'querySuccess',
        payload:{
          platformUname:data.message
        }
      })
     },
    *queryplatformstatues({payload},{call,put}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryplatformstatues,payload);
      yield put ({
        type:'querySuccess',
        payload:{
          queryplatformstatues:data.message
        }
      })
    },
    *queryplatformUser({payload},{call,put}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryplatformUser,payload);
      yield put ({
        type:'querySuccess',
        payload:{
          list:data.message.items
        }
      })
    },
    *platformRule({payload},{call,put}){
      yield put({type:'showLoading'});
      const {data} = yield call(platformRule,payload);
      yield put ({
        type:'querySuccess',
        payload:{
          platformRule:data.message
        }
      })
    },
    *slPlatformUserCredit({payload},{call,put}){
      yield put({type:'showLoading'});
      const {data} = yield call(slPlatformUserCredit,payload);
      yield put ({
        type:'querySuccess',
        payload:{
          slPlatformUserCredit:data.message
        }
      })
    },
    *updatePlatformUserCreditCheckInfo({payload},{call,put}){
      yield put({type:'showLoading'});
      yield call(updatePlatformUserCreditCheckInfo,payload);
      yield put ({ type:'querySuccess' });
     },
    *queryFinaceaccount({payload},{call,put}){
      yield put ({type:'showLoading'});
      const {data} = yield call(queryFinaceaccount,payload);
      yield put ({
        type:'querySuccess',
        payload:{
          queryFinaceaccountList:data.message
        }
      })
     },
    *bindFinaceaccount({payload},{call,put}){
      yield put ({type:'showLoading'});
      const {data} =  yield call(bindFinaceaccount,payload);
      if(data.status=='OK'){
        message.success('设置结算户成功！')
      }
      yield put ({ type:'querySuccess' });
     },
    *addFinaceaccount({payload},{call,put}){
      yield put ({type:'showLoading'});
      const {data} = yield call(addFinaceaccount,payload);
      if(data.status=='OK'){
        message.success('增加银行卡成功！')
      }
      yield put ({ type:'querySuccess' });
     },
    *updateplatformUser({payload},{call,put}){
      yield put ({type:'showLoading'});
      yield call(updateplatformUser,payload);
      yield put ({type:'querySuccess'});
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
      history.listen(loaction=>{
        if(loaction.pathname==='/paltformcheck'){
          dispatch({ type:'initplatname', payload:{ name:'' } });
          dispatch({ type:'queryplatformUname' });
          dispatch({ type:'queryplatformstatues' });
          dispatch({ type:'platformRule' });
        }
      })
    }
  }
}
