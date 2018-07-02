/**
 * Created by fcb on 2017/8/4.
 */
import React from 'react';
import {Table,Tag} from 'antd';
import {money100} from '../../utils/index';
import styles from './list.less';

class RepaymentList extends React.Component {
  render(){
    const {list,isRepayment,loading} = this.props;

    let newItems=[],index=0;
    for (let v of list) {
      if(v.refundDetailVoList!=undefined){
        for (let i of v.refundDetailVoList){
          index++;i.index = index;
          let obj = Object.assign(i,v,index);

          // delete v.refundDetailVoList;
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
        key:'code',
        // render:(text,row,index)=>{
        //   console.log(text,row,index)
        // }
      },
      {
        title:'应还本金(元)',
        dataIndex:'shouldRefundPrinciple',
        key:"shouldRefundPrinciple",
        render:val=>money100(val)
      },
      {
        title:'还款日期',
        dataIndex:'refundDate',
        key:'refundDate',
      },
      {
        title:'还款本金(元)',
        dataIndex:'refundPrinciple',
        key:'refundPrinciple',
        render:val=>money100(val)
      },
      {
        title:'还款利息(元)',
        dataIndex:'refundRate',
        key:'refundRate',
        render:val=>money100(val)
      },
      {
        title:'状态',
        dataIndex:'creditstatus',
        key:'creditstatus',
        render:val=>val==6?<Tag color="#2db7f5">已还清</Tag>:<Tag color="#f50">未还清</Tag>
      },
      {
        title:'还款本金总额(元)',
        dataIndex:'refundPrincipleSum',
        key:'refundPrincipleSum',
        render:(text,row,index)=>{
          const obj = {
            children:money100(text) ,
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
        title:'还款利息总额(元)',
        dataIndex:'refundRateSum',
        key:'refundRateSum',
        render:(text,row,index)=>{
          const obj = {
            children:money100(text) ,
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
        title:'合计(元)',
        dataIndex:'total',
        key:'total',
        render:(text,row,index)=>{
          // let num = money100(parseFloat(row.refundPrincipleSum)+parseFloat(row.refundRateSum))
          const obj = {
            children:money100(parseFloat(row.refundPrincipleSum)+parseFloat(row.refundRateSum)) ,
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
      <div style={{display:isRepayment}}  className={styles.table}>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={newItems}
          // rowKey={record=>record.id}
        />
      </div>
    )
  }
}
export default RepaymentList
