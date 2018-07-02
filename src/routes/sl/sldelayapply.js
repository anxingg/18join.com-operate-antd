/**
 * Created by fcb on 2017/6/7.
 */
import React,{PropTypes} from 'react'
import {connect} from 'dva'
import SldelayapplyList from '../../components/sldelayapply/list'
import SldelayapplySearch from '../../components/sldelayapply/sldelayapplySearch'

class Sldelayapply extends React.Component{
  render(){
    const {queryplatformUname,initnamemap,list,loading} = this.props.sldelayapply;
    const {dispatch} = this.props;

    const SldelayapplySearchProps = {
      queryplatformUname:queryplatformUname,
      initnamemap:initnamemap,
      autoInitNameMap:function(data){
        dispatch({
          type:'sldelayapply/initnamemap',
          payload:{
            mhtname:data
          }
        })
      },
      queryRenewedCredit:function(data){
        dispatch({
          type:'sldelayapply/queryRenewedCredit',
          payload:data
        })
      }
    }

    const SldelayapplyListProps = {
      list:list,
      loading:loading
    }

    return (
      <div className='content-inner'>
        <SldelayapplySearch {...SldelayapplySearchProps} />
        <SldelayapplyList {...SldelayapplyListProps} />
      </div>
    )
  }
}

Sldelayapply.propTypes = {
  sldelayapply: PropTypes.object,
  dispatch: PropTypes.func,
  queryplatformUname:PropTypes.array,
  queryplatformUname:PropTypes.array,
  initnamemap:PropTypes.array,
  list:PropTypes.array,
}

function mapStateToProps ({ sldelayapply }) {
  return { sldelayapply }
}

export default connect(mapStateToProps)(Sldelayapply)
