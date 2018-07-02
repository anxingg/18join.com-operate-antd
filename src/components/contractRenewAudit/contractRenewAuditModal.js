/**
 * Created by fcb on 2017/8/15.
 */
import React from 'react';
import {Modal,Button,Form,DatePicker,message,Input} from 'antd';
import {Link} from 'dva/router';
import moment from 'moment'

const FormItem = Form.Item;
class ContractRenewAuditModal extends React.Component {
  state = {
    visible:false
  }

  showModal =() =>{
    this.setState({
      visible:true
    })
  }

  handleOk = (e) =>{
    e.preventDefault()
    this.props.form.validateFields((err,values)=>{
      if(!err){
        if(values.expiredDate==''){
          message.warning('有效期不能为空！',3)
        }else if(moment(values.expiredDate).isBefore(new Date())){
          message.warning('有效期必须大于当前日期！',3)
        }else{
          values.expiredDate = values.expiredDate.format('YYYY-MM-DD');
          this.props.audit(values);
          this.setState({ visible:false })
        }
      }
    })
  }

  handleReject = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
        this.props.reject(values);
        this.setState({ visible:false })
    })
  }

  handleCancel = () =>{
    this.setState({
      visible:false
    })
  }

  render(){
    const {row} = this.props;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return (
      <Form>
        <Link onClick={this.showModal}>审核</Link>
        <Modal
          visible={this.state.visible}
          title={`续签审核(${row.description})`}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button onClick={this.handleOk} key="submit" type="primary">
              确定
            </Button>,
            <Button onClick={this.handleReject} key="Refuse" type="danger">
              拒绝
            </Button>,
            <Button onClick={this.handleCancel} key="back">取消</Button>,
          ]}
        >
          <FormItem label="有效期" {...formItemLayout}>
            {
              getFieldDecorator('expiredDate',{
                initialValue:'',
                // rules:[{required:true,message:'有效期不允许为空'}]
              })(<DatePicker format="YYYY-MM-DD" />)
            }
          </FormItem>

          <FormItem {...formItemLayout}>
            {
              getFieldDecorator('id',{
                initialValue:row.id
              })(<Input type="hidden" />)
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}
const contractRenewAuditModalForm = Form.create()(ContractRenewAuditModal);
export default contractRenewAuditModalForm
