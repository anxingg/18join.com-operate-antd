/**
 * Created by fcb on 2017/6/28.
 */
import React,{PropTypes} from 'react'
import {connect} from 'dva'
import PaltformcheckList from '../../components/paltformcheck/list'
import PaltformcheckSearch from '../../components/paltformcheck/paltformcheckSearch'

class Paltformcheck extends React.Component{
  render(){
    const {platnamemap,platformUname,queryplatformstatues,list,platformRule,queryFinaceaccountList,loading} = this.props.paltformcheck;
    const {dispatch} = this.props;

    const PaltformcheckSearchProps = {
      platnamemap:platnamemap,
      platformUname:platformUname,
      queryplatformstatues:queryplatformstatues,
      initplatname:function(name){
        dispatch({
          type:"paltformcheck/initplatname",
          payload:{
            name:name
          }
        })
      },
      queryplatformUser:function(value){
        dispatch({
          type:"paltformcheck/queryplatformUser",
          payload:value
        })
      }
    }

    const PaltformcheckListProps = {
      list:list,
      loading:loading,
      platformRule:platformRule,
      queryplatformstatues:queryplatformstatues,
      queryFinaceaccountList:queryFinaceaccountList,
      updatePlatformUserCreditCheckInfo:function(value){
        dispatch({
          type:'paltformcheck/updatePlatformUserCreditCheckInfo',
          payload:value
        })
      },
      slPlatformUserCredit:function(value){
        dispatch({
          type:'paltformcheck/slPlatformUserCredit',
          payload:value
        })
      },
      queryFinaceaccount:function(value){
        dispatch({
          type:'paltformcheck/queryFinaceaccount',
          payload:value
        })
      },
      bindFinaceaccount:function(value){
        dispatch({
          type:'paltformcheck/bindFinaceaccount',
          payload:value
        })
      },
      addFinaceaccount:function(value){
      dispatch({
        type:'paltformcheck/addFinaceaccount',
        payload:value
      })
    },
      updateplatformUser:function(value){
        dispatch({
          type:'paltformcheck/updateplatformUser',
          payload:value
        })
      }
    }
    return (
      <div className="content-inner">
        <PaltformcheckSearch {...PaltformcheckSearchProps} />

        <PaltformcheckList {...PaltformcheckListProps} />
      </div>
    )
  }
}

Paltformcheck.PropTypes = {
  paltformcheck:PropTypes.object,
  platnamemap:PropTypes.array,
  platformUname:PropTypes.array,
  list:PropTypes.array,
  queryFinaceaccountList:PropTypes.array
}

function mapStateToProps({paltformcheck}){
  return {paltformcheck}
}

export default connect(mapStateToProps)(Paltformcheck)
