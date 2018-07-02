/**
 * Created by fcb on 2017/5/24.
 */

import React,{PropTypes} from 'react'
import {connect} from 'dva'
import SearchRepayment from '../../components/slrepayment/searchRepayment'
import SlrepaymentList from '../../components/slrepayment/list'

 class QueryNotpaybackByMhtno extends React.Component{
   render(){
     const {list,loading,listnamemap,accountBalance,queryBalance,mhtno,loanInfoVo,RSAKey} = this.props.slrepayment
     const {dispatch} = this.props

     const querynamemap  = (data) => {
       dispatch({
         type:'slrepayment/querylistnamemap',
         payload:{
           name:data
         }
       })
     }
     const operateCalculatefeeByMhtno = (data) =>{
       dispatch({
         type:'slrepayment/operateCalculatefeeByMhtno',
         payload:{
           mhtno:data
         }
       })
     }

     const SearchRepaymentProps = {
       listnamemap:listnamemap,
       mhtno:mhtno,
       accountBalance:accountBalance,
       queryBalance:queryBalance,
       querynamemap:querynamemap,
       operateCalculatefeeByMhtno:operateCalculatefeeByMhtno,
       queryslrepayment:function(data){
         dispatch({
           type:'slrepayment/queryslrepayment',
           payload:{
             mhtno:data
           }
         })
       },
       queryAccountBalanceByMhtnoAndTypeAT01:function(data){
         dispatch({
           type:'slrepayment/queryAccountBalanceByMhtnoAndType',
           payload:{
             mhtno:data,
             acctype:'AT01'
           }
         })
       },
       queryAccountBalanceByMhtnoAndTypeAT02:function(data){
         dispatch({
           type:'slrepayment/queryAccountBalanceByMhtnoAndType',
           payload:{
             mhtno:data,
             acctype:'AT02'
           }
         })
       },

     }

     const SlrepaymentListProps = {
       list:list,
       mhtno:mhtno,
       loading:loading,
       accountBalance:accountBalance,
       queryBalance:queryBalance,
       loanInfoVo:loanInfoVo,
       RSAKey:RSAKey,
       manualRechargeAccountToBase:function(data){
         dispatch({
           type:'slrepayment/manualRechargeAccountToBase',
           payload:data
         })
       },
       manualPartRefund:function(data){
         dispatch({
           type:'slrepayment/manualPartRefund',
           payload:data
         })
       }
     }
     return (
       <div className="content-inner">
         <SearchRepayment {...SearchRepaymentProps} />
         <SlrepaymentList {...SlrepaymentListProps} />
       </div>
     )
   }
 }

QueryNotpaybackByMhtno.propTypes = {
  slrepayment:PropTypes.object,
  list:PropTypes.array
}

function mapStateToProps({slrepayment}){
  return {slrepayment}
}

export default connect(mapStateToProps)(QueryNotpaybackByMhtno)
