/**
 * Created by fcb on 2017/8/25.
 */
import React from 'react'
import {Modal,Tag,Form} from 'antd';

const FormItem = Form.Item;
class BindAlipay extends React.Component {
  state = {
    visible:false
  }

  showModal = () =>{
    this.setState({
      visible:true
    })
  }

  handleCancel = () => {
    this.setState({
      visible:false
    })
  }

  handleOk = (e) =>{
    e.preventDefault()
    this.props.needBindAlipay(this.props.rowId)
    this.handleCancel()
  }

  render(){
    return (
      <div>
        <Tag onClick={this.showModal} color="#2db7f5">绑定支付宝</Tag>
        <Modal
          title="绑定支付宝"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          绑定支付宝作为回款账户？
        </Modal>
      </div>
    )
  }
}

export default  BindAlipay
