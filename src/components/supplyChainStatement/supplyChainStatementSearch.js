/**
 * Created by fcb on 2017/8/4.
 */
import React from 'react';
import {Select,Form,AutoComplete,Input,Button,Radio,DatePicker,Row,Col,message,Switch} from 'antd';
import moment from 'moment';
import {money100} from '../../utils/index';
import DatePickerRadio from './datePickerRadio'

const Option = Select.Option;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
class SupplyChainStatementSearch extends React.Component {
  state = {
    visible:'none',
    startDate:moment().format('YYYY-MM-DD'),
    endDate:moment().format('YYYY-MM-DD')
  }

  RadioGroupChange = (e) =>{
    this.setState({
      startDate:e.startDate,
      endDate:e.endDate
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        values.startDate = this.state.startDate
        values.endDate = this.state.endDate

        if(this.props.isFinancingSearch){
          this.props.queryLoanSum(values);
          this.props.queryLoanbill(values);
        }else{
          this.props.queryRefundSum(values);
          this.props.queryRefundBill(values);
        }
      }
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const {isFinancing,listnamemap,querylistnamemap,isFinancingSearch,queryLoanSumMap,queryRefundSumMap} = this.props;
    const listname = listnamemap.map(opt=><Option key={opt.value}>{opt.label}</Option>)

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>

        <Switch onChange={(e)=>isFinancing(e)} checkedChildren="融资对账" unCheckedChildren="还款对账" />

        <Row style={{marginTop:10}}>
          <Col span={8}>
            <FormItem label=" 商 户 名 ">
              {
                getFieldDecorator('userIdOfJoinOfDebtor',{
                  initialValue:''
                })(
                  <AutoComplete dataSource={listname} style={{width:198}} placeholder="请输入查询的商户名" filterOption={false}>
                    <Input onKeyUp={e=>querylistnamemap(e.target.value)} />
                  </AutoComplete>
                )
              }
            </FormItem>
          </Col>
          {
            isFinancingSearch?
              <Col span={8} style={{float:'right',textAlign:'right'}}>
                <span>融资总额：{money100(queryLoanSumMap.deabltSum)}</span>
                <span style={{marginLeft:10}}>总未还本金额度：{money100(queryLoanSumMap.totalNotPayBackSum)}</span>
              </Col>:
              <Col span={8} style={{float:'right',textAlign:'right'}}>
                <span>总还款本金：{money100(queryRefundSumMap.refundPricipal)}</span>
                <span style={{marginLeft:10}}>总还款利息：{money100(queryRefundSumMap.refundRate)}</span>
              </Col>
          }

        </Row>

        <Row style={{marginTop:10}}>
          <Col>
            <FormItem label="交易日期">
              {
                getFieldDecorator('date',{
                  initialValue:'today'
                })(<DatePickerRadio RadioGroupChange={this.RadioGroupChange} />)
              }
            </FormItem>

            <Button style={{float:'right'}} type="primary" htmlType="submit">查询</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
const SupplyChainStatementSearchForm = Form.create()(SupplyChainStatementSearch)
export default SupplyChainStatementSearchForm;
