/**
 * Created by fcb on 2017/6/28.
 */
import React,{PropTypes} from 'react';
import {Table,Button} from 'antd';
import styles from './paltformcheck.less';
import PlatformUserCreditModal from './platformUserCreditModal';
import UpdatePlatformUserCreditCheckInfoModal from './updatePlatformUserCreditCheckInfoModal';
import BindFinaceaccountModal from './BindFinaceaccountModal';
import Suspendplatform from './updateplatformUser'
import AddFinaceaccount from './addFinaceaccountModal'

class PaltformcheckList extends React.Component{
  render(){
    const {list,loading, platformRule,queryplatformstatues,slPlatformUserCredit,updatePlatformUserCreditCheckInfo,queryFinaceaccount,queryFinaceaccountList,bindFinaceaccount,updateplatformUser,addFinaceaccount} = this.props;
    let queryplatformstatuesBuild = Object.keys(queryplatformstatues);
    const columns = [
      {
        title:'商户名',
        dataIndex:'mhtname',
        key:'mhtname'
      },
      {
        title:'平台名称',
        dataIndex:'platformCnname',
        key:'platformCnname',
        render:(val,row) => <a target="_blank" href={row.loginUrl}>{val}</a>
      },
      {
        title:'平台账户',
        dataIndex:'username',
        key:'username'
      },
      {
        title:"适用规则",
        dataIndex:'platformRuleId',
        key:'platformRuleId',
        render:function(value,row){
          let Rules = platformRule.find(function (x) { return x.id==value; });

          if(Rules!=undefined){
            return platformRule[0].name
          }else{
            return "默认规则";
          }
        }
      },
      {
        title:'上下游合同',
        dataIndex:'busiContract',
        key:'busiContract',
        render:(val,row) => <a target="_blank" href={'/operate/downloadSLContractFileByPlatformUser?platformuserid='+row.id}>查看上下游合同</a>
      },
      {
        title:'融资折扣',
        dataIndex:'discount',
        key:'discount',
        render:val => val!=''?val+'%':'--'
      },
      {
        title:'融资日利率',
        dataIndex:'rate',
        key:'rate',
        render:val => val!=''?val+'%':'--'
      },
      {
        title:'融资手续费率',
        dataIndex:'fee',
        key:'fee',
        render:val => val!=''?val+'%':'--'
      },
      {
        title:'最高融资额度',
        dataIndex:'maxAmount',
        key:'maxAmount',
        render:val => val<=0?0.00:(val/100).toFixed(2)
      },
      {
        title:'最长放款账期',
        dataIndex:'loanPeriod',
        key:'loanPeriod',
        render:val => val!=''?val+'天':'--'
      },
      {
        title:'授信凭证',
        dataIndex:'creditCertificate',
        key:'creditCertificate',
        render:(val,row) => row.creditCertificate==null?'--':<a target="_blank" href={'/operate/downloadSLCreditCertificateFile?platformuserid='+row.id}>查看授信凭证</a>
      },
      {
        title:'账号状态',
        dataIndex:'enableFlag',
        key:'enableFlag',
        render:val => val!=null?queryplatformstatues[val]:'--'
      },
      {
        title:'操作',
        dataIndex:'enableFlag',
        key:'operate',
        render:function(val,row){

          const modalProps = {
            id:row.id,
            joinuserid:row.idOfTbMerchantUser,
            rowUpdateTime:row.rowUpdateTime,
            slPlatformUserCredit:slPlatformUserCredit,
            updatePlatformUserCreditCheckInfo:updatePlatformUserCreditCheckInfo,
            queryFinaceaccount:queryFinaceaccount,
            queryFinaceaccountList:queryFinaceaccountList,
            bindFinaceaccount:bindFinaceaccount,
            updateplatformUser:updateplatformUser,
            addFinaceaccount:addFinaceaccount
          }

          if(val=='inited'){
            return <div>
                      <PlatformUserCreditModal {...modalProps} />
                      <UpdatePlatformUserCreditCheckInfoModal {...modalProps} />
                    </div>
          }else if(val=='paused'){
            return <div>
                        <Suspendplatform {...modalProps} />
                        <UpdatePlatformUserCreditCheckInfoModal {...modalProps} />
                    </div>
          }else if("enabled" == val && row.loanstatus === 7 && row.idOfFinaceaccount == ''){
            return <div>
                      <AddFinaceaccount {...modalProps} />
                      <BindFinaceaccountModal  {...modalProps} />
                      <UpdatePlatformUserCreditCheckInfoModal {...modalProps} />
                    </div>
          }else{
            return '--'
          }
        }
      }
    ];

    return(
      <div className={styles.table}>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={list}
        />
      </div>
    )
  }
}
export default PaltformcheckList
