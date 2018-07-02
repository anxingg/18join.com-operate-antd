/**
 * Created by fcb on 2017/7/19.
 */
import {preloans,slapplyloan,checksamecredit} from '../../services/sl/DetermineAmount';
import {message} from 'antd';

export default {
  namespace:'DetermineAmount',
  state:{
    loading:false,
    list:{},
    joinid:'',
    checksamecreditListLength:-1
  },
  effects:{
    *stateJoinid({payload},{put,call}){
      yield put({type:'showLoading'});
      yield put({
        type:'querySuccess',
        payload:{
          joinid:payload.joinidstr,
          list:{},
          checksamecreditListLength:-1
        }
      })
    },
    *preloan({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(preloans,payload);
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message
        }
      })
     },
    *checksamecredit({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(checksamecredit,payload);

      if(data.message.length<=0){
        const dataTwo = yield call(preloans,payload);

        yield put({
          type:'querySuccess',
          payload:{
            checksamecreditListLength:data.message.length,
            list:dataTwo.data.message
          }
        })
      }else{
        yield put({
          type:'querySuccess',
          payload:{
            checksamecreditListLength:data.message.length,
          }
        })
      }

    },
    *slapplyloan({payload},{put,call}){
      yield put ({type:'showLoading'});
      const {data} = yield call (slapplyloan,payload);
      if(data.status=='OK'){
        message.success('融资补录成功！',3)
      }
      yield put({type:'querySuccess'});
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
        if(loaction.pathname=='/SupplyChainLoan/DetermineAmount'){
          dispatch({
            type:'stateJoinid',
              payload:loaction.query
          })
        }
      })
    }
  }
}
