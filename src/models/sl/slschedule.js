/**
 * Created by fcb on 2017/7/25.
 */
import {queryRefund} from '../../services/sl/slschedule';
import {urlParam} from '../../utils/index';

export default {
  namespace:'slschedule',
  state:{
    loading:false,
    list:[]
  },
  effects:{
    *queryRefund({payload},{put,call}){
      yield put({type:'showLoading'});
      const {data} = yield call(queryRefund,payload);
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

  setup({dispatch,history}){
      history.listen(loaction=>{
        if(loaction.pathname=='/RepaymentRecord/slschedule'){
          console.log(loaction.query)
          dispatch({
            type:'queryRefund',
            payload:{
              joinid:loaction.query.joinid
            }
          })
        }
      })
    }
  }
}
