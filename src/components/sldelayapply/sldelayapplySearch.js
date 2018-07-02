/**
 * Created by huiyin on 2017/6/9.
 */
import React from 'react'
import {Form,Button,Select,DatePicker,AutoComplete,Input} from 'antd'
import Platform from '../ui/platformall'
import moment from 'moment'
import styles from './sldelayapply.less'

const FormItem = Form.Item;
const Option = Select.Option;
class SldelayapplySearch extends React.Component{
  handsubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values) =>{
      if(!err){
        values['startDate'] = values['startDate']?values['startDate'].format('YYYY-MM-DD'):'';
        values['endDate'] = values['endDate']?values['endDate'].format('YYYY-MM-DD'):'';
        this.props.queryRenewedCredit(values)
      }
    })
  }
  render(){
    const { getFieldDecorator} = this.props.form;
    const {queryplatformUname,initnamemap,autoInitNameMap} = this.props

    const namemap = initnamemap.map((opt) => <Option key={opt.label} value={opt.value}> {opt.label} </Option>)

    const platformProps = {
      queryplatformUname:queryplatformUname
    }

    return (
      <div className={styles.formContent}>
        <Form layout="inline" onSubmit={this.handsubmit}>
          <FormItem label="商户名">
            {
              getFieldDecorator('userIdOfJoinOfDebtor',{
                label:'商户名',
                initialValue:''
              })(
                <AutoComplete className={styles.AutoComplete} dataSource={namemap} filterOption={false}>
                  <Input  value="" placeholder="请选择商户名" onKeyUp={(e)=>autoInitNameMap(e.target.value)} />
                </AutoComplete>
              )
            }
          </FormItem>

          <FormItem label="平台">
            {
              getFieldDecorator('idOfPlatform',{
                label:'',
                initialValue:''
              })(
                <Select size="large" className={styles.selectPlName}  placeholder="全部" >
                  {
                    queryplatformUname.map(function(v,i){
                      if(i==0){ return <Option key={0}  value="">全部</Option> }
                      return <Option key={i+1}  value={v.id}>{v.platformCnname}</Option>
                    })
                  }
                </Select>
              )
            }
          </FormItem>

          <FormItem>
            {
              getFieldDecorator('startDate',{
                initialValue:''
              })(<DatePicker placeholder="开始时间" />)
            }
          </FormItem>

          <FormItem>
            {
              getFieldDecorator('endDate',{
                initialValue:''
              })(<DatePicker placeholder="结束时间" />)
            }
          </FormItem>

          <Button className={styles.mleft20} type="primary" htmlType="submit" icon="search"> 查询 </Button>
        </Form>
      </div>
    )
  }
}
const SldelayapplySearchForm = Form.create()(SldelayapplySearch);
export default SldelayapplySearchForm
