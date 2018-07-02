/**
 * Created by fcb on 2017/7/21.
 */
import React,{getAttribute} from 'react';
import {AutoComplete,Form,Button,Input,message,Select} from 'antd';
import styles from './RepaymentRecord.less';
import {money100} from '../../utils/index';
import RechargeDiffAccountBalanceModal from './rechargeDiffAccountBalanceModal';

const FormItem = Form.Item;
const Option = Select.Option;
class RepaymentRecordSearch extends React.Component {
  state = {
    mthno:'',
    joinidstr:''
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(values.joinidstr!=''){
        this.props.queryNotpayback(values.joinidstr);
        this.setState({
          joinidstr:values.joinidstr
        })
        // this.props.queryAccountBalanceByMhtnoAndType(this.refs.iSmhtno.getAttribute("mthno"));
        // console.log(this.refs.iSmhtno);
        // console.log(this.refs.iSmhtno.getAttribute("mthno"));
      }else{
        message.warning('查询商户名不能为空！',3);
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {querylistnamemap,queryname,accountBalance,rechargeDiffAccountBalance} = this.props;
    let namelist = querylistnamemap.map((opt)=><Option mthno={opt.mhtNo} key={opt.value}>{opt.label}</Option>)
    // console.log(this.state.mthno)

    const RechargeDiffAccountBalanceModalProps = {
      rechargeDiffAccountBalance:rechargeDiffAccountBalance,
      disabled:this.state.joinidstr!=''?false:true
    }

    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit} style={{marginBottom:10}}>
          <FormItem>
            {
              getFieldDecorator('joinidstr',{
                initialValue:''
              })(
                <AutoComplete dataSource={namelist} placeholder="请输入商户名" style={{width:198,float:'left'}} filterOption={false}>
                  <Input onKeyUp={(e)=>queryname(e.target.value)} />
                </AutoComplete>
              )
            }
          </FormItem>

          <Button type="primary" htmlType="submit">查询</Button>
          <RechargeDiffAccountBalanceModal {...RechargeDiffAccountBalanceModalProps} />
          <b className={styles.fr} style={{marginRight:40}}>结算户余额：{money100(accountBalance)}</b>
        </Form>
      </div>
    )
  }
}

const RepaymentRecordSearchForm = Form.create()(RepaymentRecordSearch)

export default RepaymentRecordSearchForm;
