/**
 * Created by fcb on 2017/5/11.
 */
import {queryCreditedSLLoanAppInfoList} from '../../services/sl/sllivelistmanager'

export default {
  namespace:'slLoanAppInfoList',
  state:{
    list:[],
    totalCount:null,
    loading:false
  },
  effects:{
    *querySlLoanAppInfoList({payload},{call,put}){
      yield put ({type:'showLoading'})
      const {data} = yield call(queryCreditedSLLoanAppInfoList,payload)
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message.items,
          totalCount:data.totalCount
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
      history.listen(loaction => {
        if(loaction.pathname === '/sllivelistmanager'){
          dispatch({
            type:'querySlLoanAppInfoList'
          })
        }
      })
    }
  }
}
