/**
 * Created by fcb on 2017/10/30.
 */
import React,{PropTypes} from 'react';
import {connect} from 'dva';
import {money100} from '../../utils/index';
import {Button} from 'antd'
import List from '../../components/t1loanfirsttrial_szqh/list'

class LoanFirstTrialSZQH extends React.Component {
  render(){
    const {dispatch} = this.props;
    const {list,loading,balance} = this.props.t1loanfirsttrial_szqh;

    const listprops = {
      list:list,
      loading:loading,
      creditApprove:function(e){
        dispatch({
          type:'t1loanfirsttrial_szqh/creditApprove',
          payload:e
        })
      },
      creditRefuse:function(e){
        dispatch({
          type:'t1loanfirsttrial_szqh/creditRefuse',
          payload:e
        })
      }
    }
    return (
      <div className="content-inner">
        <p style={{marginBottom:10,height:28}}>
          <b style={{textAlign:'right'}}>结算户余额：{money100(balance)}</b>
          <Button.Group style={{marginLeft:10,float:'right'}}>
            <Button type="primary">
              批量审核通过
            </Button>
            <Button type="primary">
              批量审核拒绝
            </Button>
          </Button.Group>
        </p>
        <List {...listprops} />
      </div>
    )
  }
}

LoanFirstTrialSZQH.PropTypes = {
  list:PropTypes.array
}

function mapStateToProps({t1loanfirsttrial_szqh}){
  return {t1loanfirsttrial_szqh}
}
export default connect(mapStateToProps)(LoanFirstTrialSZQH) ;
