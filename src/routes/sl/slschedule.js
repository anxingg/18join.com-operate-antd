/**
 * Created by fcb on 2017/7/25.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import SlscheduleList from '../../components/slschedule/list';
import {urlParam} from '../../utils/index';

class Slschedule extends React.Component{
  render(){
    const {list,loading} = this.props.slschedule;
    const SlscheduleListProps = {
      list:list,
      loading:loading
    }
    return (
      <div>
        <SlscheduleList {...SlscheduleListProps} />
      </div>
    )
  }
}

Slschedule.PropTypes = {
  list:PropTypes.array
}

function mapStateToProps ({slschedule}){
  return {slschedule}
}
export default connect(mapStateToProps)(Slschedule);
