/**
 * Created by fcb on 2017/7/19.
 */
import React from 'react';
import {Form,InputNumber,Button,message,Input,DatePicker} from 'antd';
import SlapplyloanModal from './slapplyloanModal';
import IsListModal from './isList';
import moment from 'moment'
import {money100} from '../../utils/index';

const FormItem = Form.Item;
class DetermineAmountSearch extends React.Component {
  state = {
    joinidstr:this.props.joinid,
    amount:0,
    realLoanDate:'',
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      let checksamecreditListLength = this.props.checksamecreditListLength
      if(!err){
        if(values.amount==''){
          message.warning('放款金额不能为空！');
        }else if(values.realLoanDate==null){
          message.warning('融资日期不能为空！');
        }else{
          values.realLoanDate = values.realLoanDate.format('YYYY-MM-DD')
          this.setState({
            joinidstr:values.joinidstr,
            amount:values.amount,
            realLoanDate:values.realLoanDate
          })
          this.props.checksamecredit(values);
        }
      }
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const {list,slapplyloan,checksamecreditListLength,preloan} = this.props;

    const IsListModalProps = {
      checksamecreditListLength:checksamecreditListLength,
      joinidstr:this.state.joinidstr,
      amount:this.state.amount,
      realLoanDate:this.state.realLoanDate,
      preloan:preloan,
    }

    const SlapplyloanModalProps = {
      list:list,
      joinidstr:this.state.joinidstr,
      amount:this.state.amount,
      slapplyloan:slapplyloan,
      realLoanDate:this.state.realLoanDate
    }
    return (
      <div>
        <SlapplyloanModal {...SlapplyloanModalProps} />

        <Form layout="inline" onSubmit={this.handleSubmit} style={{marginBottom:10}}>
          <FormItem>
            {
              getFieldDecorator('amount',{
                initialValue:''
              })(<Input type="number" placeholder="请输入放款金额(元)" style={{width:198}} />)
            }
          </FormItem>

          <FormItem label="融资日期">
            {
              getFieldDecorator('realLoanDate',{
                initialValue:moment(new Date(),'YYYY-MM-DD')
              })(<DatePicker />)
            }
          </FormItem>
          <Button type="primary" htmlType="submit">确定金额</Button>
          <FormItem>
            {
              getFieldDecorator('joinidstr',{
                initialValue:this.state.joinidstr
              })(<Input type="hidden" />)
            }
          </FormItem>
          <IsListModal {...IsListModalProps} />
        </Form>
      </div>
    )
  }
}
const DetermineAmountSearchForm = Form.create()(DetermineAmountSearch);
export default DetermineAmountSearchForm;
