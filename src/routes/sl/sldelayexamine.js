/**
 * Created by fcb on 2017/8/18.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import SldelayexamineContent from '../../components/sldelayexamine/sldelayexamineContent'

class sldelayexamine extends React.Component {
  render(){
    const {renewedInfo,rows,see} = this.props.sldelayexamine;
    const {dispatch} = this.props;

    const SldelayexamineContentProps = {
      see:see,
      renewedInfo:renewedInfo,
      rows:rows,
      agreeRenewed:function(v){
        dispatch({
          type:'sldelayexamine/agreeRenewed',
          payload:{
            id:rows.id,
            renewedAmount:v.renewedAmount,
            renewedBegintime:v.renewedBegintime,
            renewedEndTime:v.renewedEndTime,
            renewedRate:v.renewedRate,
            renewedfee:v.renewedfee,
            rowUpdateTime:rows.rowUpdateTime
          }
        })
      },
      refuseRenewed:function(v){
        dispatch({
          type:'sldelayexamine/refuseRenewed',
          payload:{
            id:rows.id,
            rowUpdateTime:rows.rowUpdateTime,
            memo:v
          }
        })
      }
    }
    return (
      <div className="content-inner">
        <SldelayexamineContent {...SldelayexamineContentProps} />
      </div>
    )
  }
}

sldelayexamine.PropTypes = {
  renewedInfo:PropTypes.object
}

function mapStateToProps({sldelayexamine}){
  return {sldelayexamine}
}

export default connect(mapStateToProps)(sldelayexamine)
