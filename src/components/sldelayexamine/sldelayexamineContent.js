/**
 * Created by fcb on 2017/8/18.
 */
import React from 'react'
import {Row,Col,Form,Input,DatePicker,Button,Modal} from 'antd'
import {Link} from 'dva/router';
import {money100} from '../../utils/index'
import moment from 'moment'
import RefuseRenewedModal from './refuseRenewedModal'

const FormItem = Form.Item;
class sldelayexamineContent extends React.Component {

  state = {
    display:'none',
    disabled:false,
    see:this.props.see
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        values.renewedBegintime = values.renewedBegintime.format('YYYY-MM-DD')
        values.renewedEndTime = values.renewedEndTime.format('YYYY-MM-DD')

        this.props.agreeRenewed(values)
      }
    })
  }


  handleEdit = () => {
    this.setState({
      display:'inline-block',
      see:false
    })
  }

  render(){
    const {renewedInfo,rows,refuseRenewed} = this.props;
    const {see} = this.state;
    const {getFieldDecorator}  = this.props.form;

    return (
     <Row>
       <Row style={{marginBottom:10}}>
         <h2 style={{marginBottom:10}}><b>商户基本信息</b></h2>
         <Col span={6}>
           <b>商户名：</b>{rows.mhtname}
         </Col>
         <Col span={6}>
           <b>电商平台：</b>{rows.platformCnname}
         </Col>
         <Col span={6}>
           <b>平台账号：</b>{rows.userName}
         </Col>
         <Col span={6}>
           <b>融资编号：</b>{rows.code}
         </Col>
       </Row>

       <Row style={{marginBottom:10}}>
         <Col span={6}>
           <b>融资本金(元)：</b>{money100(rows.accountDelta)}
         </Col>
         <Col span={6}>
           <b>未还融资本金(元)：</b>{money100(rows.totalNotPaybackAmount)}
         </Col>
         <Col span={6}>
           <b>未还融资利息(元)：</b>{money100(rows.totalNotPaybackFee)}
         </Col>
         <Col span={6}>
           <b>到期剩余天数(天)</b>：{rows.days}
         </Col>
       </Row>
       <Form onSubmit={this.handleSubmit}>
         <Row style={{marginTop:40}}>
           <h2 style={{marginBottom:10}}><b>展期信息</b></h2>
           <Col span={6}>
             <b>未还本金(元)：</b>
             <FormItem style={{marginTop:10}}>
               {
                 getFieldDecorator('amount',{
                   initialValue:money100(renewedInfo.amount)
                 })(<Input type="number" disabled style={{width:159}} />)
               }
             </FormItem>
           </Col>
           <Col span={6}>
             <b>展期起始日期：</b>
              <FormItem style={{marginTop:10}}>
                {
                  getFieldDecorator('renewedBegintime',{
                    initialValue:moment(renewedInfo.renewedBegintime,'YYYY-MM-DD'),
                    rules:[{required:true,message:'展期起始日期不能为空！'}]
                  })(<DatePicker disabled={see} fromat="YYYY-MM-DD" />)
                }
              </FormItem>
           </Col>
           <Col span={6}>
             <b>展期截止日期：</b>
             <FormItem style={{marginTop:10}}>
             {
               getFieldDecorator('renewedEndTime',{
                 initialValue:see?moment(renewedInfo.renewedEndTime,'YYYY-MM-DD'):'',
                 rules:[{required:true,message:'展期截止日期不能为空！'}]
               })(<DatePicker disabled={see} fromat="YYYY-MM-DD" />)
             }
           </FormItem>
           </Col>
         </Row>

         <Row style={{marginBottom:10}}>
           <Col span={6}>
             <b>展期期间日利率(%)：</b>
             <FormItem style={{marginTop:10}}>
               {
                 getFieldDecorator('renewedRate',{
                   initialValue:renewedInfo.renewedRate,
                   rules:[{required:true,message:'展期期间日利率不能为空！'}]
                 })(<Input disabled={see} type="number" placeholder="请输入展期日利率" style={{width:159}} />)
               }
             </FormItem>
           </Col>
           <Col span={6}>
             <b>展期服务费(元)：</b>
             <FormItem style={{marginTop:10}}>
               {
                 getFieldDecorator('renewedAmount',{
                   initialValue:renewedInfo.renewedAmount,
                   rules:[{required:true,message:'展期服务费不能为空！'}]
                 })(<Input disabled={see} type="number" placeholder="请输入展期服务费" style={{width:159}} />)
               }
             </FormItem>
           </Col>
           <Col span={6}>
             <b>展期期间手续费率(%)：</b>
             <FormItem style={{marginTop:10}}>
               {
                 getFieldDecorator('renewedfee',{
                   initialValue:renewedInfo.renewedfee,
                   rules:[{required:true,message:'手续费率不能为空！'}]
                 })(<Input disabled={see} type="number" placeholder="请输入手续费率" style={{width:159}} />)
               }
             </FormItem>
           </Col>

           <Col span={6}><Link style={{lineHeight:'80px'}}>下载展期申请书</Link></Col>
         </Row>

         {
           see?
             <Row style={{marginTop:40}}>
             <Col offset={18} span={6}>
               <Button style={{display:this.state.display=='inline-block'?'none':'inline-block'}} onClick={this.handleEdit} type="primary">编辑</Button>
               <Button ref="submitBtn" type="primary"  style={{display:this.state.display}}  htmlType="submit">通过</Button>
             </Col>
           </Row>
           :
           <Row style={{marginTop:40}}>
             <Col offset={18} span={6}>
               <Button type="primary" htmlType="submit">通过</Button>
               <RefuseRenewedModal refuseRenewed={refuseRenewed} />
             </Col>
           </Row>
         }
       </Form>
     </Row>
    )
  }
}
const sldelayexamineContentForm = Form.create()(sldelayexamineContent)
export default sldelayexamineContentForm
