/**
 * Created by fcb on 2017/8/8.
 */
import React from 'react';
import {Table,Button,Tag} from 'antd';
import {Link} from 'dva/router'
import {money100} from '../../utils/index';
import styles from './slloantransfertasklist.less';

class Slloantransfertasklist extends React.Component {
  render(){
    const {list,loading} = this.props;
    const columns = [
      {
        title:'ID',
        dataIndex:'id',
        key:'id'
      },
      {
        title:'转出方商户名',
        dataIndex:'fromMhtname',
        key:'fromMhtname'
      },
      {
        title:'转出方账户类型',
        dataIndex:'accTypeFrom',
        key:'accTypeFrom'
      },
      {
        title:'转入方商户名',
        dataIndex:'toMhtname',
        key:'toMhtname'
      },
      {
        title:'转入方账户类型',
        dataIndex:'accTypeTo',
        key:'accTypeTo'
      },
      {
        title:'转出金额',
        dataIndex:'amount',
        key:'amount',
        render:val=><b style={{color:'#f50'}}>{money100(val)}</b>
      },
      {
        title:'转出时间',
        dataIndex:'rowUpdateTime',
        key:'rowUpdateTime'
      },
      {
        title:'原因',
        dataIndex:'memo',
        key:'memo'
      },
      {
        title:'操作',
        dataIndex:'operator',
        key:'operator',
        render:(val,row)=><Link to={`/slloantransfertasklist/slloantransferdetails?token=${row.token}&id=${row.id}&fromMhtname=${row.fromMhtname}&accTypeFrom=${row.accTypeFrom}&toMhtname=${row.toMhtname}&accTypeTo=${row.accTypeTo}`}>详情</Link>
      }
    ]
    return (
      <div className={styles.table}>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={list}
          // rowKey={}
        />
      </div>
    )
  }
}

export default Slloantransfertasklist
