/**
 * Created by fcb on 2017/7/27.
 */
import React from 'react';
import {Upload,message,Icon} from 'antd';
import styles from './slloanrepayment.less';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforUpload(file){
  const isImg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name);
  if(!isImg){
    message.warning('图片类型必须是.gif,jpeg,jpg,png中的一种!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片必须小于2MB！');
  }
  return isImg && isLt2M;
}
class AutoRefundUpload extends React.Component {
  state = {}
  handleChange = (info) =>{
    if(info.file.status==='done'){
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      this.props.AutoRefundPath(info.file.response.message.newPath);
    }
  }
  render(){
    const {joinidstr} = this.props;
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="uploadFile"
        className={styles.avatarUploader}
        showUploadList={false}
        action={`/api/operate/uploadFile?format=json&busiDir=SL_PlatformUserCreditCertFile_gen&fileType=SUPPLY_REFUND_CERTIFICATE&fileOwnerId=${joinidstr}`}
        beforeUpload={beforUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl?
            <img src={imageUrl} alt="" className={styles.avatar} /> :
            <Icon type="plus" className={styles.avatarUploaderTrigger} />
        }
      </Upload>
    )
  }
}
export default AutoRefundUpload;
