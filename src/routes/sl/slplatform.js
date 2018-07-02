/**
 * Created by fcb on 2017/8/22.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import SlplatformContent from '../../components/slplatform/slplatformContent'

class Slplatform extends React.Component {
  render(){
    const {list,arrList} = this.props.slplatform
    const {dispatch} = this.props;

    const SlplatformContentProps = {
      list:list,
      arrList:arrList,
      saveSLLoanCreditAggVO:function(e){
        dispatch({
          type:'slplatform/saveSLLoanCreditAggVO',
          payload:e
        })
      },
      needBindAlipay:function(e){
        dispatch({
          type:'slplatform/needBindAlipay',
          payload:e
        })
      },
      unNeedBindAlipay:function(e){
        dispatch({
          type:'slplatform/unNeedBindAlipay',
          payload:e
        })
      },
    }
    return (
      <div className="content-inner">
        <SlplatformContent {...SlplatformContentProps} />
      </div>
    )
  }
}

Slplatform.PropTypes = {
  list:PropTypes.object
}

function mapStateToProps({slplatform}){
  return {slplatform}
}
export default connect(mapStateToProps)(Slplatform);
