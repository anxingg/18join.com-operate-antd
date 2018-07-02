/**
 * Created by fcb on 2017/7/31.
 */
import React from 'react';
import {Form,AutoComplete,Select,Input,Button} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class AdjustedinterestSearch extends React.Component {
  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        this.props.queryFloat(values);
      }
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const {namelist,querylistnamemap,queryplatformUname} = this.props;
    const AutoCompleteDataSource = namelist.map(opt=><Option key={opt.value}>{opt.label}</Option>);
    return (
      <Form layout="inline" style={{marginBottom:10}} onSubmit={this.handleSubmit}>
        <FormItem label="商户名">
          {
            getFieldDecorator('userIdOfJoinOfDebtor',{
              initialValue:''
            })(
              <AutoComplete placeholder="请输入商户名" dataSource={AutoCompleteDataSource} filterOption={false} style={{width:198}}>
                <Input onKeyUp={(e)=>querylistnamemap(e.target.value)} />
              </AutoComplete>
            )
          }
        </FormItem>

        <FormItem label="平台">
          {
            getFieldDecorator('platformName',{
              initialValue:''
            })(<Select placeholder="请选择平台" style={{width:198}}>
              {
                queryplatformUname.map(opt=><Option key={opt.platformName}>{opt.platformCnname}</Option>)
              }
            </Select>)
          }
        </FormItem>

        <FormItem label="融资编号">
          {
            getFieldDecorator('code',{
              initialValue:''
            })(<Input placeholder="请输入融资编号" />)
          }
        </FormItem>

        <Button type="primary" htmlType="submit">查询</Button>
      </Form>
    )
  }
}
const AdjustedinterestSearchForm = Form.create()(AdjustedinterestSearch);
export default AdjustedinterestSearchForm;

