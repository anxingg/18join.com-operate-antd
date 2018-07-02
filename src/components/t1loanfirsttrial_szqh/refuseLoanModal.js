/**
 * Created by fcb on 2017/10/31.
 */
import React,{PropTypes} from 'react';
import {Modal,Button,Form,Input} from 'antd';

const FormItem = Form.Item;
class RefuseLoanModal extends React.Component {
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
        this.props.creditRefuse(value);
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
        <Button type="danger" style={{marginTop:5}} onClick={this.showModal}>初审拒绝</Button>
        <Form layout="horizontal">
          <Modal
            title="初审拒绝"
            onOk={this.handleOK}
            onCancel={this.handleCancel}
            visible={this.state.visible}
          >
              {
                getFieldDecorator('blname',{
                  initialValue:'szqh'
                })(<Input type="hidden" />)
              }

              {
                getFieldDecorator('realnetamount',{
                  initialValue:realnetamount
                })(<Input type="hidden" />)
              }
            <p>您，确定要拒绝审核这条记录吗？</p>
              {
                getFieldDecorator('joinuserid',{
                  initialValue:joinuserid
                })(<Input type="hidden" />)
              }

              {
                getFieldDecorator('operatetype',{
                  initialValue:operatetype
                })(<Input type="hidden" disabled />)
              }

              {
                getFieldDecorator('transdate',{
                  initialValue:transdate
                })(<Input type="hidden" />)
              }
          </Modal>
        </Form>
      </div>
    )
  }
}
const RefuseLoanModalForm = Form.create()(RefuseLoanModal)
export default RefuseLoanModalForm;
