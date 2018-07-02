/**
 * Created by fcb on 2017/7/19.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import DetermineAmountList from '../../components/DetermineAmount/list';
import DetermineAmountSearch from '../../components/DetermineAmount/DetermineAmountSearch';

class DetermineAmountModel extends React.Component{
  render(){
    const {list,loading,joinid,checksamecreditListLength} = this.props.DetermineAmount;
    const {dispatch} = this.props;
    const DetermineAmountSearchProps = {
      joinid:joinid,
      list:list,
      checksamecreditListLength:checksamecreditListLength,
      preloan:function(value){
        dispatch({
          type:'DetermineAmount/preloan',
          payload:value
        })
      },
      slapplyloan:function(value){
        dispatch({
          type:'DetermineAmount/slapplyloan',
          payload:value
        })
      },
      checksamecredit:function(value){
        dispatch({
          type:'DetermineAmount/checksamecredit',
          payload:value
        })
      },
    }
    const DetermineAmountListProps = {
      list:list,
      loading:loading
    }
    return (
      <div className="content-inner">
        <DetermineAmountSearch {...DetermineAmountSearchProps} />
        <DetermineAmountList {...DetermineAmountListProps} />
      </div>
    )
  }
}

DetermineAmountModel.PropTypes = {
  list:PropTypes.object,
  checksamecreditListLength:PropTypes.string,
  dispatch:PropTypes.func
}

function mapStateToProps({DetermineAmount}){
  return {DetermineAmount}
}

export default connect(mapStateToProps)(DetermineAmountModel);
