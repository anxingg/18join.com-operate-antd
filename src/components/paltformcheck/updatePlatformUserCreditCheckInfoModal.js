/**
 * Created by fcb on 2017/7/4.
 */
import React,{PropTypes} from 'react';
import {Button,Modal,Form,Input,DatePicker} from 'antd'
import UploadFile from './fileUpload'

const FormItem = Form.Item;
class updatePlatformUserCreditCheckInfoModal extends React.Component{
  state = {
    visible:false,
    creditFile:''
  }

  showModal = () =>{
    this.setState({
      visible:true
    })
  }

  handleCancel = () =>{
    this.setState({
      visible:false
    })
  }

  setCreditFile = (data) =>{
    this.setState({
      creditFile:data
    })
  }

  handleOk = () =>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.creditDate = values.creditDate.format('YYYY-MM-DD hh:mm:ss');
        this.props.updatePlatformUserCreditCheckInfo(values);
        this.handleCancel()
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {id,joinuserid,rowUpdateTime} = this.props;
    const {creditFile} = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const uploadProps = {
      joinuserid:joinuserid,
      setCreditFile:this.setCreditFile
    }
    return (
      <Form  layout="horizontal">
        <Button style={{marginTop:10}} type="primary" onClick={this.showModal}>动产融资登记</Button>
        <Modal
          title="动产融资登记"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          key={id}
        >
          <FormItem  hidden  {...formItemLayout}>
            {
              getFieldDecorator('rowUpdateTime',{
                initialValue:rowUpdateTime
              })(<Input type="hidden" />)
            }
          </FormItem>

          <FormItem label="ID"  hidden  {...formItemLayout}>
            {
              getFieldDecorator('idOfTbMerchantUser',{
                initialValue:joinuserid
              })(<Input type="text" readOnly />)
            }
          </FormItem>

          <FormItem  hidden  {...formItemLayout}>
            {
              getFieldDecorator('idOfPlatform',{
                initialValue:id
              })(<Input type="hidden" />)
            }
          </FormItem>

          <FormItem label="征信证明编号" hidden  {...formItemLayout}>
            {
              getFieldDecorator('creditNo',{
                initialValue:'',
                rules:[{
                  required:true,message:'征信证明编号不能为空!'
                }]
              })(<Input placeholder="请输入征信证明编号" />)
            }
          </FormItem>

          <FormItem  label='登记时间' {...formItemLayout}>
            {
              getFieldDecorator('creditDate',{
                initialValue:'',
                rules:[{
                  required: true, message: '登记时间不能为空!',
                }]
              })(<DatePicker format="YYYY-MM-DD hh:mm:ss" placeholder="请选择登记时间" />)
            }
          </FormItem>

          <FormItem label="动产融资登记" {...formItemLayout}>
            {
              getFieldDecorator('creditFile',{
                initialValue:creditFile,
                rules:[{
                  required: true, message: '请上传动产融资登记!',
                }]
              })( <UploadFile {...uploadProps} />)
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}
const updatePlatformUserCreditCheckInfoModalForm = Form.create()(updatePlatformUserCreditCheckInfoModal);
export default updatePlatformUserCreditCheckInfoModalForm
