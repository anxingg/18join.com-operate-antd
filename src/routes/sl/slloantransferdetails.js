/**
 * Created by fcb on 2017/8/9.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import SlloantransferdetailsList from '../../components/slloantransferdetails/slloantransferdetails';

class Slloantransferdetails extends React.Component {
  render(){
    const {list,row,loading} = this.props.slloantransferdetails;
    const {dispatch} = this.props;
    const SlloantransferdetailsListProps = {
      list:list,
      loading:loading,
      row:row,
      updateForDealRedoWithStatus:function(v){
        dispatch({
          type:'slloantransferdetails/updateForDealRedoWithStatus',
          payload:v
        })
      },
      redo:function(v){
        dispatch({
          type:'slloantransferdetails/redo',
          payload:v
        })
      },
      updateForDealRedoWithStatus2:function(v){
        dispatch({
          type:'slloantransferdetails/updateForDealRedoWithStatus2',
          payload:v
        })
      }
    }
    return (
      <div className="content-inner">
        <SlloantransferdetailsList {...SlloantransferdetailsListProps} />
      </div>
    )
  }
}

Slloantransferdetails.PropTypes ={
  list:PropTypes.array
}

function mapSatateToProps({slloantransferdetails}){
  return {slloantransferdetails}
}

export default connect(mapSatateToProps)(Slloantransferdetails)
