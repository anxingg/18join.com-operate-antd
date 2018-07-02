/**
 * Created by fcb on 2017/7/26.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import SlloanrepaymentList from '../../components/slloanrepayment/list';
import SlloanrepaymentSearch from '../../components/slloanrepayment/slloanrepaymentSearch';

class Slloanrepayment extends React.Component{
  state = {
    amount:0
  }
  render(){
    const {dispatch} = this.props;
    const {list,vo,joinid,loading,checkSameRefundListLength} = this.props.slloanrepayment;
    const that = this;

    const SlloanrepaymentListProps = {
      list:list,
      loading:loading
    }
    const SlloanrepaymentSearchProps = {
      checkSameRefundListLength:checkSameRefundListLength,
      vo:vo,
      amount:this.state.amount,
      joinidstr:joinid,
      checkSameRefund:function(v){
        dispatch({
          type:'slloanrepayment/checkSameRefund',
          payload:v
        })
      },
      preRefund:function(v){
        dispatch({
          type:'slloanrepayment/preRefund',
          payload:v
        })
        that.setState({
          amount:v.amount
        })
      },
      autoRefund:function(v){
        dispatch({
          type:'slloanrepayment/autoRefund',
          payload:v
        })
      }
    }
    return (
      <div className="content-inner">
        <SlloanrepaymentSearch {...SlloanrepaymentSearchProps} />
        <SlloanrepaymentList {...SlloanrepaymentListProps} />
      </div>
    )
  }
}

Slloanrepayment.PropTypes = {
  list:PropTypes.array
}

function mapStateToProps({slloanrepayment}){
  return {slloanrepayment}
}

export default connect(mapStateToProps)(Slloanrepayment)
