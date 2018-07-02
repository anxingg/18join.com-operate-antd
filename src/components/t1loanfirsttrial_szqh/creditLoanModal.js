/**
 * Created by fcb on 2017/10/31.
 */
import React,{PropTypes} from 'react';
import {Modal,Button,Form,Input} from 'antd';

const FormItem = Form.Item;
class CreditLoanModal extends React.Component {
  state = {
    visible:false
  }

  showModal = (e) =>{
    this.setState({
      visible:true
    })
  }

  handleCancel = (e) =>{
    this.setState({
      visible:false
    })
  }

  handleOK = () => {
    this.props.form.validateFields((err,value) => {
      if(!err){
        value.realnetamount = Number(value.realnetamount)*100
        this.props.creditApprove(value);
        this.handleCancel()
      }
    })
  }

  render(){
    const {realnetamount,joinuserid,operatetype,transdate} = this.props;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    }
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>初审通过</Button>
        <Form layout="horizontal">
          <Modal
            title="你，确定要审核通过这条记录吗？"
            onOk={this.handleOK}
            onCancel={this.handleCancel}
            visible={this.state.visible}
          >
            <FormItem {...formItemLayout}>
              {
                getFieldDecorator('blname',{
                  initialValue:'szqh'
                })(<Input type="hidden" />)
              }
            </FormItem>

            <FormItem {...formItemLayout} label="本次放款净额(元)">
              {
                getFieldDecorator('realnetamount',{
                  initialValue:realnetamount
                })(<Input type="number" />)
              }
            </FormItem>

            <FormItem {...formItemLayout}>
              {
                getFieldDecorator('joinuserid',{
                  initialValue:joinuserid
                })(<Input type="hidden" />)
              }
            </FormItem>

            <FormItem {...formItemLayout} label="业务类型">
              {
                getFieldDecorator('operatetype',{
                  initialValue:operatetype
                })(<Input disabled />)
              }
            </FormItem>

            <FormItem {...formItemLayout}>
              {
                getFieldDecorator('transdate',{
                  initialValue:transdate
                })(<Input type="hidden" />)
              }
            </FormItem>
          </Modal>
        </Form>
      </div>
    )
  }
}
const CreditLoanModalForm = Form.create()(CreditLoanModal)
export default CreditLoanModalForm;
