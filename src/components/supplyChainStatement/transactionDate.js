/**
 * Created by fcb on 2017/8/10.
 */
import React from 'react';
import {Radio,DatePicker} from 'antd';
import moment from 'moment';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

class TransactionDate extends React.Component {
  state = {
    visible:'none',
    value:'',
    defaultValue:'',
    startDate:'',
    endDate:''
  }
  RadioGroupChange = (e) =>{
    let date = moment();
    let startDate,endDate;

    if(e.target.value=='yesterday'){
      startDate = date.subtract(1, 'd').format('YYYY-MM-DD');
      endDate = date.subtract(1, 'd').format('YYYY-MM-DD');
    }else if(e.target.value==='today'){
      startDate = date.format('YYYY-MM-DD');
      endDate = date.format('YYYY-MM-DD');
    }else if(e.target.value==='lastmonth'){
      startDate = date.subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
      endDate = date.endOf('month').format('YYYY-MM-DD');
    }else if(e.target.value==='month'){
      startDate = date.startOf('month').format("YYYY-MM-DD");
      endDate = date.endOf('month').format("YYYY-MM-DD");
    }else if(e.target.value==='year'){
      startDate = date.startOf('year').format("YYYY-MM-DD");
      endDate = date.endOf('year').format("YYYY-MM-DD");
    }else if(e.target.value=='diy'){
      this.setState({ visible:'inline-block' });
      console.log(this.refs.RangePicker.value)
      // if(values.RangePicker!=''){
      //   startDate = values.RangePicker[0].format('YYYY-MM-DD')
      //   endDate = values.RangePicker[1].format('YYYY-MM-DD')
      // }else{
      //   message.warning('请选择交易日期！')
      // }
    }
    e.target.value = {'startDate':startDate,'endDate':endDate}

    this.setState({
      visible:'none',
      value:e.target.value,
      defaultValue:e.target.value,
      startDate:startDate,
      endDate:endDate
    })
    // console.log(this)
    // this.props.changeRaido(e.target.value)
  }
  render(){
    const {changeRaido} = this.props;

    return (
       <div defaultValue={this.state.value} value={this.state.value}>
         <RadioGroup onChange={this.RadioGroupChange}>
           <RadioButton value="yesterday">昨天</RadioButton>
           <RadioButton value="today">今天</RadioButton>
           <RadioButton value="lastmonth">上月</RadioButton>
           <RadioButton value="month">本月</RadioButton>
           <RadioButton value="year">今年</RadioButton>
           <RadioButton value="diy">自定义</RadioButton>
         </RadioGroup>
         <RangePicker ref="RangePicker" style={{display:this.state.visible,marginLeft:10}} format="YYYY-MM-DD" />
       </div>
    )
  }
}

export default TransactionDate;
