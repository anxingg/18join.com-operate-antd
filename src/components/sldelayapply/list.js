/**
 * Created by fcb on 2017/6/7.
 */
import React from 'react'
import {Table} from 'antd'
import {Link} from 'dva/router'
import styles from './sldelayapply.less'

class SldelayapplyTable extends React.Component {

  render(){
    const {list,loading} = this.props
    const columns = [
      {
        title:'商户名',
        key:'mhtname',
        dataIndex:'mhtname'
      },
      {
        title:'id',
        key:'id',
        dataIndex:'id'
      },
      {
        title:'电商平台',
        key:'platformCnname',
        dataIndex:'platformCnname'
      },
      {
        title:'平台账号',
        key:'userName',
        dataIndex:'userName'
      },
      {
        title:'融资编号',
        key:'code',
        dataIndex:'code'
      },
      {
        title:'融资本金(元)',
        key:'accountDelta',
        dataIndex:'accountDelta',
        render:value => (value/100).toFixed(2)
      },
      {
        title:'未还融资本金(元)',
        key:'totalNotPaybackAmount',
        dataIndex:'totalNotPaybackAmount',
        render:value => (value/100).toFixed(2)
      },
      {
        title:"未还融资利息(元)",
        key:'totalNotPaybackFee',
        dataIndex:'totalNotPaybackFee',
        render:value => (value/100).toFixed(2)
      },
      {
        title:'剩余到期天数(天)',
        key:'days',
        dataIndex:'days'
      },
      {
        title:'状态',
        key:'renewedStatus',
        dataIndex:'renewedStatus',
        render:function(value){
          if(value==="N"){
            return "待审核";
          }else if(value==="Y"){
            return "已审核";
          }else if(value==="R"){
            return "已拒绝";
          }else{
            return "暂无";
          }
        }
      },
      {
        title:"操作",
        key:'operate',
        render:function(value,row) {
          if (row.renewedStatus === "N") {
            return <Link to={`/sldelayapply/sldelayexamine?id=${row.id}&see=1&joinuserid=${row.userIdOfJoinOfDebtor}&row=${JSON.stringify(row)}`}>审核</Link>
          } else if (row.renewedStatus === "Y") {
            return <Link to={`/sldelayapply/sldelayexamine?id=${row.id}&see=0&joinuserid=${row.userIdOfJoinOfDebtor}&row=${JSON.stringify(row)}`}>查看</Link>
          } else if (row.renewedStatus === "R") {
            return "已拒绝";
          } else {
            return "暂无";
          }
        }
      }
    ]

    return (
      <div>
        <Table
          bordered
          loading={loading}
          className={styles.table}
          dataSource={list}
          columns={columns}
          rowKey={record => record.id}
        />
      </div>
    )
  }
}

export default SldelayapplyTable
