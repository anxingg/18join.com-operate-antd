/**
 * Created by fcb on 2017/7/26.
 */
import React from 'react';
import {Table} from 'antd';
import {money100} from '../../utils/index';
import styles from './slloanrepayment.less'

class SlloanrepaymentList extends React.Component{
  render(){
    const {list,loading} = this.props;
    let dataSource = list.map(function(i){return i.tbslrefundcreditvo;});
    const columns = [
      {
        title:'融资时间',
        dataIndex:'realLoanDate',
        key:'realLoanDate'
      },
      {
        title:'融资编号',
        dataIndex:'code',
        key:'code'
      },
      {
        title:'待还本金(元)',
        dataIndex:'totalNotPaybackAmount',
        key:'totalNotPaybackAmount',
        render:val=>money100(val)
      },
      {
        title:'待还利息(元)',
        dataIndex:'totalNotPaybackRate',
        key:'totalNotPaybackRate',
        render:val=>money100(val)
      },
      {
        title:'待还展期服务费(元)',
        dataIndex:'totalNotPaybackRenewedAmount',
        key:'totalNotPaybackRenewedAmount',
        render:val=>money100(val)
      },
      {
        title:'日利率(%)',
        dataIndex:'fee',
        key:'fee'
      },
      {
        title:'本次还款金额(元)',
        dataIndex:'bchkje',
        key:'bchkje',
        render:(val,rows)=>money100(Number(rows.refundPrinciple) + Number(rows.refundFee) + Number(rows.refundRenewedAmount))
      },
      {
        title:'本次还款本金(元)',
        dataIndex:'refundPrinciple',
        key:'refundPrinciple',
        render:val=>money100(val)
      },
      {
        title:'本次还款利息(元)',
        dataIndex:'refundFee',
        key:'refundFee',
        render:val=>money100(val)
      },
      {
        title:'本次还款展期服务费(元)',
        dataIndex:'refundRenewedAmount',
        key:'refundRenewedAmount',
        render:val=>money100(val)
      }
    ]
    return (
      <div className={styles.table}>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={row=>row.id}
        />
      </div>
    )
  }
}

export default SlloanrepaymentList
