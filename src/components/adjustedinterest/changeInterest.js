/**
 * Created by fcb on 2017/8/1.
 */
import React from 'react';
import {Modal,Button,Form,Input,Row,Col} from 'antd';
import {money100} from '../../utils/index';

const FormItem = Form.Item;
class ChangeInterestModal extends React.Component {
  state = {
    visible:false
  }

  showModal = () =>{
    this.setState({
      visible:true
    })
  }

  handleOk = () =>{
    this.props.form.validateFields((err,values)=>{
      if(!err){
        const {row} = this.props;
        let josnstr = {
          id:row.id,idOfLoanInfo:row.idOfLoanInfo,
          loanInfoTs:row.loanInfoTs,rowUpdateTime:row.rowUpdateTime,
          list:[{
            type:"rate",
            amount:values.rate,
            idOfCreditlog:row.id,
            memo:values.memo
          },{
            type:"fee",
            amount:values.fee,
            idOfCreditlog:row.id,
            memo:values.memo
          },{
            type:"renewedrate",
            amount:values.renewedrate,
            idOfCreditlog:row.id,
            memo:values.memo
          },{
            type:"renewedfee",
            amount:values.renewedfee,
            idOfCreditlog:row.id,
            memo:values.memo
          },{
            type:"penalty",
            amount:values.penalty,
            idOfCreditlog:row.id,
            memo:values.memo
          }]
        }
        this.props.addFloatVo(josnstr);
        this.handleCancel()
      }
    })
  }

  handleCancel = () =>{
    this.setState({
      visible:false
    })
  }

  handleRateValidator = (rule,value,callback) =>{
    const {row} = this.props;
    let rate = row.totalNotPaybackRate==''?0:row.totalNotPaybackRate;
    if(value*100>rate&&rate==0){
      callback('基础利息为0,基础利息浮动金额不能小于0！')
    }else if(rate<value*100&&value<0||value*100+Number(rate)<0){
      callback('基础利息浮动金额不能大于原金额！')
    }
    callback()
  }

  handleFeeValidator = (rule, value, callback) =>{
    const {row} = this.props;
    let fee = row.totalNotPaybackFee==''?0:row.totalNotPaybackFee;
    if(value*100<fee&&fee==0){
      callback('基础手续费为0,浮动金额不能小于0！')
    }else if(fee<value*100&&value<0||value*100+Number(fee)<0){
      callback('基础利息浮动金额不能大于原金额！')
    }
    callback()
  }

  handleRenewedrateValidator = (rule,value,callback) =>{
    const {row} = this.props;
    let renewedrate = row.totalNotPaybackRenewedRate==''?0:row.totalNotPaybackRenewedRate;
    if(value*100<renewedrate&&renewedrate==0){
      callback('展期利息为0,展期利息浮动金额不能小于0！')
    }else if(renewedrate<value*100&&value<0||value*100+Number(renewedrate)<0){
      callback('展期利息浮动金额不能大于原金额！')
    }
    callback()
  }

  handleRenewedfeeValidator = (rule,value,callback) =>{
    const {row} = this.props;
    let renewedfee = row.totalNotPaybackRenewedFee==''?0:row.totalNotPaybackRenewedFee;
    if(value*100<renewedfee&&renewedfee==0){
      callback('展期手续费为0,展期手续费浮动金额不能小于0！')
    }else if(renewedfee<value*100&&value<0||value*100+Number(renewedfee)<0){
      callback('展期手续费浮动金额不能大于原金额！')
    }
    callback()
  }

  handlePenaltyValidator = (rule,value,callback) =>{
    const {row} = this.props;
    let penalty = row.totalNotPaybackPenalty==''?0:row.totalNotPaybackPenalty;
    if(value*100<renewedfee&&renewedfee==0){
      callback('罚息为0,罚息浮动金额不能小于0！')
    }else if(renewedfee<value*100&&value<0||value*100+Number(penalty)<0){
      callback('罚息浮动金额不能大于原金额！')
    }
    callback()
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {row} = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>调息修改</Button>
        <Form layout="vertical">
          <Modal
            title="调息修改"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width="650"
          >
            <Row gutter={16}>
              <FormItem label="基础利息(元)" {...formItemLayout}>
                  <Col span={15}>
                    {
                      getFieldDecorator('rate',{
                        initialValue:0,
                        rules:[{
                          validator:this.handleRateValidator
                        }]
                      })(<Input type="number" />)
                    }
                  </Col>

                  <Col offset={1} span={8}>
                    <label>原金额: {money100(row.totalNotPaybackRate)}</label>
                  </Col>
              </FormItem>
            </Row>

            <Row gutter={16}>
              <FormItem label="基础手续费(元)" {...formItemLayout}>
                <Col span={15}>
                  {
                    getFieldDecorator('fee',{
                      initialValue:0,
                      rules:[{
                        validator:this.handleFeeValidator
                      }]
                    })(<Input type="number" />)
                  }
                </Col>

                <Col offset={1} span={8}>
                  <label>原金额: {money100(row.totalNotPaybackFee)}</label>
                </Col>
              </FormItem>
            </Row>

            <Row gutter={16}>
              <FormItem label="展期利息(元)" {...formItemLayout}>
                <Col span={15}>
                {
                  getFieldDecorator('renewedrate',{
                    initialValue:0,
                    rules:[{
                      validator:this.handleRenewedrateValidator
                    }]
                  })(<Input type="number" />)
                }
                </Col>
                <Col offset={1} span={8}>
                  <label>原金额: {money100(row.totalNotPaybackRenewedRate)}</label>
                </Col>
              </FormItem>
            </Row>

            <Row gutter={16}>
              <FormItem label="展期手续费(元)" {...formItemLayout}>
                <Col span={15}>
                  {
                    getFieldDecorator('renewedfee',{
                      initialValue:0,
                      rules:[{
                        validator:this.handleRenewedfeeValidator
                      }]
                    })(<Input type="number" />)
                  }
                </Col>
                <Col offset={1} span={8}>
                  <label>原金额: {money100(row.totalNotPaybackRenewedFee)}</label>
                </Col>
              </FormItem>
            </Row>

            <Row gutter={16}>
                <FormItem label="罚息(元)" {...formItemLayout}>
                  <Col span={15}>
                  {
                    getFieldDecorator('penalty',{
                      initialValue:0,
                      rules:[{
                        validator:this.handlePenaltyValidator
                      }]
                    })(<Input type="number" />)
                  }
                </Col>
                <Col offset={1} span={8}>
                  <label>原金额: {money100(row.totalNotPaybackPenalty)}</label>
                </Col>
              </FormItem>
            </Row>

            <FormItem label="调息原因" {...formItemLayout}>
              {
                getFieldDecorator('memo',{
                  initialValue:'',
                  rules:[{
                    required:true,message:'调息原因不能为空~'
                  }]
                })(<textarea style={{width:225}} />)
              }
            </FormItem>
          </Modal>
        </Form>
      </div>
    )
  }
}
const ChangeInterestModalForm = Form.create()(ChangeInterestModal);
export default ChangeInterestModalForm;
