/**
 * Created by fcb on 2017/8/22.
 */
import React from 'react';
import {Row,Col,DatePicker,Input,Radio,Form,Button} from 'antd'
import List from './list'
import {Link} from 'dva/router'
import moment from 'moment'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class SlplatformContent extends React.Component {

  state = {
    pfList:this.props.arrList
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        values.yyzzExpireDate =  values.yyzzExpireDate.format('YYYY-MM-DD')
        values.id = this.props.list.applyvo.id
        values.idOfTbMerchantUser = this.props.list.applyvo.idOfTbMerchantUser
        values.rowUpdateTime = this.props.list.applyvo.rowUpdateTime

        this.props.saveSLLoanCreditAggVO({applyvo:values,platformuserList:this.state.pfList,shortname:this.props.list.shortname})
      }
    })
  }

  render(){
    const {list,arrList,needBindAlipay,unNeedBindAlipay} = this.props;
    const {getFieldDecorator} = this.props.form;
    const that = this;

    const ListProps = {
      needBindAlipay:needBindAlipay,
      unNeedBindAlipay:unNeedBindAlipay,
      platformuserList:list.platformuserList,
      arrList:arrList,
      handleList:function(e){
        that.setState({
          pfList:e
        })
      }
    }

    return (
      <Row>
        <Row>
          <h2 style={{marginBottom:10}}>用户基本信息</h2>
          <Col span={6}>
            <b>商户名：</b>{list.fullname}
          </Col>
          <Col span={6}>
            <b>商户手机号：</b>{list.mobile}
          </Col>
          <Col span={6}>
            <b>申请时间：</b>{list.applyvo!=undefined?list.applyvo.creaitApplyDate:''}
          </Col>
          <Col span={6}>
            <b>电商平台数：</b>{list.platformuserList!=undefined?list.platformuserList.length:0}
          </Col>
        </Row>

        <Form onSubmit={this.handleSubmit}>
          <Row style={{marginTop:30}}>
            <h2>通用授信信息</h2>
            <Col span={6}>
              <FormItem label="商家简称">
                {
                  getFieldDecorator('shortname',{
                    initialValue:list.shortname,
                    rules:[{required:true,message:'商家简称不能为空!'}]
                  })(<Input style={{width:159}} />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="营业执照到期日">
                {
                  getFieldDecorator('yyzzExpireDate',{
                    initialValue:list.applyvo!=undefined?moment(list.applyvo.yyzzExpireDate,'YYYY-MM-DD'):'',
                    rules:[{required:true,message:'营业执照到期日不能为空!'}]
                  })(<DatePicker format="YYYY-MM-DD" />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="合同到期计算方式">
                {
                  getFieldDecorator('credit_end_date_type',{
                    initialValue:'fixeddate',
                    rules:[{required:true,message:'合同到期计算方式不能为空!'}]
                  })(<RadioGroup defaultValue="fixeddate">
                    <Radio defaultChecked  value='fixeddate'>指定日期</Radio>
                    <Radio disabled value='oneyeardate'>固定一年</Radio>
                  </RadioGroup>)
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="合同有效期">
                {
                  getFieldDecorator('creditEndDate',{
                    initialValue:list.applyvo!=undefined?moment(list.applyvo.creditEndDate,'YYYY-MM-DD'):'',
                    rules:[{required:true,message:'合同有效期不能为空!'}]
                  })(<DatePicker disabled format="YYYY-MM-DD" />)
                }
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <FormItem label="展期服务费率(%)">
                {
                  getFieldDecorator('renewedServicefee',{
                    initialValue:list.applyvo!=undefined?list.applyvo.renewedServicefee:'',
                    rules:[{required:true,message:'展期服务费率不能为空!'}]
                  })(<Input style={{width:159}} type="number" />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="展期上浮日利率(%)">
                {
                  getFieldDecorator('renewedRate',{
                    initialValue:list.applyvo!=undefined?list.applyvo.renewedRate:'',
                    rules:[{required:true,message:'展期上浮日利率不能为空!'}]
                  })(<Input style={{width:159}} type="number" />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="展期上浮手续费率(%)">
                {
                  getFieldDecorator('renewedFee',{
                    initialValue:list.applyvo!=undefined?list.applyvo.renewedFee:'',
                    rules:[{required:true,message:'展期上浮手续费率不能为空!'}]
                  })(<Input style={{width:159}} type="number" />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="罚息上浮日利率(%)">
                {
                  getFieldDecorator('penalty',{
                    initialValue:list.applyvo!=undefined?list.applyvo.penalty:'',
                    rules:[{required:true,message:'罚息上浮日利率不能为空!'}]
                  })(<Input style={{width:159}} type="number" />)
                }
              </FormItem>
            </Col>
          </Row>

          <Row style={{marginTop:20}}>
            <h2 style={{marginBottom:10}}>平台授信信息</h2>

            <List {...ListProps} />
          </Row>

          <Row style={{marginTop:20}} >
            <Col offset={20} span={4}>
              <Button type="primary" htmlType="submit">确定修改</Button>
            </Col>
          </Row>
        </Form>
      </Row>
    )
  }
}

const SlplatformContentForm = Form.create()(SlplatformContent)
export default SlplatformContentForm
