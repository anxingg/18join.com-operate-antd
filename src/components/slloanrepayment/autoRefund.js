/**
 * Created by fcb on 2017/7/27.
 */
import React from 'react';
import {Modal,Form,message,Button,Input,Select,DatePicker} from 'antd';
import moment from 'moment';
import AutoRefundUpload from './fileUpload';

const Option = Select.Option;
const FormItem = Form.Item;
class AutoRefund extends React.Component {
  state={
    path:'',
    visible:false,
  }
  showModal = () =>{
    this.setState({
      visible:true
    })
  }
  handleOk = () =>{
    this.props.form.validateFields((err,values)=>{
      if(!err){
          values['refundDate'] = values['refundDate']?values['refundDate'].format('YYYY-MM-DD'):'';
          this.props.autoRefund(values);
          this.handleCancel()
      }
    })
  }
  handleCancel =() =>{
    this.setState({
      visible:false
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const {vo,joinidstr,amount} = this.props;
    const date = new Date();

    const that = this;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      }
    };

    const AutoRefundUploadProps = {
      joinidstr:joinidstr,
      AutoRefundPath:function(v){
        that.setState({
          path:v
        })
      }
    }

    return (
      <span>
        <Button type="primary" style={{float:'right'}} onClick={this.showModal} disabled={amount>0?false:true}>确认还款</Button>
        <Form layout="horizontal" >
          <Modal
            title="还款补录"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            key={amount} //利用amount 来创建不同的key  从而清空旧数据
          >
            <FormItem label="本次还款金额(元)：" {...formItemLayout}>
              {
                getFieldDecorator('amount',{
                  initialValue:amount
                })(<Input readOnly />)
              }
            </FormItem>

            <FormItem>
              {
                getFieldDecorator('joinidstr',{
                  initialValue:joinidstr
                })(<Input type="hidden" />)
              }
            </FormItem>

            <FormItem label="还款日期：" {...formItemLayout}>
              {
                getFieldDecorator('refundDate',{
                  initialValue:moment(new Date(),"YYYY-MM-DD"),
                  rules:[{
                    required:true,message:'请选择还款日期！'
                  }]
                })(<DatePicker />)
              }
            </FormItem>

            <FormItem label="上传凭证：" {...formItemLayout}>
              {
                getFieldDecorator('voucher',{
                  initialValue:this.state.path,
                  rules:[{
                    required:true,message:'请上传凭证！'
                  }]
                })(<AutoRefundUpload {...AutoRefundUploadProps} />)
              }
            </FormItem>

            <FormItem>
              {
                getFieldDecorator('vo',{
                  initialValue:vo
                })(<Input type="hidden" />)
              }
            </FormItem>
          </Modal>
        </Form>
      </span>
    )
  }
}

const AutoRefundForm = Form.create()(AutoRefund);
export default AutoRefundForm;
