/**
 * Created by fcb on 2017/7/31.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import AdjustedinterestSearch from '../../components/adjustedinterest/AdjustedinterestSearch';
import AdjustedinterestTable from '../../components/adjustedinterest/list';

class Adjustedinterest extends React.Component {
  render(){
    const {dispatch} = this.props;
    const {namelist,queryplatformUname,list,loading} = this.props.adjustedinterest;
    const AdjustedinterestSearchProps = {
      namelist:namelist,
      queryplatformUname:queryplatformUname,
      querylistnamemap:function(e){
        dispatch({
          type:'adjustedinterest/querylistnamemap',
          payload:{
            name:e
          }
        })
      },
      queryFloat:function(v){
        dispatch({
          type:'adjustedinterest/queryFloat',
          payload:v
        })
      }
    }
    const AdjustedinterestTableProps = {
      list:list,
      loading:loading,
      addFloatVo:function(e){
        dispatch({
          type:'adjustedinterest/addFloatVo',
          payload:e
        })
      }
    }
    return (
      <div className="content-inner">
        <AdjustedinterestSearch {...AdjustedinterestSearchProps} />
        <AdjustedinterestTable {...AdjustedinterestTableProps} />
      </div>
    )
  }
}
Adjustedinterest.PropTypes = {
  namelist:PropTypes.array,
  queryplatformUname:PropTypes.array
}

function mapStateToProps({adjustedinterest}){
  return {adjustedinterest}
}

export default connect(mapStateToProps)(Adjustedinterest)
