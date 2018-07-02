/**
 * Created by fcb on 2017/10/13.
 */
import React from 'react';
import {Modal,Button,Form} from 'antd'

const FormItem = Form.Item;
class CreateFinanceAccountModal extends React.Component {
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
    this.props.updateTxLoanLiveInfoAndCreateFinanceAccount({
      operatetype:this.props.operatetype,
      liveid:this.props.liveid,
      pagets:this.props.pagets
    });
    this.hideModal()
  }

  render(){
    return (
      <span>
        <Button onClick={this.showModal} type="primary">开通金融户</Button>
        <Modal
          title="开通金融户"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.hideModal}
         >
          <p>您确定为该商户开通金融户吗？</p>
        </Modal>
      </span>
    )
  }
}

export default CreateFinanceAccountModal;
