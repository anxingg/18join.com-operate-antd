/**
 * Created by fcb on 2017/8/11.
 */
import React from 'react';
import {Form,Button,AutoComplete,DatePicker,Input} from 'antd';
import {money100} from '../../utils/index';
import DownloadSLCheckAccountFileModal from './downloadSLCheckAccountFile'

const Option = AutoComplete.Option;
const FormItem = Form.Item;
class BalanceDailySearch extends React.Component {
  handleSubmit =(e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        values.curdate = values.curdate!=''?values.curdate.format('YYYY-MM-DD'):'';
        this.props.queryDailyLoanInfo(values);
        this.props.queryDailySum(values);
      }
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const {listnamemap,querylistnamemap,dailySum} = this.props;
    let listname = listnamemap.map((opt)=><Option key={opt.value}>{opt.label}</Option>)
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="商户名">
          {
            getFieldDecorator('idOfTbMerchantUser',{
              initialValue:''
            })(
              <AutoComplete dataSource={listname} filterOption={false} placeholder="请输入商户名称" style={{width:198}}>
                <Input onKeyUp={(e)=>querylistnamemap(e.target.value)} />
              </AutoComplete>
            )
          }
        </FormItem>

        <FormItem label="日期">
          {
            getFieldDecorator('curdate',{
              initialValue:''
            })(<DatePicker format="YYYY-MM-DD" />)
          }
        </FormItem>

        <Button icon="search"type="primary" htmlType="submit">查询</Button>
        <DownloadSLCheckAccountFileModal />

        <span style={{float:'right'}}>融资余额总计(元)：{money100(dailySum)}</span>

      </Form>
    )
  }
}

const BalanceDailySearchForm = Form.create()(BalanceDailySearch);
export default BalanceDailySearchForm;
