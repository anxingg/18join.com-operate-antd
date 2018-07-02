/**
 * Created by fcb on 2017/7/26.
 */
import React from 'react';
import {Form,Modal,Input,Button} from 'antd';
import styles from './RepaymentRecord.less';

const FormItem = Form.Item;
class RechargeDiffAccountBalanceModal extends React.Component {
  state = {
    visible:false
  }
  showModal = () =>{
    this.setState({
      visible:true
    })
  }

  handleOk = (e) =>{
    this.props.form.validateFields((err,values)=>{
      if(!err){
        this.props.rechargeDiffAccountBalance(values);
        this.handleCancel();
      }
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form;
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
      <span>
          <Button className={styles.fr} type="primary" onClick={this.showModal} disabled={this.props.disabled} >还款至保理户</Button>
          <Modal
            title="还款至保理户"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form layout="horizontal">
              <FormItem label="结算户余额(元)：" {...formItemLayout}>
                {
                  <Input value="0.00" readOnly />
                }
              </FormItem>

              <FormItem {...formItemLayout}>
                {
                  getFieldDecorator('mhtno_from',{
                    initialValue:''
                  })(<Input type="hidden" />)
                }
              </FormItem>
              <FormItem label="转账金额(元)：" {...formItemLayout}>
                {
                  getFieldDecorator('refundAmount',{
                    initialValue:''
                  })(<Input type="number" />)
                }
              </FormItem>
            </Form>
          </Modal>
      </span>
    )
  }
}

const RechargeDiffAccountBalanceModalForm = Form.create()(RechargeDiffAccountBalanceModal);
export default RechargeDiffAccountBalanceModalForm;
