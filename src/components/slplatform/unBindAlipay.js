/**
 * Created by fcb on 2017/8/25.
 */
import React from 'react'
import {Modal,Tag,Form} from 'antd';
import {Link} from 'dva/router'

const FormItem = Form.Item;
class unBindAlipay extends React.Component {
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
    this.props.unNeedBindAlipay(this.props.rowId)
    this.handleCancel()
  }

  render(){
    return (
      <div>
        <Tag onClick={this.showModal} color="#f50">取消绑定支付宝</Tag>
        <Link target="_blank" to={`/api/operate/downloadAlipaySeal?format=json&platformUserId=${this.props.rowId}`}>下载授权文件</Link>
        <Modal
          title="取消绑定支付宝"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          取消绑定支付宝作为回款账户？
        </Modal>
      </div>
    )
  }
}

export default  unBindAlipay
