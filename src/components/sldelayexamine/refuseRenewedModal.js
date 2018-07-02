/**
 * Created by fcb on 2017/8/18.
 */
import React from 'react'
import {Modal,Form,Button} from 'antd'

const FormItem = Form.Item;
class refuseRenewedModal extends React.Component {
  state = {
    visible:false
  }

  handleOk = () =>{
    this.props.form.validateFields((err,values)=>{
      if(!err){
        this.props.refuseRenewed(values.memo);
        this.setState({
          visible:false
        })
      }
    })
  }

  showModal =() =>{
    this.setState({
      visible:true
    })
  }

  handleCancel = () =>{
    this.setState({
      visible:false
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form;

    return (
      <span style={{display:'inline-block'}}>
        <Form>
          <Button onClick={this.showModal} style={{marginLeft:10}} type="danger">拒绝</Button>
          <Modal
            title="拒绝展期申请"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
              <FormItem label="拒绝原因">
                {
                  getFieldDecorator('memo',{
                    initialValue:'',
                    rules:[{required:true,message:'拒绝原因不能为空！'}]
                  })(<textarea style={{width:'100%'}} placeholder="请输入拒绝原因"></textarea>)
                }
              </FormItem>
          </Modal>
        </Form>
      </span>
    )
  }
}
const refuseRenewedModalForm = Form.create()(refuseRenewedModal)
export default refuseRenewedModalForm
