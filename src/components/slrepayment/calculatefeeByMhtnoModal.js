/**
 * Created by fcb on 2017/6/1.
 */
import React,{connect} from 'react'
import {Modal,Button,message} from 'antd'

class CalculatefeeByMhtno extends React.Component{
  state = {
    visible:false
  }
  showModal = () => {
    this.setState ({
      visible:true
    })
  }

  hideModal = () => {
    this.setState ({
      visible:false
    })
  }

  handOk = () =>{
    this.props.onOk(this.props.mhtno)
    this.props.queryAccountBalanceByMhtnoAndTypeAT01(this.props.mhtno)
    this.props.queryAccountBalanceByMhtnoAndTypeAT02(this.props.mhtno)
    this.hideModal();
  }
  render(){
    const {visible} = this.state
    const {mhtno} = this.props

    const IfModal = () => {
      if(mhtno==''||mhtno==undefined){
        message.warning('请查询商户名后继续操作！',2);
      }else{
        this.showModal()
      }
    }
    return (
      <span>
        <Button style={{float:'right'}} onClick={IfModal}  type="primary" icon="area-chart">手动计息</Button>

        <Modal
          title="手动计息"
          visible = {visible}
          onOk = {this.handOk}
          onCancel = {this.hideModal}
          key={mhtno}
        >
          <p>请确认该商户现在的回款都在15：00后，一旦确认计息将无法更改。是否确认为该商户进行手动计息？</p>
        </Modal>
      </span>
    )
  }
}

export default CalculatefeeByMhtno
