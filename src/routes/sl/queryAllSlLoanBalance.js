/**
 * Created by fcb on 2017/4/18.
 */
import React,{PropTypes} from 'react'
import SlLoanBalanceList from '../../components/queryAllSlLoanBalance/list'
import {connect} from 'dva'

function QuerySlBanlance({queryBalance}){
  const {list,loading} = queryBalance;

  const querySlBanlanceListProps = {
    dataSource:list,
    loading:loading,
  }
  return (
    <div className='content-inner'>
      <SlLoanBalanceList {...querySlBanlanceListProps} />
    </div>
  )
}

QuerySlBanlance.propTypes = {
  queryBalance: PropTypes.object,
  list:PropTypes.array
}

function mapStateToProps ({ queryBalance }) {
  return { queryBalance }
}

export default connect(mapStateToProps)(QuerySlBanlance)
