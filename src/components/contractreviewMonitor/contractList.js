/**
 * Created by fcb on 2017/8/11.
 */
import React from 'react';
import {Table} from 'antd';
import {money100} from '../../utils/index';
import styles from './list.less'

class ContractList extends React.Component {
  render(){
    const {isFinancing,contractList,loading} = this.props;
    let newItems=[],index=0;
    for (let v of contractList) {
      if(v.tbPlatformExpireVoList!=undefined){
        for (let i of v.tbPlatformExpireVoList){
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
        dataIndex:'mhtname',
        key:'mhtname'
      },
      {
        title:'电商手机号',
        dataIndex:'mobile',
        key:'mobile'
      },
      {
        title:'营业执照到期日',
        dataIndex:'yyzzExpireDate',
        key:'yyzzExpireDate'
      },
      {
        title:'保理合同到期日',
        dataIndex:'creditEndDate',
        key:'creditEndDate',
      },
      {
        title:'平台',
        dataIndex:'platformCnname',
        key:'platformCnname',
      },
      {
        title:'上下游合同到期日',
        dataIndex:'contractExpireDate',
        key:'contractExpireDate'
      }
    ]

    return (
      <div style={{display:isFinancing}} className={styles.table}>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={newItems}
          // rowKey={}
        />
      </div>
    )
  }
}
export default ContractList;
