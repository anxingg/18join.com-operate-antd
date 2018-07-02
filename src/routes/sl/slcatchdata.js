/**
 * Created by fcb on 2017/7/13.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import SlcatchdataSearch from '../../components/slcatchdata/slcatchdataSearch';
import SlcatchdataList from '../../components/slcatchdata/list';

class Slcatchdata extends React.Component{
  render(){
    const {dispatch} = this.props;
    const {listnamemap,queryplatformUname,list,loading} = this.props.slcatchdata;

    const SlcatchdataSearchProps = {
      listnamemap:listnamemap,
      queryplatformUname:queryplatformUname,
      querylistnamemap:function(value){
        dispatch({
          type:'slcatchdata/querylistnamemap',
          payload:{
            name:value
          }
        })
      },
      queryByPlatformAndMerchantUserIDAndDate:function (value) {
        dispatch({
          type:'slcatchdata/queryByPlatformAndMerchantUserIDAndDate',
          payload:value
        })
      }
    };

    const SlcatchdataListProps = {
      list:list,
      loading:loading
    }

    return (
      <div className="content-inner">
        <SlcatchdataSearch {...SlcatchdataSearchProps} />
        <SlcatchdataList {...SlcatchdataListProps} />
      </div>
    )
  }
}

Slcatchdata.PropTypes = {
  listnamemap:PropTypes.array,
}

function mapStateToProps({slcatchdata}){
  return {slcatchdata}
}

export default connect(mapStateToProps)(Slcatchdata)
