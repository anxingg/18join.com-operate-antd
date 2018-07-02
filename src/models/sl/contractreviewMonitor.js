/**
 * Created by fcb on 2017/8/11.
 */
import {querywillexpire,queryWillExpireForApplication} from '../../services/sl/contractreviewMonitor'

export default {
  namespace:'contractreviewMonitor',
  state:{
    loading:false,
    financingList:[],
    contractList:[]
  },
  effects:{
    *querywillexpire({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(querywillexpire,payload);
      yield put ({
        type:'querySuccess',
        payload:{
          financingList:data.message.items
        }
      })
    },
    *queryWillExpireForApplication({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryWillExpireForApplication,payload);
      yield put ({
        type:'querySuccess',
        payload:{
          contractList:data.message.items
        }
      })
    }
  },
  reducers:{
    showLoading(state){
      return {...state,loading:false}
    },
    querySuccess(state,action){
      return {...state,...action.payload,loading:false}
    }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen((loaction)=>{
        if(loaction.pathname=='/contractreviewMonitor'){
          dispatch({ type:'querywillexpire' })
          dispatch({ type:'queryWillExpireForApplication' })
        }
      })
    }
  }
}
