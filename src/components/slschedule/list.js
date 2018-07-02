/**
 * Created by fcb on 2017/7/25.
 */
import React from 'react';
import {Table} from 'antd';
import {money100} from '../../utils/index';

class SlscheduleList extends React.Component {
  render(){
    const columns = [
      {
        title:'还款时间',
        dataIndex:'refundDate',
        key:'refundDate'
      },
      {
        title:'融资编号',
        dataIndex:'loanCode',
        key:'loanCode'
      },
      {
        title:'应还本金(元)',
        dataIndex:'shouldRefundPrinciple',
        key:'shouldRefundPrinciple',
        render:val=>money100(val)
      },
      {
        title:'应还利息(元)',
        dataIndex:'shouldRefundRate',
        key:'shouldRefundRate',
        render:val=>money100(val)
      },
      {
        title:'本次还款金额(元)',
        dataIndex:'refundAmount',
        key:'refundAmount',
        render:val=>money100(val)
      },
      {
        title:'其中还款本金(元)',
        dataIndex:'refundPrinciple',
        key:'refundPrinciple',
        render:val=>money100(val)
      },
      {
        title:'其中还款利息(元)',
        dataIndex:'refundFee',
        key:'refundFee',
        render:val=>money100(val)
      },
      {
        title:'本次还款后剩余本金(元)',
        dataIndex:'surplusPrinciple',
        key:'surplusPrinciple',
        render:val=>money100(val)
      },
      {
        title:'本次还款后剩余利息(元)',
        dataIndex:'surplusFee',
        key:'surplusFee',
        render:val=>money100(val)
      },
      {
        title:'计息天数',
        dataIndex:'days',
        key:'days'
      }
    ]
    const {list,loading} = this.props;

    return (
      <div>
        <Table
          loading={loading}
          bordered
          columns={columns}
          dataSource={list}
          rowKey={record=>record.id}
        />
      </div>
    )
  }
}
export default SlscheduleList;
