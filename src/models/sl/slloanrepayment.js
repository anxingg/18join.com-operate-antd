/**
 * Created by fcb on 2017/7/26.
 */
import {preRefunds,autoRefund,checkSameRefund} from '../../services/sl/slloanrepayment';
import {message} from 'antd';

export default {
  namespace:'slloanrepayment',
  state:{
    loading:false,
    list:[],
    vo:[],
    joinid:'',
    checkSameRefundListLength:0
  },
  effects:{
    *preRefund({payload},{put,call}){
      yield put ({type:'showLoading'});
      const {data} = yield call(preRefunds,payload);
      yield put ({
        type:'querySuccess',
        payload:{
          list:data.message.tbSlRefundVoList,
          vo:data.message
        }
      })
    },
    *checkSameRefund({payload},{put,call}){
      yield put ({type:'showLoading'});
      const {data} = yield call(checkSameRefund,payload);
      if(data.message.length<=0){
        const dataPreRefund = yield call(preRefunds,payload);
        yield put ({
          type:'querySuccess',
          payload:{
            checkSameRefundListLength:data.message.length,
            list:dataPreRefund.data.message.tbSlRefundVoList,
            vo:dataPreRefund.data.message
          }
        })
      }else{
        yield put ({
          type:'querySuccess',
          payload:{
            checkSameRefundListLength:data.message.length
          }
        })
      }
    },
    *autoRefund({payload},{put,call}){
      yield put ({type:'showLoading'});
      const {data} = yield call(autoRefund,payload);
      if(data.status){
        message.success('还款补录成功！')
      }
      yield put ({ type:'querySuccess'})
    },
    *updateJoinid({payload},{put,call}){
      yield put ({type:'showLoading'});
      yield put ({ type:'querySuccess',payload:payload})
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
        if(loaction.pathname=='/RepaymentRecord/slloanrepayment'){
          let regExp = /\?joinid=(\d+)/;
          if(regExp.test(loaction.search)){
            let joinid = regExp.exec(loaction.search)[1]
            dispatch({
              type:'updateJoinid',
              payload:{
                joinid:joinid
              }
            })
          }
        }
      })
    }
  }
}
