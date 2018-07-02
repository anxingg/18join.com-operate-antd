import React, { PropTypes } from 'react'
import { Table } from 'antd'
import styles from './queryAllSlLoanBanlance.less'

function list ({
  loading,
  dataSource,
}) {
  // const footer = (dada) => 'Here is footer';
  const footer = function(data){
    let totalAvailableCredit = 0;
    let totalNotPaybackAmount = 0;
    let totalNotPaybackRateAndFee = 0;
    data.forEach(function(value,index){
      totalAvailableCredit = totalAvailableCredit + parseInt(value.availableCredit,10);
      totalNotPaybackAmount = totalNotPaybackAmount + parseInt(value.totalNotPaybackAmount,10);
      totalNotPaybackRateAndFee = totalNotPaybackRateAndFee + parseInt(value.totalNotPaybackRateAndFee,10);
    })
    return '本页合计可提限额(元)：'+totalAvailableCredit/100 + ' ，本页合计已融资本金(元)：'+totalNotPaybackAmount/100 + ' ，本页合计待还利息(元)：'+totalNotPaybackRateAndFee;
  }

  const columns = [
    {
      title: '商户名',
      dataIndex: 'mhtname',
      key: 'mhtname',
    },
    {
      title: '商户电话',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: '应收总额(元)',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render:value => value <=0?<b className={styles.colorRed}>{value/100}</b>:value/100
    },
    {
      title: '可提现额(元)',
      dataIndex: 'availableCredit',
      key: 'availableCredit',
      render:value => value <=0?<b className={styles.colorRed}>{value/100}</b>:value/100
    },
    {
      title: '已融资本金(元)',
      dataIndex: 'totalNotPaybackAmount',
      key: 'totalNotPaybackAmount',
      render:value =>value/100
    },
    {
      title: '待还利息(元)',
      dataIndex: 'totalNotPaybackRateAndFee',
      key: 'totalNotPaybackRateAndFee',
      render:value =>value/100
    }
  ]

  return (
    <div>
      <Table
        className={styles.table}
        bordered
        footer={footer}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.idOfTbMerchantUser}
      />
    </div>
  )
}

list.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.any,
}

export default list
