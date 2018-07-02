/**
 * Created by fcb on 2017/5/11.
 */
import React,{PropTypes} from 'react'
import {connect} from 'dva'
import Sllivelistmanager from '../../components/sllivelistmanager/list'

class Sllivelist extends React.Component {
  render(){
    const {list,loading,totalCount} = this.props.slLoanAppInfoList
    const slLoanAppInfoProps = {
      list:list,
      loading:loading,
      totalCount:totalCount
    }
    return (
      <div className="content-inner">
        <Sllivelistmanager {...slLoanAppInfoProps} />
      </div>
    )
  }
}

Sllivelist.PropTypes = {
  slLoanAppInfoList:PropTypes.object,
  list:PropTypes.array
}

function mapStateToProps({slLoanAppInfoList}){
  return {slLoanAppInfoList}
}

export default  connect(mapStateToProps)(Sllivelist)
