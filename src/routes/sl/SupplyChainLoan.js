/**
 * Created by fcb on 2017/7/18.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import SuppleChainLoanList from '../../components/SupplyChainLoan/list';
import SuppleChainLoanSearch from '../../components/SupplyChainLoan/SupplyChainLoanSearch';

class SuppleChainLoanModel extends React.Component{
  render(){
    const {querylistnamemap,list,loading} = this.props.SupplyChainLoan;
    const {dispatch} = this.props;

    const SuppleChainLoanSearchProps = {
      querylistnamemap:querylistnamemap,
      SuppleChainLoanSearch:function(data){
        dispatch({
          type:'SupplyChainLoan/querylistnamemap',
          payload:{
            name:data
          }
        })
      },
      queryplatdetail:function(data){
        dispatch({
          type:'SupplyChainLoan/queryplatdetail',
          payload:{
            name:data
          }
        })
      }
    }

    const SuppleChainLoanListProps = {
      list:list,
      loading:loading
    }
    return (
      <div className="content-inner">
        <SuppleChainLoanSearch {...SuppleChainLoanSearchProps} />
        <SuppleChainLoanList {...SuppleChainLoanListProps} />
      </div>
    )
  }
}

SuppleChainLoanModel.PropTypes = {
  querylistnamemap:PropTypes.array
}
function mapStateToProps({SupplyChainLoan}){
  return {SupplyChainLoan}
}

export default connect(mapStateToProps)(SuppleChainLoanModel);
