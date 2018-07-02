/**
 * Created by fcb on 2017/7/21.
 */
import React from 'react';
import {Table} from 'antd';
import {Link} from 'dva/router'
import {money100} from '../../utils/index';
import styles from './RepaymentRecord.less';

class RepaymentRecordTable extends React.Component{
  render(){
    const {list,joinidstr,loading} = this.props;
    const columns = [
      {
        title:'商户名',
        dataIndex:'mhtName',
        key:'mhtName',
        render:(value, row, index) => {
          const obj = {
            children: value,
            props: {},
          };

          if (index !== 0) {
            obj.props.rowSpan = 0;
          }else{
            obj.props.rowSpan = list.length;
          }
          
          return obj;
        }
      },
      {
        title:'商户电话',
        dataIndex:'mobile',
        key:'mobile',
        
      },
      {
        title:'电商平台类型',
        dataIndex:'platform',
        key:'platform'
      },
      {
        title:'电商平台用户',
        dataIndex:'username',
        key:'username'
      },
      {
        title:'融资编号',
        dataIndex:'code',
        key:'code'
      },
      {
        title:"融资本金",
        dataIndex:'totalNotPaybackAmount',
        key:'totalNotPaybackAmount',
        render:val=>money100(val)
      },
      {
        title:'应还利息',
        dataIndex:'totalNotPaybackRate',
        key:'totalNotPaybackRate',
        render:val=>money100(val)
      },
      {
        title:'融资时间',
        dataIndex:'realLoanTime',
        key:'realLoanTime'
      },
      {
        title:'操作',
        dataIndex:'operator',
        key:'operator',
        render:function(val,row,index){
          const obj = {
            children:<div>
                        <p><Link to={`/RepaymentRecord/slloanrepayment?joinid=${joinidstr}`}>还款</Link></p>
                        <p><Link to={`/RepaymentRecord/slschedule?joinid=${joinidstr}`}>还款明细</Link></p>
                        <p><Link target='_blank' to={`/operate/downloadSLCheckAccountFile?joinid=${joinidstr}`}>下载对账明细单</Link></p>
                      </div>,
            props: {}
          };

          if (index !== 0) {
            obj.props.rowSpan = 0;
          }else{
            obj.props.rowSpan = list.length;
          }
          return obj;
        }
      }
    ]

    return (
      <div className={styles.table}>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={list}
          rowKey={opt=>opt.id}
        />
      </div>
    )
  }
}

export default RepaymentRecordTable;
