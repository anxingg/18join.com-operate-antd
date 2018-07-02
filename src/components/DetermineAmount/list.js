/**
 * Created by fcb on 2017/7/19.
 */
import React from 'react';
import {Table,Button,Modal} from 'antd';
import {money100} from '../../utils/index';
import styles from './DetermineAmount.less';

const columns = [
  {
    title:'电商平台用户',
    dataIndex:'platform',
    key:'platform'
  },
  {
    title:'剩余可融资额(元),',
    dataIndex:'surplusAmount',
    key:'surplusAmount',
    render:val=>money100(val)
  },
  {
    title:'今日可融资总额(元)',
    dataIndex:'amount',
    key:'amount',
    render:val=>money100(val)
  },
  {
    title:'日利率(%)',
    dataIndex:'rate',
    key:'rate'
  },
  {
    title:'本次融资额(元)',
    dataIndex:'presentAmount',
    key:'presentAmount',
    render:val=>money100(val)
  }
]
class DetermineAmountList extends React.Component{
  render(){
    const {list,loading} = this.props;
    return (
      <div className={styles.table}>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={list.listvo}
          rowKey={record=>record.id}
        />
      </div>
    )
  }
}
export default DetermineAmountList
