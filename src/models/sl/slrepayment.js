/**
 * Created by fcb on 2017/5/24.
 */
import {queryNotpaybackByMhtno,querylistnamemap,queryAccountBalanceByMhtnoAndType,calculatefeeByMhtno,manualRechargeAccountToBase,manualPartRefund} from '../../services/sl/slrepayment'

export default {
  namespace:'slrepayment',
  state:{
    list:[],
    listnamemap:[],
    loading:false,
    accountBalance:0,
    queryBalance:0,
    mhtno:'',
    loanInfoVo:{},
    RSAKey:{}
  },
  effects:{
    *queryslrepayment({payload},{put,call}){
      yield put({ type:'showLoading' })
      const {data} = yield call(queryNotpaybackByMhtno,payload)
      yield put ({
        type:'querySuccess',
        payload:{
          list:data.message.listvo,
          mhtno:payload.mhtno,
          loanInfoVo:data.message.loanInfo
        }
      })
    },
    *querylistnamemap({payload},{put,call}){
      yield put ({type:'showLoading'})
      const {data} = yield call(querylistnamemap,payload)
      yield put({
        type:'querySuccess',
        payload:{
          listnamemap:data.message
        }
      })
    },
    *queryAccountBalanceByMhtnoAndType({payload},{put,call}){
      yield put ({type:"showLoading"})
      const {data} = yield call(queryAccountBalanceByMhtnoAndType,payload)
      if(payload.acctype==='AT01'){
        yield put ({
          type:'querySuccess',
          payload:{
            accountBalance:data.message,      //基本户余额
          }
        })
      }else if(payload.acctype==='AT02'){
        yield put ({
          type:'querySuccess',
          payload:{
            queryBalance:data.message     //结算户余额
          }
        })
      }
    },
    *operateCalculatefeeByMhtno({payload},{put,call}){
      yield put ({type:"showLoading"})
      yield call(calculatefeeByMhtno,payload)
      const {data} = yield call(queryNotpaybackByMhtno,payload)
      yield put ({
        type:'querySuccess',
        payload:{
          list:data.message.listvo,
          mhtno:payload.mhtno,
          loanInfoVo:data.message.loanInfoVo
        }
      })
    },
    *manualRechargeAccountToBase({payload},{put,call}){
      yield put({type:"showLoading"})
      const {data} = yield call(manualRechargeAccountToBase,payload)
      yield put({
        type:'querySuccess'
      })
    },
    *manualPartRefund({payload},{put,call,select}){
      let mhtno = payload.mhtno
      const RSAKey = yield select(state => state.app.RSAKey);
      yield put({type:"showLoading"})
      payload.pwd = RSAUtils.encryptedString(RSAKey, payload.pwd);
      yield call (manualPartRefund,payload)
      const {data} = yield call(queryNotpaybackByMhtno,{mhtno})
      yield put ({
        type:'querySuccess',
        payload:{
          list:data.message.listvo,
          mhtno:mhtno,
          loanInfoVo:data.message.loanInfoVo
        }
      })
      yield put({ type:"querySuccess" })
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
        if(loaction.pathname==='/slrepayment'){
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
