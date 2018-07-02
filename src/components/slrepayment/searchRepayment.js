/**
 * Created by fcb on 2017/5/25.
 */
import React,{PropTypes} from 'react'
import {Input,AutoComplete,Form,Button,message} from 'antd'
import CalculatefeeModal from './calculatefeeByMhtnoModal'
import styles from './slrepayment.less'

const FormItem = Form.Item;
const Option = AutoComplete.Option;
class SearchRepayment extends React.Component{
  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if(!err){
        if(values.mhtno==''||values.mhtno==undefined){
          message.warning('请输入要查询的商户名',2)
        }else{
          this.props.queryslrepayment(values.mhtno)
          this.props.queryAccountBalanceByMhtnoAndTypeAT01(values.mhtno)
          this.props.queryAccountBalanceByMhtnoAndTypeAT02(values.mhtno)
        }
      }
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { querynamemap,listnamemap,mhtno,operateCalculatefeeByMhtno ,accountBalance,queryBalance,queryAccountBalanceByMhtnoAndTypeAT01,queryAccountBalanceByMhtnoAndTypeAT02} = this.props
    const dataNameMap = listnamemap.map(ev => <Option key={ev.label} value={ev.mhtNo}>{ev.label}</Option>)
    const CalculatefeeModalProps = {
      mhtno:mhtno,
      onOk:operateCalculatefeeByMhtno,
      queryAccountBalanceByMhtnoAndTypeAT01:queryAccountBalanceByMhtnoAndTypeAT01,
      queryAccountBalanceByMhtnoAndTypeAT02:queryAccountBalanceByMhtnoAndTypeAT02
    }

    return (
      <Form layout="inline" onSubmit={this.handleSubmit} className={styles.form}>
        <FormItem>
          {
            getFieldDecorator('mhtno',{
              label:'请输入商户名',
              initialValue:''
            })(
              <AutoComplete dataSource={dataNameMap} filterOption={false} className={styles.querynamemap} placeholder="请输入商户名">
                <Input onKeyUp={(e)=>querynamemap(e.target.value)} />
              </AutoComplete>
            )
          }
        </FormItem>

        <Button type="primary" htmlType="submit" icon="search" > 查询 </Button>

        <CalculatefeeModal {...CalculatefeeModalProps} />

        <span className={styles.accountBalanceRow}>
          <span className={styles.mRight40}>基本户余额(元)：{(accountBalance/100).toFixed(2)}</span>
          <span>结算户余额(元)：{(queryBalance/100).toFixed(2)}</span>
        </span>
      </Form>
    )
  }
}
const SearchRepaymentInput = Form.create()(SearchRepayment)
export default SearchRepaymentInput
