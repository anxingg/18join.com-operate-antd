/**
 * Created by fcb on 2017/7/19.
 */
import React from 'react';
import { Upload, Icon, message } from 'antd';
import styles from './DetermineAmount.less'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isImg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)
  if (!isImg) {
    message.error('图片类型必须是.gif,jpeg,jpg,png中的一种!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片必须小于2MB！');
  }
  return isImg && isLt2M;
}

class UploadFile extends React.Component {
  state = {};

  handleChange = (info) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      this.props.ObtainPath(info.file.response.message.newPath);
    }
  }

  render() {
    const imageUrl = this.state.imageUrl;
    const {joinidstr} = this.props;
    return (
      <Upload
        className={styles.avatarUploader}
        name="uploadFile"
        showUploadList={false}
        action={`/api/operate/uploadFile?format=json&busiDir=SL_PaymentReceipt_dir&fileType=SUPPLY_PAYMENT_RECEIPT&fileOwnerId=${joinidstr}`}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} alt="" className={styles.avatar} /> :
            <Icon type="plus" className={styles.avatarUploaderTrigger} />
        }
      </Upload>
    );
  }
}
export default UploadFile;

