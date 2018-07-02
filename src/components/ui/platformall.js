/**
 * Created by fcb on 2017/4/13.
 */
import React from 'react'
import {Select} from 'antd'
const Option = Select.Option;

class PlatformAll extends React.Component {
  render(){
    const {queryplatformUname} = this.props

    return(
      <Select size="large" style={{ width: 205,marginLeft:20 }}  placeholder="全部" >
        {
          queryplatformUname.map(function(v,i){
            if(i==0){ return <Option key={0}  value="">全部</Option> }
            return <Option key={i+1}  value={v.platformName}>{v.platformCnname}</Option>
          })
        }
      </Select>
    )
  }
}

export default PlatformAll
