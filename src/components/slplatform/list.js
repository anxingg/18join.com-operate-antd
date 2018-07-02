/**
 * Created by fcb on 2017/8/22.
 */
import React from 'react';
import {Table,Input,DatePicker,Popconfirm,Form} from 'antd'
import {Link} from 'dva/router'
import moment from 'moment'
import BindAlipay from './bindAlipay'
import UnBindAlipay from './unBindAlipay'

const FormItem = Form.Item;
class slplatformList extends React.Component {
  state = {
    arrList:this.props.arrList||[]
  }

  handleChangeSetState = (e,names,index,rows) =>{
    const value = e.target.value;
    let arr = this.state.arrList;

    if(arr[index]!=undefined){
      let arrnum = arr[index];
      if(names=='maxAmount'){
        arrnum[names]=Number(value*10000)
      }else{
        arrnum[names]=value
      }
    }

    this.setState({ arrList:arr })
    this.props.handleList(this.state.arrList)
  }
  render(){
    const {platformuserList,needBindAlipay,unNeedBindAlipay} = this.props;
    const columns = [
      {
        title:'电商平台名称',
        dataIndex:'platformCnname',
        key:'platformCnname'
      },
      {
        title:'登录用户名',
        dataIndex:'username',
        key:'username'
      },
      {
        title:'上下游合同',
        dataIndex:'busi_contract',
        key:'busi_contract'
      },
      {
        title:'登录地址',
        dataIndex:'loginUrl',
        key:'loginUrl',
        render:(val,row)=><Link target="_blank" to={`${row.loginUrl}`}>登录</Link>
      },
      {
        title:'绑定支付宝',
        dataIndex:'bindAlipay',
        key:'bindAlipay',
        render:function(val,row){
          if(row.platformName!=="Supplier_TMALL"){
            return "--";
          }
          if(val==='0'||val===''){
            return <BindAlipay needBindAlipay={needBindAlipay} rowId={row.id} />
          }else{
            return <UnBindAlipay unNeedBindAlipay={unNeedBindAlipay} rowId={row.id} />
          }
        }
      },
      {
        title: '融资折扣(%)',
        dataIndex: 'discount',
        key: 'discount',
        render: (val,rows,index)=><Input onChange={e => this.handleChangeSetState(e,`discount`,index,rows)} type="number" defaultValue={val}/>
      },
      {
        title:'融资日利率(%)',
        dataIndex:'rate',
        key:'rate',
        render:(val,rows,index)=><Input onChange={e => this.handleChangeSetState(e,`rate`,index,rows)} type="number" defaultValue={val} />
      },
      {
        title:'融资手续费率(%)',
        dataIndex:'fee',
        key:'fee',
        render:(val,rows,index)=><Input onChange={e => this.handleChangeSetState(e,`fee`,index,rows)} type="number" defaultValue={val} />
      },
      {
        title:'最高融资额度(万元)',
        dataIndex:'maxAmount',
        key:'maxAmount',
        render:(val,rows,index)=><Input onChange={e => this.handleChangeSetState(e,`maxAmount`,index,rows)} type="number" defaultValue={val/1000000} />
      },
      {
        title:'最长放款账期(天)',
        dataIndex:'loanPeriod',
        key:'loanPeriod',
        render:(val,rows,index)=><Input onChange={e => this.handleChangeSetState(e,`loanPeriod`,index,rows)} type="number" defaultValue={val} />
      },
      {
        title:'上下游合同到期日',
        dataIndex:'contractExpireDate',
        key:'contractExpireDate',
        render:(val,rows,index)=><DatePicker disabled value={moment(val,'YYYY-MM-DD')} format="YYYY-MM-DD" />
      },
    ]
    return (
      <div>
        <Table
          bordered
          columns={columns}
          dataSource={platformuserList}
          rowKey={record=>record.id}
        />
      </div>
    )
  }
}
export default slplatformList
