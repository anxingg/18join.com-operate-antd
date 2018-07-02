import React from 'react'
import { Form, Button, Input, Select, DatePicker, AutoComplete,Row } from 'antd'
import moment from 'moment'
import PlatformAll from '../ui/platformall'
import styles from './slmanager.less'

const FormItem = Form.Item;

class SearchTableForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        values['statDate'] = values['statDate']?values['statDate'].format('YYYY-MM-DD'):'';
        this.props.querytbsltask(values)
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {listnamemap, autoInputName, queryplatformUname} = this.props
    const dataNameMap = listnamemap.map(opt => <Option key={opt.label} value={opt.value}> {opt.label} </Option>)

    const userComplete = {
      dataNameMap,
      autoInputName,
      queryplatformUname    //所有平台
    }

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem label="商户名">
            {
              getFieldDecorator('merchantUserId',{
                label:'请输入商户名',
                initialValue:''
              })(
                <AutoComplete  dataSource={dataNameMap} filterOption={false} className={styles.AutoComplete} placeholder="请输入商户名">
                  <Input value="" onKeyUp={(ev)=>autoInputName(ev.target.value)} />
                </AutoComplete>
              )
            }
          </FormItem>

          <FormItem label="平台">
            {
              getFieldDecorator('platformName',{
                label:'全部',
                initialValue:''
              })(
                <Select size="large" style={{ width: 160,marginLeft:20 }}  placeholder="全部" >
                  {
                    queryplatformUname.map(function(v,i){
                      if(i==0){ return <Option key={0}  value="">全部</Option> }
                      return <Option key={i+1}  value={v.platformName}>{v.platformCnname}</Option>
                    })
                  }
                </Select>
              )
            }
          </FormItem>

          <FormItem label="状态">
            {
              getFieldDecorator('enableFlag',{
                label:'全部',
                initialValue:''
              })(<Select size="large" className={styles.enableFlag} placeholder="全部" >
                <Option value="">全部</Option>
                <Option value="inited">初始</Option>
                <Option value="enabled">正常抓取</Option>
                <Option value="paused">申请暂停</Option>
                <Option value="disabled">已暂停</Option>
              </Select>)
            }
          </FormItem>

          <FormItem label="日期">
            {
              getFieldDecorator('statDate',{
                initialValue:moment(new Date(),'YYYY-MM-DD')
              })(<DatePicker />)
            }
          </FormItem>

          <Button type="primary" htmlType="submit" icon="search" className={styles.mleft}> 查询 </Button>

      </Form>
    )
  }
}

// export default SearchTableForm
const SearchTable = Form.create()(SearchTableForm)
export default SearchTable
