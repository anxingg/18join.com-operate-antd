/**
 * Created by fcb on 2017/6/5.
 */
import React from 'react'
import {Modal,Button,message,Row,Col,Radio,Input,Select} from 'antd'

const RadioGroup = Radio.Group;
const Option = Select.Option;

class manualPartRefundModal extends React.Component{
  state = {
    withdrawValue: 1,
    visible:false,
    RadioTips:0,
    pwd:''
  }
  onChangeWithdrawValue = (e) => {
    this.setState({
      withdrawValue: e,
    });
  }
  onChangeRadioTips = (e) => {
    if(e.target.value=='2'){
      this.setState({
        RadioTips: 2,
      });
    }else if(e.target.value=='1'){
      this.setState({
        RadioTips: 1,
      });
    }

    //0：未选中 1：15:00前  2：15::00后
  }
  showModal = () =>{
    if(this.props.mhtno == ''||this.props.mhtno == undefined){
      message.warning('请查询商户后继续操作！')
    }else if(this.props.selectedRows.length<=0){
      message.warning('请勾选要还款的记录！')
    }else if(this.props.totalAmount>this.props.queryBalance){
      message.warning('所选的还款金额大于结算户余额！')
    }else{
      this.setState({
        visible: true,
      })
    }
  }

  hideModal = () =>{
    this.setState({
      visible: false,
    });
  }

  pwdKey = (e) =>{
    this.setState({
      pwd: e.target.value,
    });
  }

  handleOk = () =>{
    let {queryBalance,totalAmount,mhtno,selectedRows,loanInfoVo,RSAKey} = this.props
    let {withdrawValue,RadioTips,pwd} = this.state
    if(RadioTips=='0'){
      message.warning('请核对交易时间！')
    }else if(pwd==''){
      message.warning('密码不能为空！')
    }else{
      this.props.manualPartRefund({pwd:pwd,pageRefundAmount:totalAmount,mhtno:mhtno,withdrawFlag:withdrawValue,listvo:selectedRows,loanInfoVo:loanInfoVo,RSAKey:RSAKey})
      this.hideModal()
    }
  }

  render(){
    const {queryBalance,totalAmount} = this.props

    return (
      <span style={{marginLeft:5}}>
        <Button type="primary" onClick={this.showModal}>还款</Button>
        <Modal
          title="手动还款"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.hideModal}
        >
          <Row style={{marginBottom:5}}>
            <Col span={24}>结算户余额 (元)：{(queryBalance/100).toFixed(2)}</Col>
          </Row>

          <Row style={{margin:"10px 0 5px"}}>
            <Col span={12}>本 次 还 款 (元)：{(totalAmount/100).toFixed(2)}</Col>
            <Col span={12}>剩 余 余 额 (元)：{((queryBalance-totalAmount)/100).toFixed(2)}</Col>
          </Row>

          <Row style={{margin:"30px 0 10px"}}>
            <Col span={24} style={{color:'#f00'}}>
              核对交易时间：
              <RadioGroup onChange={this.onChangeRadioTips}>
                <Radio value="1">15:00之前</Radio>
                <Radio value="2">15:00(含)之后</Radio>
              </RadioGroup>
              <span style={this.state.RadioTips==2?{display:'block'}:{display:'none'}}>交易时间为15:00(含)之后，请确定手动计息！</span>
            </Col>
          </Row>

          <Row>
            <Col span={10}>
              是否提现到保理卡？
              <Select defaultValue="是" size="default" onChange={this.onChangeWithdrawValue} style={{width:50}}>
                <Option value="1">是</Option>
                <Option value="2">否</Option>
              </Select>
            </Col>

            <Col span={14}>
              <b>密码：</b><Input style={{width:200}} placeholder="请输入密码！" onKeyUp={this.pwdKey} type="password" />
            </Col>
          </Row>
        </Modal>
      </span>
    )
  }
}

export default manualPartRefundModal
