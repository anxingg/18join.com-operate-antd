/**
 * Created by fcb on 2017/5/8.
 */
import React,{PropTypes} from 'react'
import {connect} from 'dva'
import SlLoanSearchList from '../../components/slLoanSearch/list'
import QueryStatus from '../../components/slLoanSearch/applicationSelectStatus'

class QuerySlLoan extends React.Component {
  render(){
    const {list,loadding} = this.props.slLoanSearch;
    const {dispatch} = this.props;

    const slLoanSearchListProps = {
      list:list,
      loadding:loadding,
      createFinanceAccount:function(data){
        dispatch({
          type:'slLoanSearch/createFinanceAccount',
          payload:{
            mhtno:data
          }
        })
      }
    }

    const queryStatus = {
      queryStatusFun:function(data){
        dispatch({
          type:'slLoanSearch/preliminary',
          payload: {
            loanstatus:data
          }
        })
      }
    }
    return (
      <div className="content-inner">
        <QueryStatus {...queryStatus} />
        <SlLoanSearchList {...slLoanSearchListProps} />
      </div>
    )
  }
}
QuerySlLoan.propTypes = {
  slLoanSearch:PropTypes.object,
  list:PropTypes.array
}

function mapStateToProps({slLoanSearch}){
  return {slLoanSearch}
}

export default connect(mapStateToProps)(QuerySlLoan)

