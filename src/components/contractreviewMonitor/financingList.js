/**
 * Created by fcb on 2017/8/11.
 */
import React from 'react';
import {Table} from 'antd';
import {money100} from '../../utils/index';
import styles from './list.less'

class FinancingList extends React.Component {
  render(){
    const {isFinancing,financingList,loading} = this.props;
    const columns = [
      {
        title:'商户名',
        dataIndex:'mhtname',
        key:'mhtname'
      },
      {
        title:'电商手机号',
        dataIndex:'mobile',
        key:'mobile'
      },
      {
        title:'融资编号',
        dataIndex:'code',
        key:'code'
      },
      {
        title:'融资本金(元)',
        dataIndex:'accountDelta',
        key:'accountDelta',
        render:val=>money100(val)
      },
      {
        title:'未还融资本金(元)',
        dataIndex:'totalNotPaybackAmount',
        key:'totalNotPaybackAmount',
        render:val=>money100(val)
      },
      {
        title:'未还融资利息(元)',
        dataIndex:'totalNotPaybackFee',
        key:'totalNotPaybackFee',
        render:val=>money100(val)
      },
      {
        title:'剩余天数(天)',
        dataIndex:'days',
        key:'days'
      }
    ]

    return (
      <div style={{display:isFinancing}} className={styles.table}>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={financingList}
          // rowKey={}
        />
      </div>
    )
  }
}
export default FinancingList;
