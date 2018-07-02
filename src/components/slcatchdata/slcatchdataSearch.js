/**
 * Created by fcb on 2017/7/13.
 */
import React from 'react';
import moment from 'moment';
import{AutoComplete ,Select,DatePicker,Form,Input,Row,Col,Button ,Icon} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class SlcatchdataSearch extends React.Component{
  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if (!err) {
          values['startDate'] = values['startDate'].format('YYYY-MM-DD');
          values['endDate'] = values['endDate'].format('YYYY-MM-DD');
          this.props.queryByPlatformAndMerchantUserIDAndDate(values);
      }
    })
  }

  downloadData = () =>{
    this.props.form.validateFields((err,values)=>{
      if(!err){
        values['startDate'] = values['startDate'].format('YYYY-MM-DD');
        values['endDate'] = values['endDate'].format('YYYY-MM-DD');
        window.location.href = `tbslloanstattotal/export?statDate=${values.startDate}&endDate=${values.endDate}&platformName=${values.platformName}&merchantUserId=${values.merchantUserId}`;
      }
    })

  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {listnamemap,querylistnamemap,queryplatformUname} = this.props;
    const namemap = listnamemap.map(opt=><Option key={opt.value}>{opt.label}</Option>);
    const date = new Date();
    const yesterday = new Date();
    let yesterday_milliseconds = date.getTime() - 1000 * 60 * 60 * 24;
    yesterday.setTime(yesterday_milliseconds);

    return (
      <Form style={{marginBottom:20}} layout="inline" onSubmit={this.handleSubmit}>
        <Row>
          <Col span={5}>
            <FormItem label="商户名：">
              {
                getFieldDecorator('merchantUserId',{
                  initialValue:''
                })(
                  <AutoComplete dataSource={namemap}  style={{width:150}} filterOption={false}>
                    <Input onKeyUp={(e)=>querylistnamemap(e.target.value)} placeholder="请输入您要查询的商户名" />
                  </AutoComplete>
                )
              }
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="电商平台">
              {
                getFieldDecorator('platformName',{
                  initialValue:''
                })(<Select style={{width:140}}>
                  {
                    queryplatformUname.map((opt,index)=><Option key={opt.platformName}>{opt.platformCnname}</Option>)
                  }
                </Select>)
              }
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem label="起始日期">
              {
                getFieldDecorator('startDate',{
                  initialValue:moment(yesterday,'YYYY-MM-DD')
                })(<DatePicker />)
              }
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem label="结束日期">
              {
                getFieldDecorator('endDate',{
                  initialValue:moment(new Date(),'YYYY-MM-DD')
                })(<DatePicker />)
              }
            </FormItem>
          </Col>

          <Col span={2}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Icon onClick={()=>this.downloadData()} type="download" title="导出数据" style={{ fontSize: 16, color: '#08c',marginLeft:10,cursor:'pointer' }} />
          </Col>
        </Row>
      </Form>
    )
  }
}

const SlcatchdataSearchForm = Form.create()(SlcatchdataSearch);
export default SlcatchdataSearchForm;
