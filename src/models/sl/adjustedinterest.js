/**
 * Created by fcb on 2017/7/31.
 */
import {querylistnamemap,queryplatformUname,queryFloat,addFloatVo} from '../../services/sl/adjustedinterest';
import {message} from 'antd';

export default {
  namespace:'adjustedinterest',
  state:{
    loading:false,
    list:[],
    namelist:[],
    queryplatformUname:[]
  },
  effects:{
    *querylistnamemap({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(querylistnamemap,payload);
      yield put({
        type:'querySuccess',
        payload:{
          namelist:data.message
        }
      })
    },
    *queryplatformUname({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(queryplatformUname,payload);
      yield put({
        type:'querySuccess',
        payload:{
          queryplatformUname:data.message
        }
      })
    },
    *queryFloat({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(queryFloat,payload);
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message.items
        }
      })
    }
    ,
    *addFloatVo({payload},{put,call}){
      yield put({type:"showLoading"});
      const {data} = yield call(addFloatVo,payload);
      if(data.status){
        message.success('调息成功！',3)
      }
      yield put({ type:'querySuccess'  })
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
        if(loaction.pathname=='/adjustedinterest'){
          dispatch({type:'querylistnamemap',payload:{name:''}})
          dispatch({type:'queryplatformUname'})
        }
      })
    }
  }
}
