/**
 * Created by fcb on 2017/8/15.
 */
import React from 'react';
import {Modal,Button,Form,Input} from 'antd';
import {Link} from 'dva/router'

const FormItem = Form.Item;
class RenewedDetails extends React.Component {
  state = {
    visible:false
  }

  showModal =() =>{
    this.setState({
      visible:true
    })
  }

  handleCancel = () =>{
    this.setState({
      visible:false
    })
  }

  render(){
    const {row} = this.props;
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
      <Form>
        <Link onClick={this.showModal}>{row.value}</Link>
        <Modal
          visible={this.state.visible}
          title={`续签详情`}
          onCancel={this.handleCancel}
          footer={[
            <Button onClick={this.handleCancel} key="back">返回</Button>,
          ]}
        >
          <FormItem label="键值" {...formItemLayout}>
            {
              getFieldDecorator('value',{
                initialValue:row.value,
              })(<Input readOnly />)
            }
          </FormItem>

          <FormItem label="标签" {...formItemLayout}>
            {
              getFieldDecorator('label',{
                initialValue:row.label
              })(<Input readOnly />)
            }
          </FormItem>

          <FormItem label="类型" {...formItemLayout}>
            {
              getFieldDecorator('type',{
                initialValue:row.type
              })(<Input readOnly />)
            }
          </FormItem>

          <FormItem label="描述" {...formItemLayout}>
            {
              getFieldDecorator('description',{
                initialValue:row.description
              })(<Input readOnly />)
            }
          </FormItem>

          <FormItem label="排序" {...formItemLayout}>
            {
              getFieldDecorator('sort',{
                initialValue:row.sort
              })(<Input readOnly />)
            }
          </FormItem>

          <FormItem label="备注" {...formItemLayout}>
            {
              getFieldDecorator('remarks',{
                initialValue:row.remarks
              })(<Input readOnly />)
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}
const RenewedDetailsModal = Form.create()(RenewedDetails);
export default RenewedDetailsModal
