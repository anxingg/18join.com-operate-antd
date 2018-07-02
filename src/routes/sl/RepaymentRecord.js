/**
 * Created by fcb on 2017/7/21.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import RepaymentRecordSearch from '../../components/RepaymentRecord/RepaymentRecordSearch';
import RepaymentRecordList from '../../components/RepaymentRecord/list';

class RepaymentRecordContent extends React.Component{
  state = {
    joinidstr:'',
    mhtno:''
  }

  render(){
    const {dispatch} = this.props;
    const {querylistnamemap,list,accountBalance,loading} = this.props.RepaymentRecord;
    const that = this;

    const RepaymentRecordSearchProps = {
      querylistnamemap:querylistnamemap,
      accountBalance:accountBalance,
      queryname:function(e){
        dispatch({
          type:'RepaymentRecord/querylistnamemap',
          payload:{
            name:e
          }
        })
      },
      queryNotpayback:function(e){
        dispatch({
          type:'RepaymentRecord/queryNotpayback',
          payload:{
            joinidstr:e
          }
        });
        that.setState({ joinidstr:e })
      },
      queryAccountBalanceByMhtnoAndType:function(v){
        dispatch({
          type:'RepaymentRecord/queryAccountBalanceByMhtnoAndType',
          payload:{
            mhtno:v
          }
        })
        that.setState({ mhtno:v })
      },
      rechargeDiffAccountBalance:function(v){
        dispatch({
          type:'RepaymentRecord/rechargeDiffAccountBalance',
          payload:v
        })
      }
    }

    const RepaymentRecordListProps = {
      list:list,
      joinidstr:this.state.joinidstr,
      loading:loading
    }
    return (
      <div className="content-inner">
        <RepaymentRecordSearch {...RepaymentRecordSearchProps} />
        <RepaymentRecordList {...RepaymentRecordListProps} />
      </div>
    )
  }
}

RepaymentRecordContent.PropTypes = {
  querylistnamemap:PropTypes.array
}

function mapStateToProps({RepaymentRecord}){
  return {RepaymentRecord}
}
export default connect(mapStateToProps)(RepaymentRecordContent)
