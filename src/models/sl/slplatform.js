/**
 * Created by fcb on 2017/8/22.
 */
import {selectAllSLLoanCreditAggVOByJoinID,saveSLLoanCreditAggVO,needBindAlipay,unNeedBindAlipay} from '../../services/sl/slplatform'
import {message} from 'antd'

export default {
  namespace:'slplatform',
  state:{
    loading:false,
    list:{},
    arrList:[]
  },
  effects:{
    *selectAllSLLoanCreditAggVOByJoinID({payload},{put,call}){
      yield put({type:'showLoading'})
      const {data} = yield call(selectAllSLLoanCreditAggVOByJoinID,payload)
      const arr1 = [];
      let obj={};
      for(var i=0,l=data.message.platformuserList.length;i<l;i++){
        for(var key in data.message.platformuserList[i]){
          obj['discount']=data.message.platformuserList[i]['discount']
          obj['rate']=data.message.platformuserList[i]['rate']

          obj['fee']=data.message.platformuserList[i]['fee']
          obj['maxAmount']=data.message.platformuserList[i]['maxAmount']/100
          obj['loanPeriod']=data.message.platformuserList[i]['loanPeriod']
          obj['contractExpireDate']=data.message.platformuserList[i]['contractExpireDate']
          obj['id']=data.message.platformuserList[i]['id']
          obj['idOfTbMerchantUser']=data.message.platformuserList[i]['idOfTbMerchantUser']
          obj['rowUpdateTime']=data.message.platformuserList[i]['rowUpdateTime']
        }
        arr1.push(obj)
        obj = {}
      }
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message,
          arrList:arr1
        }
      })
    },
    *saveSLLoanCreditAggVO({payload},{put,call}){
      yield put({type:'showLoading'})
      const {data} = yield call(saveSLLoanCreditAggVO,payload)
      if(data.status=='OK'){
        message.success('修改授信成功！',3)
      }
      yield put({ type:'querySuccess' })
    },
    *needBindAlipay({payload},{put,call}){
      yield put({type:'showLoading'})
      const {data} = yield call(needBindAlipay,payload)
      if(data.status=='OK'){
        message.success(data.message,3)
      }
      yield put({ type:'querySuccess' })
    },
    *unNeedBindAlipay({payload},{put,call}){
      yield put({type:'showLoading'})
      const {data} = yield call(unNeedBindAlipay,payload)
      if(data.status=='OK'){
        message.success(data.message,3)
      }
      yield put({ type:'querySuccess' })
    },
  },
  reducers:{
    showLoading(state){
      return {...state,loading:true}
    },
    querySuccess:function(state,action){
      return {...state,...action.payload,loading:false}
    }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen((loaction)=>{
        if(loaction.pathname=='/sllivelistmanager/slplatform'){
          const {joinuserid} = loaction.query;
          dispatch({
            type:'selectAllSLLoanCreditAggVOByJoinID',
            payload:{
              joinuserid:joinuserid
            }
          })
        }
      })
    }
  }
}
