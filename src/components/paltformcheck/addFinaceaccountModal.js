/**
 * Created by fcb on 2017/7/12.
 */
import React from 'react';
import {Modal,Input,Form,Radio,Button} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class AddFinaceaccount extends React.Component{
  state = {
    visible:false
  }

  showModal = () =>{
    this.setState({
      visible:true
    });
  }

  handleCancel = () =>{
    this.setState({
      visible:false
    });
  };

  handleOk = () =>{
    this.props.form.validateFields((err,value)=>{
      if(!err){
        let valueObj = {insideType:'AT02',businessType:2,idOfTbMerchantUser:this.props.joinuserid}
        Object.assign(value,valueObj);
        console.log(value)
        this.props.addFinaceaccount(value);
        this.handleCancel();
      }
    })
  }

  render(){
    const {id} = this.props;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      }
    };
    return(
      <Form layout="horizontal">
        <Button type="primary" onClick={this.showModal}>新增银行账户</Button>
        <Modal
          title="新增银行账户"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          key={id}
        >
          <FormItem label="账户类型" {...formItemLayout}>
            {
              getFieldDecorator('accountType',{
                initialValue:'',
                rules:[{
                  required:true,message:'请选择账户类型！'
                }]
              })(
                <RadioGroup>
                  <Radio value="CMBC">民生银行</Radio>
                  <Radio value="PINGAN">平安银行</Radio>
                </RadioGroup>
              )
            }
          </FormItem>

          <FormItem label="银行账号" {...formItemLayout}>
            {
              getFieldDecorator('financeAccount',{
                initialValue:'',
                rules:[{
                  required:true,message:'请输入银行账号！'
                }]
              })(<Input type="number" />)
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}

const AddFinaceaccountForm =  Form.create()(AddFinaceaccount);
export default AddFinaceaccountForm;

