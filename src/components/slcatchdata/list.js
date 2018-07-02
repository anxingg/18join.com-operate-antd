/**
 * Created by fcb on 2017/7/13.
 */
import React from 'react';
import {Table,Tag } from 'antd';
import styles from './slcatchdata.less';
import {money100} from '../../utils/index';

class SlcatchdataList extends React.Component{
  render(){
    const {list,loading} = this.props;
    const columns  = [
      {
        title:'商户名',
        dataIndex:'mhtname',
        key:'mhtname'
      },
      {
        title:'平台名称',
        dataIndex:'platformCnname',
        key:'platformCnname'
      },
      {
        title:'登录名',
        dataIndex:'platformUname',
        key:'platformUname'
      },
      {
        title:'起始合计',
        dataIndex:'beforetotalAll',
        key:'beforetotalAll',
        render:text => money100(text)
      },
      {
        title:'合计',
        dataIndex:'totalAll',
        key:'totalAll',
        render:text =>  money100(text)
      },
      {
        title:'合计差额',
        dataIndex:'totalChaE',
        key:'totalChaE',
        render:function(text,record){
          let num = (record.totalAll)-(record.beforetotalAll);
          let b = (record.totalAll-record.beforetotalAll)==0?0:(record.totalAll-record.beforetotalAll)/record.beforetotalAll;
          if(num > 100000 || b > 0.1 || b < -0.1){
            return <Tag color="#f50" >{ money100(num)}</Tag>
          }else{
            return <Tag color="#2db7f5">{ money100(num)}</Tag>
          }
        }
      },
      {
        title:'统计合计金额规则',
        dataIndex:'platformMemo',
        key:'platformMemo',
        render:function(text,record){
          if(record.platformName==='Supplier_SUNING'&&record.dxsupplier){
            return "[代销-未付款的结算单]";
          }else{
            return text;
          }
        }
      },
      {
        title:'待结算已开票',
        dataIndex:'totalUnpaySettleorder',
        key:'totalUnpaySettleorder',
        render:text=>text==0?'':money100(text)
      },
      {
        title:'待结算未开票',
        dataIndex:'totalUnpaySettleorderCheck',
        key:'totalUnpaySettleorderCheck',
        render:text=>text==0?'':money100(text)
      },
      {
        title:'库存(订单)',
        dataIndex:'kucun',
        key:'kucun',
        render:function(text,record){
          let num = money100(record.totalUnsettleInstoreorder +record.totalUnenterinRefundorder);
          if(num==0){
            return ''
          }else{
            return num
          }
        }
      },
      {
        title:'已付款金额',
        dataIndex:'totalPaySettleorder',
        key:'totalPaySettleorder',
        render:text=>text==0?'':money100(text)
      },
      {
        title:'待结算已开票差额',
        dataIndex:'daijieusanyikaipiaochae',
        key:'daijieusanyikaipiaochae',
        render:function(text,record){
          let num = money100(record.totalUnpaySettleorder - record.beforetotalUnpaySettleorder);
          if(num==0){
            return ''
          }else{
            return num
          }
        }
      },
      {
        title:'待结算未开票差额',
        dataIndex:'daijiesuanweikai',
        key:'daijiesuanweikai',
        render:function(text,record){
          let num = money100(record.totalUnpaySettleorderCheck - record.beforetotalUnpaySettleorderCheck);
          if(num==0){
            return ''
          }else{
            return num
          }
        }
      },
      {
        title:'库存(订单)差额',
        dataIndex:'kucuncha',
        key:'kucuncha',
        render:function(text,record){
          let num = money100(record.totalUnsettleInstoreorder +record.totalUnenterinRefundorder-record.beforetotalUnsettleInstoreorder-record.beforetotalUnenterinRefundorder);
          if(num==0){
            return ''
          }else{
            return <Tag color="#f50">{num}</Tag>
          }
        }
      },
      {
        title:'已付款差额',
        dataIndex:'yifukuanchae',
        key:'yifukuanchae',
        render:function(text,record){
          let num = money100(record.totalPaySettleorder - record.beforetotalPaySettleorder);
          if (num == 1) {
            return 0;
          } else {
            return num
          }
        }
      },
      {
        title:'数据抓取时间',
        dataIndex:'rowUpdateTime',
        key:'rowUpdateTime'
      }
    ]
    return (
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

export default SlcatchdataList
