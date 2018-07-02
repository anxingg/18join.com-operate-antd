/**
 * Created by fcb on 2017/8/15.
 */
import React from 'react';
import {Table,Button} from 'antd';
import {Link} from 'dva/router';
import ContractRenewAuditModal from './contractRenewAuditModal'
import RenewedDetails from './renewedDetails'

class ContractRenewAuditList extends React.Component {
  render(){
    const {list,audit,reject,loading} = this.props;
    const columns = [
      {
        title:'申请用户',
        dataIndex:'label',
        key:'label'
      },
      {
        title:'续签类型',
        dataIndex:'value',
        key:'value',
        render:(val,row)=><RenewedDetails row={row} />
      },
      {
        title:'描述',
        dataIndex:'description',
        key:'description'
      },
      {
        title:'当前有效期',
        dataIndex:'parentId',
        key:'parentId'
      },
      {
        title:'申请时间',
        dataIndex:'createDate',
        key:'createDate'
      },
      {
        title:'操作',
        dataIndex:'value',
        key:'valueOperate',
        render:(val,row)=>val=='blht'?<Link to={`/contractReviewAuditTwo?joinuserid=${row.extra.joinUserId}&id=${row.id}`}>审核</Link>:<span><ContractRenewAuditModal reject={reject} audit={audit} row={row} /><Link target="_blank" to={`/api/renew/${row.id}/download?id=${row.id}`}>下载</Link></span>
      }
    ]
    return (
      <div>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={list}
          // rowKey={}
        />
      </div>
    )
  }
}

export default ContractRenewAuditList;
