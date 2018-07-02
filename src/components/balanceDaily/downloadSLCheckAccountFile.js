/**
 * Created by fcb on 2017/8/11.
 */
import React from 'react';
import {Modal,Radio,Button } from 'antd';

const RadioGroup = Radio.Group;
const options = [
  { label: '全部记录', value: '1'},
  { label: '未还清记录', value: '0' },
];

class DownloadSLCheckAccountFileModal extends React.Component {
  state = {
    visible:false
  }

  showModal = () =>{
    this.setState({
      visible:true
    })
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render(){
    return (
      <span style={{marginLeft:10}} >
        <Button onClick={this.showModal} icon="download" type="primary">导出</Button>
        <Modal
          title="下载对账明细单"
          visible={this.state.visible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <RadioGroup options={options} />
        </Modal>
      </span>
    )
  }
}
export default DownloadSLCheckAccountFileModal;
