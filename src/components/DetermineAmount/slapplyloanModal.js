/**
 * Created by fcb on 2017/7/19.
 */
import React from 'react';
import {Modal,Button,Form,message,Input} from 'antd';
import FileUpload from './fileupload';

const FormItem = Form.Item;
class SlapplyloanModal extends React.Component{
  state = {
    visible:false,
    filepath:''
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

  handleOk = (e) =>{
    this.props.form.validateFields((err,values)=>{
      if(!err){
        if(this.state.filepath==''){
          message.warning('请上传电子回执单！')
        }else{
          values.loanDate = this.props.realLoanDate
          this.props.slapplyloan(values);
          this.setState({
            visible:false
          })
        }
      }
    })
  }

  render(){
    const {getFieldDecorator } = this.props.form;
    const {joinidstr,amount,list} = this.props;

    let ObtainFilePath = '';
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    const ObtainPath = (val) =>{
      this.setState({
        filepath:val
      })
    }

    const fileUploadProps = {
      joinidstr:joinidstr,
      ObtainPath:ObtainPath
    }
    const disabled = list.listvo!=undefined&&list.listvo.length>0?false:true

    return (
        <Form layout="horizontal"  style={{float:'right'}}>
          <Button icon="pay-circle-o" disabled={disabled} onClick={this.showModal} type="primary" htmlType="button">放款</Button>
          <Modal
            title="确认放款"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <FormItem label="上传电子回执单" {...formItemLayout}>
              {
                getFieldDecorator('voucher',{
                  initialValue:this.state.filepath,
                })(
                  <FileUpload {...fileUploadProps} />
                )
              }
            </FormItem>

            <FormItem>
              {
                getFieldDecorator('joinidstr',{
                  initialValue:joinidstr
                })(<Input type="hidden" />)
              }
            </FormItem>

            <FormItem label="本次放款总计(元)" {...formItemLayout}>
              {
                getFieldDecorator('amount',{
                  initialValue:amount
                })(<Input readOnly />)
              }
            </FormItem>

            <FormItem>
              {
                getFieldDecorator('frontvo',{
                  initialValue:list
                })(<Input type="hidden" />)
              }
            </FormItem>
          </Modal>
        </Form>
    )
  }
}

const SlapplyloanModalForm = Form.create()(SlapplyloanModal);
export default SlapplyloanModalForm;
