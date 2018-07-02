/**
 * Created by fcb on 2017/8/4.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import SupplyChainStatementSearch from '../../components/supplyChainStatement/supplyChainStatementSearch';
import FinancingList from '../../components/supplyChainStatement/financingList';
import RepaymentList from '../../components/supplyChainStatement/repaymentList';

class SupplyChainStatement extends React.Component {
  state = {
    isRepayment:false
  }
  render(){
    const {dispatch} = this.props;
    const {listnamemap,list,queryLoanSum,refundList,queryRefundSum,loading} = this.props.supplyChainStatement;
    const that = this;

    const SupplyChainStatementSearchProps = {
      listnamemap:listnamemap,
      isFinancingSearch:that.state.isRepayment,
      queryLoanSumMap:queryLoanSum,
      queryRefundSumMap:queryRefundSum,
      querylistnamemap:function(e){
        dispatch({
          type:'supplyChainStatement/querylistnamemap',
          payload:{
            name:e
          }
        })
      },
      isFinancing:function(v){
        that.setState({ isRepayment:v })
      },
      queryLoanbill:function(v){
        dispatch({
          type:'supplyChainStatement/queryLoanbill',
          payload:v
        })
      },
      queryLoanSum:function(v){
        dispatch({
          type:'supplyChainStatement/queryLoanSum',
          payload:v
        })
      },
      queryRefundBill:function(v){
        dispatch({
          type:'supplyChainStatement/queryRefundBill',
          payload:v
        })
      },
      queryRefundSum:function(v){
        dispatch({
          type:'supplyChainStatement/queryRefundSum',
          payload:v
        })
      }
    }

    const FinancingListProps = {
      list:list,
      isRepayment:this.state.isRepayment?'block':'none',
      loading:loading
    }

    const RepaymentListProps = {
      list:refundList,
      isRepayment:this.state.isRepayment?'none':'block',
      loading:loading
    }

    return (
      <div className="content-inner">
        <SupplyChainStatementSearch {...SupplyChainStatementSearchProps} />

        {/*this.state.isRepayment?<FinancingList {...FinancingListProps} />:<RepaymentList {...RepaymentListProps} />*/}

        <FinancingList {...FinancingListProps} />
        <RepaymentList {...RepaymentListProps} />
      </div>
    )
  }
}

SupplyChainStatement.PropTypes = {
  listnamemap:PropTypes.array,
  list:PropTypes.array,
  queryLoanSum:PropTypes.object,
  refundList:PropTypes.array,
  queryRefundSum:PropTypes.object
}

function mapStateToProps({supplyChainStatement}) {
  return {supplyChainStatement}
}

export default connect(mapStateToProps)(SupplyChainStatement);
