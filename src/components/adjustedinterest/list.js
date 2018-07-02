/**
 * Created by fcb on 2017/7/31.
 */
import React from 'react';
import {Table} from 'antd';
import ChangeInterest from './changeInterest';
import {money100} from '../../utils/index';
import styles from './adjustedinterest.less'

class AdjustedinterestTable extends React.Component {
  render(){
    const {list,addFloatVo,loading} = this.props;
    const columns = [
      {
        title:'商户名',
        dataIndex:'mhtname',
        key:'mhtname'
      },
      {
        title:'电商平台',
        dataIndex:'platformCnname',
        key:'platformCnname'
      },
      {
        title:'手机号',
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
        dataIndex:'totalNotPayBackNewFee',
        key:'totalNotPayBackNewFee',
        render:val=>money100(val)
      },
      {
        title:'到期剩余天数(天)',
        dataIndex:'days',
        key:'days'
      },
      {
        title:'已调差价(元)',
        dataIndex:'amountFloat',
        key:'amountFloat',
        render:val=>money100(val)
      },
      {
        title:'操作',
        dataIndex:'enableFlag',
        key:'enableFlag',
        render:(val,row)=><ChangeInterest addFloatVo={addFloatVo} row={row} />
      }
    ]
    return (
      <div className={styles.table}>
        <Table
          bordered
          columns={columns}
          dataSource={list}
          rowKey={opt=>opt.id}
          loading={loading}
        />
      </div>
    )
  }
}
export default AdjustedinterestTable;
