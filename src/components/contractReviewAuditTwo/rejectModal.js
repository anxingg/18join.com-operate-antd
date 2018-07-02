/**
 * Created by fcb on 2017/8/17.
 */
import React from 'react';
import {Modal,Button,Form} from 'antd';

const FormItem = Form.Item;
class rejectModal extends React.Component {
  state = {
    visible:false
  }

  showModal = () => {
    this.setState({
      visible:true
    })
  }

  handleOk = (e) => {
    this.props.form.validateFields((err,values)=>{
      if(!err){
        console.log(values)
        this.props.reject(values)
        this.handleCancel()
      }
    })
  }

  handleCancel = () => {
    this.setState({
      visible:false
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    return (
      <span style={{marginLeft:10}}>
        <Button onClick={this.showModal} type="danger">拒绝</Button>
        <Form >
            <Modal
              title="拒绝保理合同"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >

              <FormItem label="拒绝理由">
                {
                  getFieldDecorator('comment',{
                    initialValue:''
                  })(<textarea style={{width:'100%'}} placeholder="请输入拒绝理由"></textarea>)
                }
              </FormItem>
            </Modal>
          </Form>
        </span>
    )
  }
}

const rejectModalForm = Form.create()(rejectModal)
export default rejectModalForm;
