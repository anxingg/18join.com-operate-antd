/**
 * Created by fcb on 2017/8/8.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import Slloantransfertasklist from '../../components/slloantransfertasklist/list';

class Slloantransfertask extends React.Component {
  render(){
    const {list,loading} = this.props.slloantransfertasklist;

    const SlloantransfertasklistProps = {
      list:list,
      loading:loading
    }
    return (
      <div className="content-inner">
        <Slloantransfertasklist {...SlloantransfertasklistProps} />
      </div>
    )
  }
}

Slloantransfertask.PropTypes = {
  list:PropTypes.array
}

function mapStateToProps({slloantransfertasklist}){
  return {slloantransfertasklist}
}

export default connect(mapStateToProps)(Slloantransfertask);
