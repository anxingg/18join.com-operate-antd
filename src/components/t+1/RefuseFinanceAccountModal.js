/**
 * Created by fcb on 2017/10/13.
 */
import React from 'react';
import {Modal,Button,Form,Radio,Input } from 'antd'

const { TextArea } = Input;
const FormItem = Form.Item;
class RefuseFinanceAccountModal extends React.Component {
  state = {
    visible:false
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

  handleOk = (e) =>{

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updateTxLoanLiveInfoApplyNoPassByLiveID(values);
        console.log(values)
        this.hideModal()
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {operatetype,liveid,pagets} = this.props;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
    return (
      <span>
        <Form layout="horizontal">
          <Button style={{marginTop:5}} onClick={this.showModal} type="danger">拒 绝 申 请</Button>
          <Modal
            title="拒绝申请"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.hideModal}
           >
             <FormItem>
              { getFieldDecorator('liveid',{
                initialValue:liveid
              })(<Input type="hidden" />)}
             </FormItem>

            <FormItem>
              { getFieldDecorator('pagets',{
                initialValue:pagets
              })(<Input type="hidden" />) }
             </FormItem>

            <FormItem {...formItemLayout} label="拒绝原因">
              {
                getFieldDecorator('memo',{
                  rules: [
                    {required: true, message: '请输入拒绝原因！'}
                  ]
                })(<TextArea value="" autosize={{ minRows: 4, maxRows: 6 }} />)
              }
            </FormItem>
            <FormItem>
              { getFieldDecorator('operatetype',{
                initialValue:operatetype
              })(<Input type="hidden"  />) }
           </FormItem>
          </Modal>
        </Form>
      </span>
    )
  }
}

const RefuseFinanceAccountModalForm = Form.create()(RefuseFinanceAccountModal)
export default RefuseFinanceAccountModalForm;
