/**
 * Created by fcb on 2017/7/18.
 */
import React from 'react';
import {Form,AutoComplete,Button,Input,message} from 'antd';

const FormItem = Form.Item;
class SupplyChainLoanSearch extends React.Component{
  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        if(values.joinidstr==''){
          message.warning('商户名不能为空！');
        }else{
          this.props.queryplatdetail(values.joinidstr);
        }
      }
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const {querylistnamemap,SuppleChainLoanSearch} = this.props;
    const listname = querylistnamemap.map(opt=><Option key={opt.value}>{opt.label}</Option>)
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} style={{marginBottom:10}}>
        <FormItem >
          {
            getFieldDecorator('joinidstr',{
              initialValue:''
            })(
              <AutoComplete filterOption={false} dataSource={listname} style={{width:198}} placeholder="请输入商户名">
                <Input onKeyUp={(e)=>SuppleChainLoanSearch(e.target.value)} />
              </AutoComplete>
            )
          }
        </FormItem>

        <FormItem >
          <Button type="primary" htmlType="submit">查询</Button>
        </FormItem>
      </Form>
    )
  }
}

const SupplyChainLoanSearchForm = Form.create()(SupplyChainLoanSearch);
export default SupplyChainLoanSearchForm;
