/**
 * Created by fcb on 2017/8/8.
 */
import {queryErrorTransferList} from '../../services/sl/slloantransfertasklist';

export default {
  namespace:'slloantransfertasklist',
  state:{
    loading:false,
    list:[]
  },
  effects:{
    *queryErrorTransferList({payload},{put,call}){
      yield put({type:'showLoading'})
      const {data} = yield call(queryErrorTransferList,payload)
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message
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
        if(loaction.pathname=='/slloantransfertasklist'){
          dispatch({
            type:'queryErrorTransferList',
          })
        }
      })
    }
  }
}
