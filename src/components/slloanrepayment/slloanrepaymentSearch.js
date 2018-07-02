/**
 * Created by fcb on 2017/7/26.
 */
import React from 'react';
import {Input,Button,Form,message,DatePicker,Radio,Modal } from 'antd';
import moment from 'moment';
import AutoRefundModal from './autoRefund';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class SlloanrepaymentSearch extends React.Component {
  state = {
    visible:false,
    amounts:0
  }

  handleCancel = () =>{
    this.setState({
      visible:false
    })
  }

  handleOk = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      values.refundDate = values.refundDate.format('YYYY-MM-DD')
      this.props.preRefund(values)
      this.handleCancel()
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
        if(values.amount<=0){
          message.warning('请输入还款金额！',3);
        }else if(values.refundDate==null){
          message.warning('请选择还款日期！',3);
        }else if(values.isBefore3==''){
          message.warning('请核对交易时间！',3);
        }else{
          values.refundDate = values.refundDate.format('YYYY-MM-DD')
          this.props.checkSameRefund(values)
          // this.props.preRefund(values)

          this.setState({
            amounts:values.amount
          })
          // console.log(this.props.checkSameRefundListLength)

        }
    })
  }


  componentWillUpdate(nextProps) {
    const props = this.props;
    if(nextProps.checkSameRefundListLength!=props.checkSameRefundListLength){
      this.setState({
        visible:nextProps.checkSameRefundListLength>0?true:false
      })
    }
  }


  render(){
    const {getFieldDecorator} = this.props.form;
    const {vo,joinidstr,amount,autoRefund} = this.props;
    let date = new Date();
    const AutoRefundModalProps = {
      vo:vo,
      joinidstr:joinidstr,
      amount:this.state.amounts,
      autoRefund:autoRefund,
      // disabled:amount>0?false:true
    }

    return (
      <Form layout="inline" onSubmit={this.handleSubmit} style={{marginBottom:10}}>
        <FormItem label="还款金额(元)">
          {
            getFieldDecorator('amount',{
              initialValue:''
            })(<Input style={{width:198}} type="number" placeholder="请输入还款金额" />)
          }
        </FormItem>

        <FormItem label="还款日期">
          {
            getFieldDecorator('refundDate',{
              initialValue:moment(date,'YYYY-MM-DD')
            })(<DatePicker />)
          }
        </FormItem>

        <FormItem label="交易时间">
          {
            getFieldDecorator('isBefore3',{
              initialValue:''
            })(
              <RadioGroup>
                <Radio value="y">15:00之前</Radio>
                <Radio value="n">15:00之后</Radio>
              </RadioGroup>
            )
          }
        </FormItem>

        <FormItem>
          {
            getFieldDecorator('joinidstr',{
              initialValue:this.props.joinidstr
            })(<Input type="hidden"  />)
          }
        </FormItem>

        <Button type="primary" htmlType="submit">确定金额</Button>
        <AutoRefundModal {...AutoRefundModalProps} />

        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>检测到当天有条同样金额的还款记录，是否继续补录？</p>
        </Modal>
      </Form>
    )
  }
}

const SlloanrepaymentSearchForm = Form.create()(SlloanrepaymentSearch)
export default SlloanrepaymentSearchForm;
