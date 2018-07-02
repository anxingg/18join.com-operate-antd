/**
 * Created by fcb on 2017/5/10.
 */
import {Modal,Button,Icon} from 'antd'

class OpenFinancial extends React.Component{
  state = { visible:false }
  showModal = () => {
    this.setState({
      visible:true
    });
  }

  handleOk = () => {
    this.props.onOk(this.props.mhtno);
    this.handleCancel();
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  }

  render(){
    return (
      <div>
        <Button type="primary" icon="pay-circle-o" onClick={this.showModal}>开通金融户</Button>

        <Modal title="开通金融户" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <p>您确定为该商户开通金融户吗？</p>
        </Modal>
      </div>
    )
  }
}

export default OpenFinancial
