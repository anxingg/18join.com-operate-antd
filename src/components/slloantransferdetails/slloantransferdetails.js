/**
 * Created by fcb on 2017/8/8.
 */
import React from 'react';
import {Form,Button,Input,Tag,Popconfirm} from 'antd';
import {money100} from '../../utils/index'

const FormItem = Form.Item;
class SlloantransferdetailsList extends React.Component {

  handleUpdateForDealRedoWithStatus = (e) =>{
    e.preventDefault();
    const {list,row} = this.props;
    if(list.tradeStatus=='00'&& row.accTypeTo.indexOf('cradId')>=0){
      this.props.updateForDealRedoWithStatus(list);
    }else if(list.tradeStatus=='00'){
      this.props.redo(list)
    }else if(list.tradeStatus=='01'){
      this.props.updateForDealRedoWithStatus2(list)
    }
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {list,row,loading} = this.props;

    return (
      <Form layout="vertical">
        <FormItem label="转出方">
          {
           getFieldDecorator('fromMhtname',{
             initialValue:row.fromMhtname+'('+ row.accTypeFrom +')'
           })(<Input readOnly />)
          }
        </FormItem>

        <FormItem label="转入方">
          {
            getFieldDecorator('toMhtname',{
              initialValue:row.toMhtname+'('+ row.accTypeTo +')'
            })(<Input readOnly />)
          }
        </FormItem>

        <FormItem label="交易时间">
          {
            getFieldDecorator('transDate',{
              initialValue:list.transDate
            })(<Input readOnly />)
          }
        </FormItem>

        <FormItem label="交易金额(元)">
          {
            getFieldDecorator('orderAmt',{
              initialValue:money100(list.orderAmt)
            })(<Input readOnly />)
          }
        </FormItem>

        <FormItem label="交易备注">
          {
            getFieldDecorator('memo',{
              initialValue:list.memo
            })(<Input readOnly />)
          }
        </FormItem>

        <FormItem label="最新状态">
          {
            getFieldDecorator('tradeStatus',{
              initialValue:''
            })(
                <div>
                  {
                    list.tradeStatus==='00'?<Tag color="#87d068">成功</Tag>:'01'===list.tradeStatus?<Tag color="#f50">失败</Tag>:'02'===list.tradeStatus?<Tag color="orange">处理中</Tag>:<Tag>{list.tradeStatus}</Tag>
                  }
                  {
                    list.tradeStatus=='00'&& row.accTypeTo.indexOf('cradId')>=0?
                      <Popconfirm onConfirm={this.handleUpdateForDealRedoWithStatus} title={`最终状态成功,是否解冻账户 ${row.fromMhtname}?`}>
                        <Button type="primary" style={{float:'right'}} htmlType="submit">解冻账户</Button>
                      </Popconfirm>:
                    list.tradeStatus=='00'?
                      <Popconfirm onConfirm={this.handleUpdateForDealRedoWithStatus} title={`确定解冻并补做业务（ ${row.fromMhtname}）?`}>
                        <Button type="primary" style={{float:'right'}} htmlType="submit">解冻并补做业务</Button>
                      </Popconfirm>:
                    list.tradeStatus=='01'?
                      <Popconfirm onConfirm={this.handleUpdateForDealRedoWithStatus} title={`最终状态失败,是否解冻账户 (${row.fromMhtname})`}>
                        <Button type="primary" style={{float:'right'}} htmlType="submit">解冻账户</Button>
                      </Popconfirm>
                    :''
                  }
                </div>
            )
          }
        </FormItem>

        {
          '01'===list.tradeStatus?
            <FormItem label="失败原因">
              {
                getFieldDecorator('tradeMsg',{
                  initialValue:list.tradeMsg
                })(<Input readOnly />)
              }
            </FormItem>:''
        }

      </Form>
    )
  }
}

const SlloantransferdetailsListForm = Form.create()(SlloantransferdetailsList)
export default SlloantransferdetailsListForm;
