/**
 * Created by fcb on 2017/7/12.
 */
import React from 'react';
import {Modal,Button,Form,Input} from 'antd';

const FormItem = Form.Item;
class UpdateplatformUser extends React.Component{
  state={
    visible:false
  }

  showModal = () =>{
    this.setState({
      visible:true
    })
  }

  handCancel = () =>{
    this.setState({
      visible:false
    })
  }

  handleOk = () =>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updateplatformUser(values);
        this.handCancel();
      }
    });
  }


  render(){
    const {getFieldDecorator} = this.props.form;
    const {id} = this.props;
    return (
      <Form>
        <Button type="primary" onClick={this.showModal}>确认暂停</Button>
        <Modal
          title="暂停平台"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handCancel}
          key={id}
        >
          <FormItem>
            {
              getFieldDecorator('id',{
                initialValue:id
              })(<Input type="hidden" />)
            }
          </FormItem>
          <p>暂停该平台前，需要确认其商户在该平台的融资款项已还清，您确认需要暂停吗？</p>
          <FormItem>
            {
              getFieldDecorator('enableFlag',{
                initialValue:"disabled"
              })(<Input type="hidden" />)
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}

const UpdateplatformUserModalForm =  Form.create()(UpdateplatformUser);
export default UpdateplatformUserModalForm;
