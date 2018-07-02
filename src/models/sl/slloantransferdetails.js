/**
 * Created by fcb on 2017/8/9.
 */
import {queryAccBaseTransDetail,updateForDealRedoWithStatus,redo,updateForDealRedoWithStatus2} from '../../services/sl/slloantransferdetails'
import {message} from 'antd'

export default {
  namespace:'slloantransferdetails',
  state:{
    loading:false,
    list:[],
    row:{}
  },
  effects:{
    *queryAccBaseTransDetail({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryAccBaseTransDetail,payload);
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message,
          row:payload
        }
      })
    },
    *updateForDealRedoWithStatus({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(updateForDealRedoWithStatus,payload);
      if(data.status){
        message.success(data.message)
      }
      yield put({ type:'querySuccess' })
    },
    *redo({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(redo,payload);
      if(data.status){
        message.success(data.message)
      }
      yield put({ type:'querySuccess' })
    },
    *updateForDealRedoWithStatus2({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(updateForDealRedoWithStatus2,payload);
      if(data.status){
        message.success(data.message)
      }
      yield put({ type:'querySuccess' })
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
        if(loaction.pathname=='/slloantransfertasklist/slloantransferdetails'){
          dispatch({
            type:'queryAccBaseTransDetail',
            payload:loaction.query
          })
        }
      })
    }
  }
}
