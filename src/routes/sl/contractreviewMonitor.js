/**
 * Created by fcb on 2017/8/11.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import {Switch} from 'antd';
import FinancingList from '../../components/contractreviewMonitor/financingList'
import ContractList from '../../components/contractreviewMonitor/contractList'

class ContractreviewMonitor extends React.Component {
  state = {
    isFinancing:false
  }
  isFinancingList = (e) =>{
    this.setState({
      isFinancing:e
    })
  }

  render(){
    const {financingList,contractList,loading} = this.props.contractreviewMonitor;
    
    const FinancingListProps = {
      isFinancing:this.state.isFinancing?'none':'block',
      financingList:financingList,
      loading:loading
    }
    const ContractListProps = {
      isFinancing:this.state.isFinancing?'block':'none',
      contractList:contractList,
      loading:loading
    }

    return (
      <div className="content-inner">
        <Switch style={{marginBottom:10}} onChange={e=>this.isFinancingList(e)} checkedChildren="即将到期合同" unCheckedChildren="即将到期融资款" />
        <FinancingList {...FinancingListProps} />
        <ContractList {...ContractListProps} />
      </div>
    )
  }
}

ContractreviewMonitor.PropTypes = {
  financingList:PropTypes.array,
  contractList:PropTypes.array
}

function mapStateToProps({contractreviewMonitor}){
  return {contractreviewMonitor}
}

export default connect(mapStateToProps)(ContractreviewMonitor);
