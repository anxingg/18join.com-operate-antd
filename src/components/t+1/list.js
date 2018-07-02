/**
 * Created by fcb on 2017/10/12.
 */
import React from 'react';
import {Table,Select,Button} from 'antd';
import CreateFinanceAccountModal from './CreateFinanceAccountModal';
import SetFinanceAccountModal from './SetFinanceAccountModal';
import RefuseFinanceAccountModal from './RefuseFinanceAccountModal'
import styles from './list.less';

const Option = Select.Option;
class DfList extends React.Component {
  handleChange = (e) =>{
    if(e===0||e==='0'){
      this.props.queryAllTxLoanLiveInfoByApplying()
    }else{
      this.props.queryAllT0LoanLiveInfoByStatus(e)
    }
  }
  render(){
    const {list,loading,updateTxLoanLiveInfoAndCreateFinanceAccount,updateTxLoanLiveInfoApplyNoPassByLiveID,updateTxLoanLiveInfoAndSetFinanceAccountAndRatio} = this.props;

    const columns = [
      {
        title:'商户名',
        dataIndex:'mhtname',
        key:'mhtname'
      },
      {
        title:'手机号',
        dataIndex:'mobile',
        key:'mobile'
      },
      {
        title:'垫付业务类型',
        dataIndex:'operationType',
        key:'operationType',
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
        title:'申请状态',
        dataIndex:'loanstatus',
        key:'loanstatus',
        render:function(val){
          if(val===-1){
            return "申请拒绝";
          }else if(val===1||val===2){
            return "申请中";
          }else if(val===3){
            return "申请成功";
          }else{
            return "未知";
          }
        }
      },
      {
        title:'申请时间',
        dataIndex:'rowUpdateTime',
        key:'rowUpdateTime'
      },
      {
        title:'操作',
        dataIndex:'operate',
        key:'operate',
        render:function(text,row){
          let modalProps = {
            updateTxLoanLiveInfoAndCreateFinanceAccount:updateTxLoanLiveInfoAndCreateFinanceAccount,
            updateTxLoanLiveInfoApplyNoPassByLiveID:updateTxLoanLiveInfoApplyNoPassByLiveID,
            updateTxLoanLiveInfoAndSetFinanceAccountAndRatio:updateTxLoanLiveInfoAndSetFinanceAccountAndRatio,
            operatetype:row.operationType,
            liveid:row.id,
            pagets:row.rowUpdateTime
          }
          if(row.loanstatus===2||row.loanstatus==='2'){
            return <SetFinanceAccountModal {...modalProps} />
          }else if(row.loanstatus===1||row.loanstatus==='1'){
            return <div><div><CreateFinanceAccountModal {...modalProps} /></div> <div><RefuseFinanceAccountModal {...modalProps} /></div></div>
          }else{
            return '暂无'
          }
        }
      }
    ]
    return (
      <div>
        申请状态：
        <Select onChange={(e)=>this.handleChange(e)} defaultValue="0" style={{marginBottom:20,width:200}}>
          <Option value="">全部</Option>
          <Option value="0" >申请中</Option>
          <Option value="-1">申请拒绝</Option>
          <Option value="3">申请成功</Option>
        </Select>

        <Table
          className={styles.table}
          bordered
          loading={loading}
          dataSource={list}
          columns={columns}
          rowKey={record=>record.id}
        />
      </div>
    )
  }
}
export default DfList;
