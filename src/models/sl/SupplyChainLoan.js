/**
 * Created by fcb on 2017/7/17.
 */
import {querylistnamemap,queryplatdetail} from '../../services/sl/SuppleChainLoan'

export default {
  namespace:'SupplyChainLoan',
  state:{
    loading:false,
    list:[],
    querylistnamemap:[]
  },
  effects:{
    *querylistnamemap({payload},{call,put}){
      yield put({type:'showLoading'});
      const {data} = yield call(querylistnamemap,payload);
      yield put({
        type:'querySuccess',
        payload:{
          querylistnamemap:data.message
        }
      })
     },
    *queryplatdetail({payload},{call,put}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryplatdetail,payload);
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
      history.listen(loaction=>{
        if(loaction.pathname=='/SupplyChainLoan'){
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
