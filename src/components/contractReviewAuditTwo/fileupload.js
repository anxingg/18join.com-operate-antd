/**
 * Created by fcb on 2017/8/16.
 */
import React from 'react';
import { Upload, Icon, Button ,message} from 'antd';

class UploadFile extends React.Component {
  state = {
    originName:''
  };

  handleChange = (info) => {
    if (info.file.status === 'done') {
      this.props.ObtainPath(info.file.response.message.newPath);
      message.success(info.file.response.message.originName+'已上传',3)
      this.setState({ originName:info.file.response.message.originName })
    }
  }

  render() {
    const imageUrl = this.state.imageUrl;
    const {joinuserid} = this.props;

    return (
      <Upload
        name="uploadFile"
        showUploadList={false}
        action={`/api/operate/uploadFile?format=json&busiDir=SL_PlatformUserCreditCertFile_gen&fileType=SUPPLY_CREDIT_INFO&fileOwnerId=${joinuserid}`}
        onChange={this.handleChange}
      >
        <Button style={{marginRight:10}}>
          <Icon type="upload" /> 上传
        </Button>
        {this.state.originName!=''?'（' + this.state.originName + '）':null}
      </Upload>
    );
  }
}
export default UploadFile;
