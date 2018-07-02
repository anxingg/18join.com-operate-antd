/**
 * Created by fcb on 2017/6/7.
 */
import {queryplatformUname,querylistnamemap,queryRenewedCredit} from '../../services/sl/sldelayapply'

export default{
  namespace:'sldelayapply',
  state:{
    list:[],
    loading:false,
    queryplatformUname:[],
    initnamemap:[]
  },
  effects:{
    *initplatformApy({payload},{put,call}){
      yield put({type:'showLoading'})
      const {data} = yield call(queryplatformUname,payload)
      yield put({
        type:'querySuccess',
        payload:{
          queryplatformUname:data.message
        }
      })
    },
    *initnamemap({payload},{put,call}){
      yield put({type:'showLoading'})
      const {data} = yield call(querylistnamemap,payload)
      yield put({
        type:"querySuccess",
        payload:{
          initnamemap:data.message
        }
      })
    },
    *queryRenewedCredit({payload},{put,call}){
      yield put({type:'showLoading'})
      const {data} = yield call(queryRenewedCredit,payload)
      yield put({
        type:"querySuccess",
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
    setup({dispatch,history}){
      history.listen(loaction=>{
        if(loaction.pathname=='/sldelayapply'){
          dispatch({type:"initplatformApy"})
          dispatch({type:'initnamemap',payload:{mhtname:''}})
        }
      })
    }
  }
}
