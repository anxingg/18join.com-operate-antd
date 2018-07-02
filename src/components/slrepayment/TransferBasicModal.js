/**
 * Created by fcb on 2017/6/2.
 */
import React from 'react'
import {Modal,Button,message,Row,Col} from 'antd'

class TransferBasicModal extends React.Component{
  state = {
    visible:false,
    queryBalanceNum:0
  }

  showModal =() =>{
    if(this.props.mhtno == ''||this.props.mhtno==undefined){
      message.warning('请查询商户！',3)
    }else{
      this.setState({
        visible:true
      })
    }
  }

  queryBalanceNum = (e) =>{
    this.setState({
      queryBalanceNum:e
    })
  }

  hideModal =() =>{
    this.setState({
      visible:false
    })
  }

  handleOk = (e) =>{
    const mhtno = this.props.mhtno
    const toBaseAccount = parseFloat(this.state.queryBalanceNum,10)*100
    if(toBaseAccount<=0){
      message.warning('请输入转账金额且不能小于零！',3)
    }else{
      this.props.manualRechargeAccountToBase({mhtno,toBaseAccount})
      this.hideModal()
    }
  }

  render(){
    const {queryBalance,mhtno} = this.props;
    return (
      <span>
        <Button type="primary" onClick={this.showModal}>转账至基本户</Button>
        <Modal
          title="转账至基本户"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.hideModal}
          key={mhtno}
        >
          <Row style={{marginBottom:10}}>
            <Col span={14} offset={4}>结算户余额(元)：{(queryBalance/100).toFixed(2)}</Col>
          </Row>
           <Row>
            <Col span={14} offset={4}>
              <input value={(this.state.queryBalanceNum/100).toFixed(2)} type="number" />
              <Button onClick={()=>this.queryBalanceNum(queryBalance)} style={{marginLeft:5}} type="primary">全部转入</Button>
            </Col>
          </Row>
        </Modal>
      </span>
    )
  }
}

export default TransferBasicModal
