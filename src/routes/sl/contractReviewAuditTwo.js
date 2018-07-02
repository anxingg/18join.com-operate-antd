/**
 * Created by fcb on 2017/8/15.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import ContractReviewAuditTwoDetails from '../../components/contractReviewAuditTwo/contractReviewAuditTwoDetails'

class ContractReviewAuditTwo extends React.Component {
  state = {
    joinuserid:this.props.contractReviewAuditTwo.joinuserid || ''
  }
  render(){
    const {queryRealNameInfo,userList,id} = this.props.contractReviewAuditTwo;
    const {joinuserid} = this.state;
    const {dispatch} = this.props;

    const ContractReviewAuditTwoDetailsProps = {
      queryRealNameInfo:queryRealNameInfo,
      userList:userList,
      joinuserid:joinuserid,
      id:id,
      updateMerchantUserCreditCheckInfo:function(v){
        dispatch({
          type:'contractReviewAuditTwo/updateMerchantUserCreditCheckInfo',
          payload:{
            creditDate:v.creditDate,
            creditFile:v.creditFile,
            creditNo:v.creditNo,
            idOfTbMerchantUser:v.idOfTbMerchantUser,
            expiredDate:v.expiredDate,
            id:id
          }
        })
      },
      reject:function(v){
        dispatch({
          type:'contractReviewAuditTwo/reject',
          payload:{
            comment:v.comment,
            id:id
          }
        })
      },
    }

    return (
      <div className="content-inner">
        <ContractReviewAuditTwoDetails {...ContractReviewAuditTwoDetailsProps} />
      </div>
    )
  }
}
ContractReviewAuditTwo.PropTypes = {
  queryRealNameInfo:PropTypes.object,
  userList:PropTypes.object,
}

function mapStateToProps({contractReviewAuditTwo}){
  return {contractReviewAuditTwo}
}

export default connect(mapStateToProps)(ContractReviewAuditTwo)
