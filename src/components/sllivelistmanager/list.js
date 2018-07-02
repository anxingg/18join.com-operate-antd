/**
 * Created by fcb on 2017/5/11.
 */
import React,{PropTypes} from 'react'
import {Table,Pagination} from 'antd'
import {Link} from 'dva/router'
import styles from './list.less'
import {PAGE_SIZE,PAGE} from '../../constants'

class SlLiveList extends React.Component{
  render(){
    const columns = [
      {
        title:'主键',
        key:'id',
        dataIndex:'id'
      },
      {
        title:'九盈id',
        key:'idOfTbMerchantUser',
        dataIndex:'idOfTbMerchantUser'
      },
      {
        title:'商户名',
        key:'mhtname',
        dataIndex:'mhtname'
      },
      {
        title:'手机号',
        key:'mobile',
        dataIndex:'mobile'
      },
      {
        title:'展期服务费',
        key:'renewedServicefee',
        dataIndex:'renewedServicefee',
        render:value => value==null||value==''?'--':value+'%'
      },
      {
        title:'展期手续费率',
        key:'renewedFee',
        dataIndex:'renewedFee',
        render:value => value==null||value==''?'--':value+'%'
      },
      {
        title:'展期日利率',
        key:'renewedRate',
        dataIndex:'renewedRate',
        render:value => value==null||value==''?'--':value+'%'
      },
      {
        title:'罚息日利率',
        key:'penalty',
        dataIndex:'penalty',
        render:value => value==null||value==''?'--':value+'%'
      },
      {
        title:'合同有效期',
        key:'creditEndDate',
        dataIndex:'creditEndDate'
      },
      {
        title:'最后修改时间',
        key:'rowUpdateTime',
        dataIndex:'rowUpdateTime'
      },
      {
        title:'操作',
        key:'operate',
        dataIndex:'operate',
        render:(value,record) => <Link to={`/sllivelistmanager/slplatform?joinuserid=${record.idOfTbMerchantUser}`}>修改授信</Link>
      },
    ]
    const {list,loading,totalCount} = this.props
    return (
      <div>
        <Table
          className={styles.table}
          bordered
          dataSource={list}
          columns={columns}
          loading={loading}
          pagination={true}
          rowKey={record => record.id}
        />
      </div>
    )
  }
}

export default SlLiveList
