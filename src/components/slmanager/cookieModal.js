import { Modal, Button, Input, Form, } from 'antd';
import styles from './slmanager.less'
const FormItem = Form.Item;

class AppModal extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onOk(values);
        this.handleCancel()
      }
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    let {idOfPlatformUser} = this.props;

    return (
      <div>
        <Button  type="primary"  icon="retweet" className={styles.operateBtn} onClick={this.showModal}>更新Cookie</Button>

        <Modal title="更新Cookie" visible={this.state.visible}
         onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleOk}>
            <FormItem label="Cookie">
              {
                getFieldDecorator('cookie',{
                  rules: [
                    {required: true, message: '不允许为空'}
                  ]
                })(<Input />)
              }
            </FormItem>
            <FormItem label="ID">
              {
                getFieldDecorator('idOfPlatformUser',{
                  initialValue:idOfPlatformUser
                })(<Input readOnly />)
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(AppModal)
