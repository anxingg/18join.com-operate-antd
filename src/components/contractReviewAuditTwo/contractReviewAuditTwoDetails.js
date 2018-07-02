/**
 * Created by fcb on 2017/8/15.
 */
import React from 'react';
import {Col,Row,Form,Input,DatePicker,Button ,message } from 'antd'
import {Link} from 'dva/router'
import moment from 'moment'
import FileUpload from './fileupload';
import RejectModal from './rejectModal'

const FormItem = Form.Item;
class ContractReviewAuditTwoDetails extends React.Component {
  state = {
    startDate:'',
    endDate:'',
    path:''
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    let path = this.state.path;
    this.props.form.validateFields((err,values)=>{
      values.creditFile = path;
      values.creditDate = values.creditDate.format('YYYY-MM-DD HH:mm:ss');
      values.expiredDate = values.expiredDate.format('YYYY-MM-DD');
      if(!err){
        if(values.creditFile!=''){
          this.props.updateMerchantUserCreditCheckInfo(values);
        }else{
          message.warning('请上传动产融资登记！',3)
        }
      }
    })
  }

  ObtainPath = (e) =>{
    this.setState({
      path:e
    })
  }

  onStartChange =(value)=>{
    this.props.form.setFieldsValue({
      expiredDate:moment(value).add(1,'years')
    });
    this.setState({
      startDate:value,
      endDate:moment(value).add(1,'years')
    })
  }

  render(){
    const {dateValue,endDates} = this.state;
    const {queryRealNameInfo,userList,joinuserid,reject,id} = this.props;
    const {getFieldDecorator} = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row type="flex" justify="space-around">
          <Col span={8}>
            <span>商户名：{userList.fullname}</span>
          </Col>
          <Col span={8}>
           <span> 商户手机号：{userList.mobile}</span>
          </Col>
          <Col span={8}>
            <span>电商平台数：{userList.platformuserList!=undefined?userList.platformuserList.length:0}</span>
          </Col>
        </Row>

        <Row style={{marginTop:20}} type="flex" justify="space-around">
          <Col span={8}>
            营业执照预览：
            <img style={{maxWidth:'80%',marginTop:10}} src={queryRealNameInfo.yyzz} />
          </Col>
          <Col span={8}>
            法人身份证预览：
            <img style={{maxWidth:'80%',marginTop:10}} src={queryRealNameInfo.frsfz} />
          </Col>
          <Col span={8}>
            组织代码机构证预览：
            <img style={{maxWidth:'80%',marginTop:10}} src={queryRealNameInfo.zzjgdmz} />
          </Col>
        </Row>
          <Row style={{marginTop:20}} type="flex">
            <Col span={8}>
              <FormItem label="征信证明编号">
                {
                  getFieldDecorator('creditNo',{
                    initialValue:'',
                    rules:[{required:true,message:'征信证明编号不能为空！'}]
                  }) (<Input placeholder="请输入您的征信证明编号" style={{width:194}} />)
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="登记时间">
                {
                  getFieldDecorator('creditDate',{
                    initialValue:'',
                    rules:[{required:true,message:'登记时间不能为空！'}]
                  }) (<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width:218}} />)
                }
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="上传动产融资">
                {
                  getFieldDecorator('creditFile',{
                    initialValue:'',
                  }) (<FileUpload ObtainPath={this.ObtainPath} joinuserid={queryRealNameInfo.idOfTbMerchantUser} />)
                }
              </FormItem>
            </Col>
          </Row>

          <Row style={{marginTop:20}} type="flex" >
            <Col span={8}>
              <FormItem label="保理合同有效期(起始)">
                {
                  getFieldDecorator('startDate',{
                    initialValue:'',
                    rules:[{required:true,message:'保理合同有效期(起始)不能为空！'}]
                  })(
                    <DatePicker
                      // defaultValue={dateValue ? moment(dateValue):dateValue}
                      // value={userList.applyvo!=undefined?moment(userList.applyvo.creditEndDate,'YYYY-MM-DD'):null}
                      onChange={this.onStartChange}
                    />
                  )
                }
                <br />
                <Link target="_blank" to={`/api/renew/${id}/download`}>下载保理合同</Link>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem  label="保理合同有效期(截止)" >
                {
                  getFieldDecorator('expiredDate',{
                    initialValue:'',
                    rules:[{required:true,message:'保理合同有效期(截止)不能为空！'}]
                  }) ( <DatePicker disabled /> )
                }
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem>
                {
                  getFieldDecorator('idOfTbMerchantUser',{
                    initialValue:queryRealNameInfo.idOfTbMerchantUser
                  })(<Input type="hidden" />)
                }
              </FormItem>
            </Col>
          </Row>

          <Row style={{marginTop:20}}>
            <Col span={8} offset={16}>
              <Button type="primary" htmlType="submit">确定</Button>
              <RejectModal reject={reject} />
            </Col>
          </Row>
  </Form>

  )
  }
}
const ContractReviewAuditTwoDetailsForm = Form.create()(ContractReviewAuditTwoDetails)
export default ContractReviewAuditTwoDetailsForm;
