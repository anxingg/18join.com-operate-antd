/**
 * Created by fcb on 2017/7/19.
 */
import React from 'react';
import {Modal} from 'antd';

class IsListModal extends React.Component {
  state = {
    visible:false
  }

  componentWillUpdate(nextProps) {
    const props = this.props;
    if(nextProps.checksamecreditListLength!=props.checksamecreditListLength){
      this.setState({
        visible:nextProps.checksamecreditListLength>0?true:false
      })
    }
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
    this.handleCancel()
    this.props.preloan({joinidstr:this.props.joinidstr,amount:this.props.amount,realLoanDate:this.props.realLoanDate});
  }

  render(){
    // console.log(this.props.checksamecreditListLength>0?true:false)
    // console.log(this.state.visible)

    return (
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>检测到当天有条同样金额的融资记录，是否继续操作？</p>
        </Modal>
    )
  }
}

export default IsListModal;
