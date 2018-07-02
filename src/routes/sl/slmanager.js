import React, { PropTypes } from 'react'
import { connect } from 'dva'
import UserList from '../../components/slmanager/list'
import UserSearch from '../../components/slmanager/search'

function Users ({ location, dispatch, slmanager }) {
  const { loading, list, queryplatformUname ,listnamemap,pagination} = slmanager
  const querytbsltask = (data) => {
    dispatch({
      type:'slmanager/queryalltbsltaskrunresulttoday',
      payload:data
    })
  }

  const autoInputName = (data) => {
    dispatch({
      type:'slmanager/querylistnamemap',
      payload: data
    })
  }

  const userListProps = {
    dataSource: list,
    loading:loading,
    pagination: pagination,
    catchData:function(data){
      dispatch({
        type:'slmanager/catchData',
        payload:data
      })
    },
    saveCookie:function(data){
      dispatch({
        type:'slmanager/cookieSave',
        payload:data
      })
    }
  }
  const userSearchProps = {
    queryplatformUname,
    listnamemap,
    autoInputName,
    querytbsltask
  }

  return (
    <div className='content-inner'>
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
    </div>
  )
}

Users.propTypes = {
  slmanager: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  queryplatformUname:PropTypes.array,
  listnamemap:PropTypes.array
}

function mapStateToProps ({ slmanager }) {
  return { slmanager }
}

export default connect(mapStateToProps)(Users)
