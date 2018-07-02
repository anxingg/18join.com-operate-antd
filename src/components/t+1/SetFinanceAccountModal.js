/**
 * Created by fcb on 2017/10/13.
 */
import React from 'react';
import {Modal,Button,Form,Radio,Input,message } from 'antd'

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class SetFinanceAccountModal extends React.Component {
  state = {
    visible:false,
    disabled:true
  }

  showModal = () =>{
    this.setState({
      visible:true
    })
  }

  hideModal = () =>{
    this.setState({
      visible:false
    })
  }

  RadioGroupChange = (e) =>{
    if(e.target.value==1){
      this.setState({ disabled:false })
    }else{
      this.setState({ disabled:true })
    }
  }

  handleOk = (e) =>{
    this.props.form.validateFields((err,values) => {
      if(!err){
        console.log(values)
        if(values.ratio==''){
          message.warning('费率不能为空！',3)
        }else{
          this.props.updateTxLoanLiveInfoAndSetFinanceAccountAndRatio(values);
          this.hideModal()
        }
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {operatetype,liveid,pagets} = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    return (
      <span>
        <Form layout="horizontal">
          <Button onClick={this.showModal} type="primary">设置金融户</Button>
          <Modal
            title="设置金融户"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.hideModal}
           >
            <FormItem {...formItemLayout}>
              {
                getFieldDecorator('liveid',{
                  initialValue:liveid
                })(<Input type="hidden" />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="是否设置费率">
              {
                getFieldDecorator('ratioCheck',{
                  initialValue:'',
                  rules: [
                    {required: true, message: '请选择是否设置费率！'}
                  ]
                })(
                    <RadioGroup onChange={e=>this.RadioGroupChange(e)}>
                      <Radio value={1}>设置费率</Radio>
                      <Radio value={2}>不设置费率</Radio>
                    </RadioGroup>
                )
              }
            </FormItem>

            <FormItem {...formItemLayout} label="费率">
              {
                getFieldDecorator('ratio',{
                  initialValue:'',
                })( <Input disabled={this.state.disabled} type="number" addonAfter="%" /> )
              }
            </FormItem>
            <FormItem {...formItemLayout}>
              {
                getFieldDecorator('pagets',{
                  initialValue:pagets
                })(<Input type="hidden" />)
              }
            </FormItem>

            <FormItem {...formItemLayout} label="金融户账户">
              {
                getFieldDecorator('financeAccount',{
                  initialValue:'',
                  rules: [
                    {required: true, message: '金融户账户不允许为空!'}
                  ]
                })(<Input type="number" />)
              }
            </FormItem>

            <FormItem {...formItemLayout}>
              {
                getFieldDecorator('operatetype',{
                  initialValue:operatetype,
                })(<Input disabled type="hidden" />)
              }
            </FormItem>
          </Modal>
        </Form>
      </span>
    )
  }
}

const SetFinanceAccountModalForm = Form.create()(SetFinanceAccountModal)
export default SetFinanceAccountModalForm;
