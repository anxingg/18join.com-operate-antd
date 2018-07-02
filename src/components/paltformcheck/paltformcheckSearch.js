/**
 * Created by fcb on 2017/6/28.
 */
import React,{PropTypes} from 'react'
import {AutoComplete ,Select,Button,Form,Input,message,Row} from 'antd';
import styles from './paltformcheck.less'

const Option = Select.Option;
const FormItem = Form.Item;
class paltformcheckSearch extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.joinuserid==''||values.joinuserid==undefined){
          message.warning('请选择要查询的商户名！');
        }else{
          this.props.queryplatformUser(values)
        }
      }
    });
  }

  render(){
    const {initplatname,platnamemap,platformUname,queryplatformstatues} = this.props;
    const { getFieldDecorator } = this.props.form;
    let initplatnamemap = platnamemap.map(opt => <Option key={opt.value}> {opt.label} </Option>)
    let queryplatformstatuesBuild = Object.keys(queryplatformstatues);

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem label="商户名">
            {
              getFieldDecorator('joinuserid',{
                label:'请输入商户名',
                initialValue:''
              })(
                <AutoComplete filterOption={false} dataSource={initplatnamemap} className={styles.AutoComplete} placeholder="请输入商户名">
                  <Input value="" onKeyUp={(e)=>initplatname(e.target.value)} />
                </AutoComplete>
              )
            }
          </FormItem>

          <FormItem label="平台">
            {
              getFieldDecorator('platform_name',{
                label:'请选择平台',
                initialValue:''
              })(
                <Select size="large" className={styles.Select}>
                  {
                    platformUname.map(function(v,i){
                      if(i==0){ return <Option key={0}  value="">全部</Option> }
                      return <Option key={i+1}  value={v.platformName} >{v.platformCnname}</Option>
                    })
                  }
                </Select>
              )
            }
          </FormItem>

          <FormItem label="平台状态">
            {
              getFieldDecorator('paltformStatues',{
                label:'请选择用户状态',
                initialValue:'enabled'
              })(
                <Select size="large" className={styles.Select}>
                  {
                    queryplatformstatuesBuild.map(opt=> <Option key={opt} value={opt}>{queryplatformstatues[opt]}</Option>)
                  }
                </Select>
              )
            }
          </FormItem>

          <FormItem label="银行账户">
            {
              getFieldDecorator('iscontactfinaceaccount',{
                label:'请选择银行账户设置状态',
                initialValue:''
              })(
                <Select size="large" className={styles.Select}>
                  <Option key="0" value="">全部</Option>
                  <Option key="1" value="1">未设置</Option>
                </Select>
              )
            }
          </FormItem>

          <Button type="primary" htmlType="submit" icon="search" > 查询 </Button>
      </Form>
    )
  }
}

const paltformcheckSearchForm = Form.create()(paltformcheckSearch);
export default paltformcheckSearchForm
