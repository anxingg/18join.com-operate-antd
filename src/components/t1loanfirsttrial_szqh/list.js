/**
 * Created by fcb on 2017/10/30.
 */
import React,{PropTypes} from 'react';
import {Table,Button,Modal,Tooltip} from 'antd';
import {money100} from '../../utils/index';
import styles from './list.less';
import CreditLoanModal from './creditLoanModal';
import RefyseLoanModal from './refuseLoanModal';

class LoanFirstTrialListSZQH extends React.Component {
  render(){
    const {loading,list,creditApprove,creditRefuse} = this.props;
    const columns = [
      {
        title:'商户号',
        dataIndex:'mhtno',
        key:'mhtno'
      },
      {
        title:'商户名',
        dataIndex:'mhtname',
        key:'mhtname',
        render:function(value){
          let content=(typeof value==='string')&&value.length>8?value.substring(0,13):value;
          let content2=(typeof value==='string')&&value.length>8?value.substring(37,value.length):value;
          return content+ '_' +content2
        }
      },
      {
        title:'邮箱',
        dataIndex:'mobile',
        key:'mobile'
      },
      {
        title:'交易时间',
        dataIndex:'transdate',
        key:'transdate'
      },
      {
        title:'文件个数',
        dataIndex:'ftpfileCount',
        key:'ftpfileCount',
        render:function(val,row){
          if(val!=24){
            return <Tooltip placement="topLeft" title={row.hour_of_ftpfiles} arrowPointAtCenter>{val}</Tooltip>
          }
        }
      },
      {
        title:'垫付业务类型',
        dataIndex:'operation_type',
        key:'operation_type',
        render:function(val){
          if(val==="T0_LOAN_CREDIT"){
            return "T0垫付";
          }else if(val==="T1_LOAN_CREDIT"){
            return "T1垫付";
          }else if(val==="D1_LOAN_CREDIT"){
            return "D1垫付";
          }else if(val==="D0_LOAN_CREDIT"){
            return "D0垫付";
          }else{
            return "未知";
          }
        }
      },
      {
        title:'交易金额(元)',
        dataIndex:'unapproved_trans',
        key:'unapproved_trans',
        render:function(val){
          return money100(val)
        }
      },
      {
        title:'清算金额(元)',
        dataIndex:'unapproved_clearing',
        key:'unapproved_clearing',
        render:function(val){
          return money100(val)
        }
      },
      {
        title:'放款净额(元)',
        dataIndex:'unapproved_net',
        key:'unapproved_net',
        render:function(val){
          return money100(val)
        }
      },
      {
        title:'手续费(元)',
        dataIndex:'fee',
        key:'fee',
        render:function(val){
          return money100(val)
        }
      },
      {
        title:'利息(元)',
        dataIndex:'ratio',
        key:'ratio',
        render:function(val){
          return money100(val)
        }
      },
      {
        title:'申请时间',
        dataIndex:'applytime',
        key:'applytime'
      },
      {
        title:'操作',
        dataIndex:'operate',
        key:'operate',
        render:function(val,row){
          const modalprops = {
            joinuserid : row.idOfTbMerchantUser,
            transdate : row.transdate,
            operatetype : row.operation_type,
            realnetamount : row.unapproved_net.replace(/\,/g, ''),
            creditApprove:creditApprove,
            creditRefuse:creditRefuse
          }
          return <div><CreditLoanModal {...modalprops} /><RefyseLoanModal {...modalprops} /></div>
        }
      }
    ]
    return (
      <div>
        <Table
          className={styles.table}
          bordered
          columns={columns}
          loading={loading}
          dataSource={list}
          // rowKey=""
        />
      </div>
    )
  }
}
export default LoanFirstTrialListSZQH;
