/**
 * Created by fcb on 2017/8/18.
 */
import {queryRenewedInfo,agreeRenewed,refuseRenewed,queryReNewedByID} from '../../services/sl/sldelayexamine'
import {message} from 'antd'

export default {
  namespace:'sldelayexamine',
  state:{
    loading:false,
    renewedInfo:{},
    rows:{},
    see:''
  },
  effects:{
    *queryRenewedInfo({payload},{put,call}){
      yield put ({type:'showLoading'});
      const {data} = yield call(queryRenewedInfo,payload)
      yield put({
        type:'querySuccess',
        payload:{
          renewedInfo:data.message,
          rows:payload.rows,
          see:payload.see
        }
      })
    },
    *queryReNewedByID({payload},{put,call}){
      yield put ({type:'showLoading'});
      const {data} = yield call(queryReNewedByID,payload)
      yield put({
        type:'querySuccess',
        payload:{
          renewedInfo:data.message,
          rows:payload.rows,
          see:payload.see
        }
      })
    },
    *agreeRenewed({payload},{put,call}){
      yield put ({type:'showLoading'});
      const {data} = yield call(agreeRenewed,payload)
      if(data.status=='OK'){
        message.success(data.message,3)
      }else{
        message.error(data.message,3)
      }
      yield put({ type:'querySuccess'})
    },
    *refuseRenewed({payload},{put,call}){
      yield put ({type:'showLoading'});
      const {data} = yield call(refuseRenewed,payload)
      if(data.status=='OK'){
        message.success(data.message,3)
      }else{
        message.error(data.message,3)
      }
      yield put({ type:'querySuccess'})
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
        if(loaction.pathname=='/sldelayapply/sldelayexamine'){
          const {id,joinuserid,row,see} = loaction.query
          let rows = JSON.parse(row)
          if(see==0){
            dispatch({
              type:'queryReNewedByID',
              payload:{
                id:id,
                rows:rows,
                see:true,

              }
            })
          }else{
            dispatch({
              type:'queryRenewedInfo',
              payload:{
                id:id,
                joinid:joinuserid,
                rows:rows,
                see:false
              }
            })
          }
        }
      })
    }
  }
}
