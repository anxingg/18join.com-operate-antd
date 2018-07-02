/**
 * Created by fcb on 2017/5/10.
 */
import React,{PropTypes} from 'react'
import styles from './slLoanSearch.less'
import {Select} from 'antd'

const Option = Select.Option;
class QueryApplicationStatus extends React.Component{
  render(){
    const {queryStatusFun} = this.props;

    return (
      <div>
        <label>申请状态：</label>
        <Select defaultValue="10" className={styles.queryStatus} onChange={(e)=>queryStatusFun(e)} >
          <Option value="">全部</Option>
          <Option value="10">已提交实名信息</Option>
          <Option value="11">存量商户已提交实名信息</Option>
          <Option value="12">存量商户已提交上下游合同</Option>
          <Option value="13">存量商户已提交模糊授信xls</Option>
          <Option value="14">存量商户已提交电商平台账号密码</Option>
          <Option value="1">存量商户已提交授信申请</Option>
          <Option value="2">保理员已授信</Option>
          <Option value="31">风控审核通过</Option>
          <Option value="32">风控审核拒绝</Option>
          <Option value="4">保理员授信不通过</Option>
          <Option value="5">用户确认做此业务</Option>
          <Option value="6">用户已提交保理合同</Option>
          <Option value="7">用户提交的保理合同审核通过</Option>
          <Option value="8">用户提交的保理合同审核不通过</Option>
        </Select>
      </div>
    )
  }
}

export default QueryApplicationStatus;
