/**
 * Created by fcb on 2017/8/15.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import ContractRenewAuditList from '../../components/contractRenewAudit/list'

class ContractRenewAudit extends React.Component {
  render(){
    const {dispatch} = this.props;
    const {list,loading} = this.props.contractRenewAudit;

    const ContractRenewAuditListProps = {
      list:list,
      loading:loading,
      audit:function(e){
        dispatch({
          type:'contractRenewAudit/audit',
          payload:e
        })
      },
      reject:function(e){
        dispatch({
          type:'contractRenewAudit/reject',
          payload:e
        })
      }
    }

    return (
      <div className="content-inner">
        <ContractRenewAuditList {...ContractRenewAuditListProps} />
      </div>
    )
  }
}

ContractRenewAudit.PropTypes = {
  list:PropTypes.array
}

function mapStateToProps({contractRenewAudit}){
  return {contractRenewAudit}
}

export default connect(mapStateToProps)(ContractRenewAudit);
