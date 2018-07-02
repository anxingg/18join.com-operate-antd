/**
 * Created by fcb on 2017/6/29.
 */
import React,{PropTypes} from 'react';
import {Button,Modal,Form,Input,DatePicker } from 'antd'

const FormItem = Form.Item;
class slPlatformUserCreditModal extends React.Component{
  state = {
    visible:false
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

  handleOk = () =>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.contractExpireDate = values.contractExpireDate.format('YYYY-MM-DD');
        this.props.slPlatformUserCredit(values);
        this.handleCancel()
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {id,joinuserid,rowUpdateTime} = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <Form  layout="horizontal">
        <Button type="primary" onClick={this.showModal}>授信</Button>
        <Modal
          title="授信"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          key={id}
        >
          <FormItem label="ID" hidden  {...formItemLayout}>
            {
              getFieldDecorator('id',{
                initialValue:id
              })(<Input readOnly />)
            }
          </FormItem>

          <FormItem  hidden  {...formItemLayout}>
            {
              getFieldDecorator('rowUpdateTime',{
                initialValue:rowUpdateTime
              })(<Input type="hidden" />)
            }
          </FormItem>

          <FormItem  label='融资折扣(%)'  {...formItemLayout}>
            {
              getFieldDecorator('discount',{
                initialValue:'',
                rules:[{
                  required: true, message: '融资折扣不能为空!',
                }]
              })(<Input type="number" placeholder="请输入融资折扣" />)
            }
          </FormItem>

          <FormItem  label='融资日利率(%)' {...formItemLayout}>
            {
              getFieldDecorator('rate',{
                initialValue:'',
                rules:[{
                  required: true, message: '融资日利率不能为空!',
                }]
              })(<Input type="number" placeholder="请输入融资日利率" />)
            }
          </FormItem>

          <FormItem  label='融资手续费率(%)' {...formItemLayout}>
            {
              getFieldDecorator('fee',{
                initialValue:'',
                rules:[{
                  required: true, message: '融资手续费率不能为空!',
                }]
              })(<Input type="number"  placeholder="请输入融资手续费率" />)
            }
          </FormItem>

          <FormItem  label='最高融资额度(万元)' {...formItemLayout}>
            {
              getFieldDecorator('maxAmount',{
                initialValue:'',
                rules:[{
                  required: true, message: '融资额度不能为空!',
                }]
              })(<Input type="number" placeholder="最高融资额度" />)
            }
          </FormItem>

          <FormItem  label='最长放款期限(天)' {...formItemLayout}>
            {
              getFieldDecorator('loanPeriod',{
                initialValue:'',
                rules:[{
                  required: true, message: '最长放款期限不能为空!',
                }]
              })(<Input type="number"  placeholder="最长放款期限" />)
            }
          </FormItem>

          <FormItem  label='上下游合同到期日' {...formItemLayout}>
            {
              getFieldDecorator('contractExpireDate',{
                initialValue:'',
                rules:[{
                  required: true, message: '到期日期不能为空!',
                }]
              })(<DatePicker format="YYYY-MM-DD" placeholder="请选择到期日期" />)
            }
          </FormItem>

          <FormItem hidden  {...formItemLayout}>
            {
              getFieldDecorator('joinuserid',{
                initialValue:joinuserid
              })(<Input type="hidden" />)
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}
const slPlatformUserCreditModalForm = Form.create()(slPlatformUserCreditModal);
export default slPlatformUserCreditModalForm
