/**
 * Created by fcb on 2017/8/4.
 */
import React from 'react';
import {Table,Tag} from 'antd';
import {Link} from 'dva/router';
import {money100} from '../../utils/index';
import styles from './list.less';

class FinancingList extends React.Component {
  render(){
    const {list,isRepayment,loading} = this.props;
    let newItems=[],index=0;
    for (let v of list) {
      if(v.detailVoList!=undefined){
        for (let i of v.detailVoList){
          // delete v.detailVoList;
          index++;i.index = index;

          let obj = Object.assign(i,v,index);
          newItems.push(obj);
        }
      }
    }

    const columns = [
      {
        title:'商户名',
        dataIndex:'mchName',
        key:'mchName',
        render:(text,row,index)=>{
          const obj = {
            children: text,
            props: {}
          }

          if (index !== 0) {
            obj.props.rowSpan = 0;
          }else{
            obj.props.rowSpan = newItems.length;
          }

          return obj;
        }
      },
      {
        title:'手机号',
        dataIndex:'mobile',
        key:'mobile',
        render:(text,row,index)=>{
          const obj = {
            children: text,
            props: {}
          }

          if (index !== 0) {
            obj.props.rowSpan = 0;
          }else{
            obj.props.rowSpan = newItems.length;
          }

          return obj;
        }
      },
      {
        title:'融资编号',
        dataIndex:'code',
        key:'code'
      },
      {
        title:'融资日期',
        dataIndex:'realLoanTime',
        key:'realLoanTime'
      },
      {
        title:'融资金额(元)',
        dataIndex:'accountDelta',
        key:'accountDelta',
        render:val=>money100(val)
      },
      {
        title:'未还融资本金(元)',
        dataIndex:'totalNotPaybackAmount',
        key:'totalNotPaybackAmount',
        render:val=>money100(val)
      },
      {
        title:'状态',
        dataIndex:'creditstatus',
        key:'creditstatus',
        render:val=>val==6?<Tag color="#2db7f5">已还清</Tag>:<Tag color="#f50">未还清</Tag>
      },
      {
        title:'融资申请书',
        dataIndex:'materialDownload',
        key:'materialDownload',
        render:(val,row)=>val!=''?<Link target="_blank" to={`/operate/downloadSlLoanMaterial?id=${row.id}`}>下载</Link>:'无'
      },
      {
        title:'付款通知',
        dataIndex:'paymentNotice',
        key:'paymentNotice',
        render:(val,row)=>val!=''?<Link target="_blank" to={`/operate/downloadSLFileById?fileid=${val}`}>下载</Link>:'无'
      },
      {
        title:'融资总额(元)',
        dataIndex:'accountDeltaSum',
        key:'accountDeltaSum',
        render:(text,row,index)=>{
          const obj = {
            children: money100(text),
            props: {}
          }

          if (index !== 0) {
            obj.props.rowSpan = 0;
          }else{
            obj.props.rowSpan = newItems.length;
          }

          return obj;
        }
      },
      {
        title:'未还融资本金总额(元)',
        dataIndex:'totalNotPaybackAmountSum',
        key:'totalNotPaybackAmountSum',
        render:(text,row,index)=>{
          const obj = {
            children: money100(text),
            props: {}
          }

          if (index !== 0) {
            obj.props.rowSpan = 0;
          }else{
            obj.props.rowSpan = newItems.length;
          }

          return obj;
        }
      }
    ]
    return (
      <div style={{display:isRepayment}} className={styles.table}>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={newItems}
          rowKey={record=>record.id}
        />
      </div>
    )
  }
}

export default FinancingList
