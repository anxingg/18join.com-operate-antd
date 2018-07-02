/**
 * Created by fcb on 2017/10/12.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import List from '../../components/t+1/list'

class DfApplyReview extends React.Component {
  render(){
    const {dispatch} = this.props;
    const {list,loading} = this.props.t1;

    const listProps = {
      list:list,
      loading:loading,
      queryAllT0LoanLiveInfoByStatus:function(e){
        dispatch({
          type:'t1/queryAllT0LoanLiveInfoByStatus',
          payload:e
        })
      },
      queryAllTxLoanLiveInfoByApplying:function(e){
        dispatch({
          type:'t1/queryAllTxLoanLiveInfoByApplying',
        })
      },
      updateTxLoanLiveInfoAndCreateFinanceAccount:function(e){
        dispatch({
          type:'t1/updateTxLoanLiveInfoAndCreateFinanceAccount',
          payload:e
        })
      },
      updateTxLoanLiveInfoApplyNoPassByLiveID:function(e){
        dispatch({
          type:'t1/updateTxLoanLiveInfoApplyNoPassByLiveID',
          payload:e
        })
      },
      updateTxLoanLiveInfoAndSetFinanceAccountAndRatio:function(e){
        dispatch({
          type:'t1/updateTxLoanLiveInfoAndSetFinanceAccountAndRatio',
          payload:e
        })
      },
    }
    return (
      <div className="content-inner">
        <List {...listProps} />
      </div>
    )
  }
}

DfApplyReview.PropTypes = {
  list:PropTypes.array
}

function mapStateToProps({t1}){
  return {t1}
}

export default connect(mapStateToProps)(DfApplyReview)
