/**
 * Created by fcb on 2017/4/18.
 */
import {queryAllSlLoanDebtBalance} from '../../services/sl/queryAllSlLoanBalance'

export default {
  namespace:'queryBalance',
  state:{
    loading:false,
    list:[]
  },
  effects:{
    *queryAllSl({payload},{call,put}){
      yield put ({type:'showLoading'})
      const {data} = yield call (queryAllSlLoanDebtBalance)
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message
        }
      })
    }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen(location=>{
        if(location.pathname==='/queryAllSlLoanBalance'){
          dispatch({ type:'queryAllSl' })
        }
      })
    }
  },
  reducers:{
    showLoading (state) {
      return { ...state, loading: true }
    },
    querySuccess(state,action){
      return {...state, ...action.payload, loading: false }
    }
  }
}
