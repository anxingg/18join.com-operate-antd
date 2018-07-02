/**
 * Created by fcb on 2017/5/25.
 */
import React from 'react'
import {Table,Row,Col,Button} from 'antd'
import TransferBasicModal from './TransferBasicModal'
import ManualPartRefundModal from './manualPartRefundModal'
import styles from './slrepayment.less'

const columns = [
  {
    title:'融资编号',
    key:'code',
    dataIndex:'code'
  },
  {
    title:'平台',
    key:'platform',
    dataIndex:'platform'
  },
  {
    title:'融资时间',
    key:'realLoanTime',
    dataIndex:'realLoanTime'
  },
  {
    title:'待还本金(元)',
    key:'totalNotPaybackAmount',
    dataIndex:'totalNotPaybackAmount',
    render:text => text>0?text/100:0
  },
  {
    title:'待还利息(元)',
    key:'totalNotPaybackRate',
    dataIndex:'totalNotPaybackRate',
    render:text => text>0?text/100:0
  },
  {
    title:'日利率',
    key:'rate',
    dataIndex:'rate'
  },
  {
    title:'待还展期服务费(元)',
    key:'totalNotPaybackRenewedAmount',
    dataIndex:'totalNotPaybackRenewedAmount',
    render:text => text>0?text/100:0
  }
]
class SlRepaymentList extends React.Component{
  state = {
    totalNotPaybackAmount: 0,
    totalNotPaybackRate:0,
    totalNotPaybackRenewedAmount:0,
    selectedRows:[]
  }
  render(){
    const {list,accountBalance,queryBalance,mhtno,manualRechargeAccountToBase,manualPartRefund,loanInfoVo,RSAKey} = this.props
    const {totalNotPaybackAmount,totalNotPaybackRate,totalNotPaybackRenewedAmount,selectedRows} = this.state
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

        let sumTotalNotPaybackAmount = 0;       //待还本金总计
        let sumTotalNotPaybackRate = 0;         //待还利息总计
        let sumTotalNotPaybackRenewedAmount = 0;//待还展期服务费总计

        selectedRows.forEach(function(v,i){
          sumTotalNotPaybackAmount += parseFloat(v.totalNotPaybackAmount,10)    //待还本金总计
          sumTotalNotPaybackRate += parseFloat(v.totalNotPaybackRate,10)    //待还本金总计
          sumTotalNotPaybackRenewedAmount += parseFloat(v.totalNotPaybackRenewedAmount,10)    //待还展期服务费总计
        })

        this.setState({
          totalNotPaybackAmount:sumTotalNotPaybackAmount,
          totalNotPaybackRate:sumTotalNotPaybackRate,
          totalNotPaybackRenewedAmount:sumTotalNotPaybackRenewedAmount,
          selectedRows:selectedRows
        })
      }
    };

    const TransferBasicModalProps = {
      mhtno:mhtno,
      queryBalance:queryBalance,
      manualRechargeAccountToBase:manualRechargeAccountToBase
    }

    const ManualPartRefundModalProps = {
      mhtno:mhtno,
      RSAKey:RSAKey,
      queryBalance:queryBalance,  //结算户余额
      selectedRows:selectedRows,
      loanInfoVo:loanInfoVo,
      totalAmount:totalNotPaybackAmount + totalNotPaybackRate + totalNotPaybackRenewedAmount,   //选中待还合计
      manualPartRefund:manualPartRefund
    }

    return (
      <div className={styles.table}>
        <Table
          bordered
          dataSource={list}
          columns={columns}
          rowKey={record=>record.id}
          rowSelection={rowSelection}
        />
        <Row type="flex" justify="space-between" className={styles.mTop15}>
          <Col span={6}>待还本金总计(元)：{(this.state.totalNotPaybackAmount/100).toFixed(2)}</Col>
          <Col span={6}>待还利息总计(元)：{(this.state.totalNotPaybackRate/100).toFixed(2)}</Col>
          <Col span={6}>待还展期服务费总计(元)：{(this.state.totalNotPaybackRenewedAmount/100).toFixed(2)}</Col>
          <Col span={6}><b>待还总计(元)：{((this.state.totalNotPaybackAmount+this.state.totalNotPaybackRate+this.state.totalNotPaybackRenewedAmount)/100).toFixed(2)}</b></Col>
        </Row>
        <Row className={styles.mTop15}>
          <Col span={5} offset={19}>
            <TransferBasicModal {...TransferBasicModalProps} />
            <ManualPartRefundModal {...ManualPartRefundModalProps} />
          </Col>
        </Row>
      </div>
    )
  }
}
export default SlRepaymentList
