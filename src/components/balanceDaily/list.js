/**
 * Created by fcb on 2017/8/11.
 */
import React from 'react';
import {Table} from 'antd';
import {money100} from '../../utils/index'
import {Link} from 'dva/router';
import styles from './list.less'

class BalanceDailyList extends React.Component {
  render(){
    const {list,loading} = this.props;
    const columns = [
      {
        title:'商户名',
        dataIndex:'mchName',
        key:'mchName',
      },
      {
        title:'融资余额(元)',
        dataIndex:'totalNotPayBackAmount',
        key:'totalNotPayBackAmount',
        render:val=>money100(val)
      },
      {
        title:'实时对账明细',
        dataIndex:'idOfTbMerchantUser',
        key:'idOfTbMerchantUser',
        render:val=>val!=undefined?<Link>下载</Link>:'暂无'
      }
    ]
    return (
      <div className={styles.table} style={{marginTop:10}}>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={list}
          rowKey={record=>record.idOfTbMerchantUser}
        />
      </div>
    )
  }
}

export default BalanceDailyList;
