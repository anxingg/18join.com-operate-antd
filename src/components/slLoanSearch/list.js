/**
 * Created by fcb on 2017/5/8.
 */
import React,{PropTypes} from 'react'
import {Table } from 'antd'
import OpenFinancial from './openFinancialModal'
import styles from './slLoanSearch.less'

class FirstSlLoan extends React.Component {
  render (){
    const {list,loadding,createFinanceAccount} = this.props;
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
        title:'申请状态',
        dataIndex:'loanstatus',
        key:'loanstatus',
        render:function(val){
          if(val===''){
            return "全部";
          }else if(val===10){
            return "已提交实名信息";
          }else if(val===11){
            return "存量商户已提交实名信息";
          }else if(val===12){
            return "存量商户已提交上下游合同";
          }else if(val===13){
            return "存量商户已提交模糊授信xls";
          }else if(val===14){
            return "存量商户已提交电商平台账号密码";
          }else if(val===1){
            return "存量商户已提交授信申请";
          }else if(val===2){
            return "保理员已授信";
          }else if(val===31){
            return "风控审核通过";
          }else if(val===32){
            return "风控审核拒绝";
          }else if(val===4){
            return "保理员授信不通过";
          }else if(val===5){
            return "用户确认做此业务";
          }else if(val===6){
            return "用户已提交保理合同";
          }else if(val===7){
            return "用户提交的保理合同审核通过";
          }else if(val===8){
            return "用户提交的保理合同审核不通过";
          }else{
            return '暂无';
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
        dataIndex:'operation',
        key:'operation',
        render:(text,record,index) => record.memo==0?<OpenFinancial mhtno={record.mhtno} onOk={createFinanceAccount} />:record.memo>0?<b>已开通</b>:暂无
      }
    ]

    return(
        <div>
          <Table
            className={styles.table}
            bordered
            dataSource={list}
            columns={columns}
            loadding={loadding}
            rowKey={record=>record.id}
          />
        </div>
    )
  }
}

export default FirstSlLoan
