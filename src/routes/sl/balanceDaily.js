/**
 * Created by fcb on 2017/8/11.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import BalanceDailySearch from '../../components/balanceDaily/balanceDailySearch';
import BalanceDailyList from '../../components/balanceDaily/list';

class BalanceDaily extends React.Component {
  render(){
    const {listnamemap,list,dailySum,loading} = this.props.balanceDaily;
    const {dispatch} = this.props;

    const BalanceDailySearchProps = {
      listnamemap:listnamemap,
      dailySum:dailySum,
      querylistnamemap:function(v){
        dispatch({
          type:'balanceDaily/querylistnamemap',
          payload:{
            name:v
          }
        })
      },
      queryDailyLoanInfo:function(v){
       dispatch({
         type:'balanceDaily/queryDailyLoanInfo',
         payload:v
       })
      },
      queryDailySum:function(v){
        dispatch({
          type:'balanceDaily/queryDailySum',
          payload:v
        })
      }
    }

    const BalanceDailyListProps = {
      list:list,
      loading:loading
    }

    return (
      <div className="content-inner">
        <BalanceDailySearch {...BalanceDailySearchProps} />
        <BalanceDailyList {...BalanceDailyListProps} />
      </div>
    )
  }
}

BalanceDaily.PropTypes = {
  listnamemap:PropTypes.array,
  list:PropTypes.array
}

function mapSatateToProps({balanceDaily}){
  return {balanceDaily}
}
export default connect(mapSatateToProps)(BalanceDaily);
