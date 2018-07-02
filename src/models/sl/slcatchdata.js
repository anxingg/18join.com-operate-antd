/**
 * Created by fcb on 2017/7/13.
 */
import {initplatname,queryplatformUname,queryByPlatformAndMerchantUserIDAndDate} from '../../services/sl/slcatchdata'

export default{
  namespace:'slcatchdata',
  state:{
    loading:false,
    listnamemap:[],
    queryplatformUname:[],
    list:[]
  },
  effects:{
    *querylistnamemap({payload},{call,put}){
      yield put({type:'showLoading'});
      const {data} = yield call(initplatname,payload);
      yield put({
        type:'querySuccess',
        payload:{
          listnamemap:data.message
        }
      })
    },
    *queryplatformUname({payload},{call,put}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryplatformUname,payload);
      yield put({
        type:'querySuccess',
        payload:{
          queryplatformUname:data.message
        }
      })
     },
    *queryByPlatformAndMerchantUserIDAndDate({payload},{call,put}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryByPlatformAndMerchantUserIDAndDate,payload);
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message.items
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
    setup({history,dispatch}){
      history.listen((history)=>{
        if(history.pathname=='/slcatchdata'){
          dispatch({ type:'querylistnamemap', payload:{ name:'' } });
          dispatch({ type:'queryplatformUname'});
        }
      })
    }
  }
}
