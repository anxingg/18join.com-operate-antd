/**
 * Created by fcb on 2017/7/18.
 */
import React from 'react';
import {Table,Tag} from 'antd';
import {money100,urlParam} from '../../utils/index';
import {Link} from 'dva/router'
import styles from './SupplyChainLoan.less'

const columns = [
  {
    title:'商户名',
    dataIndex:'mhtname',
    key:'mhtname'
  },
  {
    title:'商户电话',
    dataIndex:'mobile',
    key:'mobile'
  },
  {
    title:'电商平台名称',
    dataIndex:'platformCnname',
    key:'platformCnname'
  },
  {
    title:'电商平台用户',
    dataIndex:'username',
    key:'username'
  },
  {
    title:'日利率(%)',
    dataIndex:'rate',
    key:'rate'
  },
  {
    title:'可融资额(元)',
    dataIndex:'availableCredit',
    key:'availableCredit',
    render:function(value,row){
      if(((row.totalAmount*row.discount/100))>row.maxAmount){
        return <Tag color="#f50">{money100(value)}</Tag>;
      }else{
        return <Tag color="#2db7f5">{money100(value)}</Tag>;
      }
    }
  },
  {
    title:"实际应收额(元)",
    dataIndex:'totalAmount',
    key:"totalAmount",
    render:(val,row)=>money100(row.totalAmount*(row.discount/100).toFixed(0))
  },
  {
    title:'已提现额(元)',
    dataIndex:'totalNotPaybackAmount',
    key:'totalNotPaybackAmount',
    render:val=>money100(val)
  },
  {
    title:'操作',
    dataIndex:'operate',
    key:'operate',
    render:(val,row)=><Link to={`/SupplyChainLoan/DetermineAmount?joinidstr=${row.idOfTbMerchantUser}`}>放款</Link>
  }
]
class SupplyChainLoanList extends React.Component{
  render(){
    const {list,loading} = this.props;

    const footer = function(list){
      let availableCredit = 0;
      let totalAmount = 0;
      let totalNotPaybackAmount = 0;
      list.forEach(function(value,index){
        availableCredit = availableCredit + parseInt(value.availableCredit,10);
        totalAmount = totalAmount + parseInt(value.totalAmount,10);
        totalNotPaybackAmount = totalNotPaybackAmount + parseInt(value.totalNotPaybackAmount,10);
      })
      return '本页合计可融资额(元)：'+money100(availableCredit) + ' ，本页合计实际应收额(元)：'+money100(totalAmount) + ' ，本页合计已提现额(元)：'+money100(totalNotPaybackAmount);
    }

    return (
      <div className={styles.table}>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={list}
          rowKey={record=>record.id}
          footer={footer}
        />
      </div>
    )
  }
}

export default SupplyChainLoanList;
