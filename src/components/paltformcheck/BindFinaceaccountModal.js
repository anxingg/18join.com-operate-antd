/**
 * Created by fcb on 2017/7/11.
 */
import React from 'react';
import {Modal,Button,Select,Form,Input,Icon} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
class BindFinaceaccountModal extends React.Component {
  state = {
    visible:false
  }
  showModal = () =>{
    this.setState({
      visible:true
    });
    this.props.queryFinaceaccount(this.props.joinuserid);
  }

  handleOk = () =>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.bindFinaceaccount(values);
        this.handleCancel()
      }
    });
  }

  handleCancel = () =>{
    this.setState({
      visible:false
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const {id,joinuserid,queryFinaceaccountList,addFinaceaccount}  = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      }
    };

    const addFinaceaccountProps = {
      addFinaceaccount:addFinaceaccount,
      joinuserid:joinuserid,
      id:id
    }
    return (
      <Form layout="horizontal">
      <Button type="primary" onClick={this.showModal}>设置结算账户</Button>
        <Modal
          title="设置结算户账户"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          key={id}
        >
          <FormItem hidden  {...formItemLayout}>
            {
              getFieldDecorator('id',{
                initialValue:id
              })(<Input type="hidden" readOnly />)
            }
          </FormItem>

          <FormItem label="银行卡号" {...formItemLayout}>
            {
              getFieldDecorator('idOfFinaceaccount',{
                initialValue:'',
                rules:[{
                  required: true, message: '请选择要绑定的银行卡!',
                }]
              })(
                <Select
                  style={{width:200}}
                  placeholder="请选择要绑定的银行卡"
                >
                  {
                    queryFinaceaccountList.length>0?queryFinaceaccountList.map((opt) => <Option value={opt.id} key={opt.id}> {opt.financeAccount} </Option>):[]
                  }
                </Select>
              )
            }
          </FormItem>
          <p style={{textAlign:'center',color:'#f00'}}>若银行卡中没有您的银行卡号，请先新增银行账户！</p>
        </Modal>
      </Form>
    )
  }
}
const BindFinaceaccountModalForm =  Form.create()(BindFinaceaccountModal);
export default BindFinaceaccountModalForm;
