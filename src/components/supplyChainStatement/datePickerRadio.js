/**
 * Created by fcb on 2017/8/28.
 */
import React from 'react';
import {Radio,DatePicker} from 'antd';
import moment from 'moment';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
class datePickerRadio extends React.Component {
  state = {
    startDate:moment().format('YYYY-MM-DD'),
    endDate:moment().format('YYYY-MM-DD'),
    visible:'none'
  }

  GroupChange = (e) => {
    let date = moment();
    let startDate,endDate;

    if(e==='diy'){
      this.setState({
        visible:'inline-block'
      })
    }else{
      this.setState({
        visible:'none'
      })
      if(e=='yesterday'){
        startDate = date.subtract(1, 'd').format('YYYY-MM-DD');
        endDate = date.subtract(1, 'd').format('YYYY-MM-DD');
      }else if(e==='today'){
        startDate = date.format('YYYY-MM-DD');
        endDate = date.format('YYYY-MM-DD');
      }else if(e==='lastmonth'){
        startDate = date.subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
        endDate = date.endOf('month').format('YYYY-MM-DD');
      }else if(e==='month'){
        startDate = date.startOf('month').format("YYYY-MM-DD");
        endDate = date.endOf('month').format("YYYY-MM-DD");
      }else if(e==='year'){
        startDate = date.startOf('year').format("YYYY-MM-DD");
        endDate = date.endOf('year').format("YYYY-MM-DD");
      }

      this.setState({
        startDate:startDate,
        endDate:endDate
      });
      this.props.RadioGroupChange({startDate,endDate})
    }
  }

  RangePickerChange = (dates) =>{
    let startDate = dates[0].format('YYYY-MM-DD')
    let endDate = dates[1].format('YYYY-MM-DD')
    this.setState({
      startDate:startDate,
      endDate:endDate
    });
    this.props.RadioGroupChange({startDate,endDate})
  }
  render(){
    return (
      <span>
        <RadioGroup defaultValue="today" onChange={(e)=>this.GroupChange(e.target.value)}>
          <RadioButton value="yesterday">昨天</RadioButton>
          <RadioButton value="today">今天</RadioButton>
          <RadioButton value="lastmonth">上月</RadioButton>
          <RadioButton value="month">本月</RadioButton>
          <RadioButton value="year">今年</RadioButton>
          <RadioButton value="diy">自定义</RadioButton>
        </RadioGroup>
        <RangePicker onChange={this.RangePickerChange} ref="diyDate" style={{display:this.state.visible,marginLeft:10}} format="YYYY-MM-DD" />
      </span>
    )
  }
}
export default datePickerRadio
