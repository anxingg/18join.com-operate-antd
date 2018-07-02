import React, { PropTypes } from 'react'
import { Table, Button, Icon } from 'antd'
import AppModal from './cookieModal'
import styles from './slmanager.less'
import { parse } from 'qs'

function list ({
  loading,
  dataSource,
  pagination,
  catchData,
  saveCookie,
}) {
  const columns = [
    {
      title: '商户名',
      dataIndex: 'mhtname',
      key: 'mhtname',
    }, {
      title: '平台登录名',
      dataIndex: 'platformUName',
      key: 'platformUName',
      render:function(val,row){
        if(row.platformName==='ThirdSeller_GOME'&&/^GO-*/.test(val)){
          row.homeUrl='http://b2bi.gome.com.cn/mainLogon.hlt';
        }
        return val;
      }
    }, {
      title: '商户电话',
      dataIndex: 'mobile',
      key: 'mobile'
    }, {
      title: '开通平台',
      dataIndex: 'platformCnname',
      key: 'platformCnname'
    }, {
      title: '平台状态',
      dataIndex: 'enableFlag',
      key: 'enableFlag',
      render:function(val,row){
        if(val==='disabled'){
          return '已暂停';
        }else if(val==='paused'){
          return '申请暂停';
        }else if(val==='enabled'){
          return '正常抓取';
        }else if(val==='inited'){
          return '初始';
        }
      }
    }, {
      title: '抓取时间',
      dataIndex: 'rowUpdateTime',
      key: 'rowUpdateTime'
    }, {
      title: '账号状态',
      dataIndex: 'loginSuccessFlag',
      key: 'loginSuccessFlag',
      render:function(value){
        if (0 === value) {
          return '异常';
        } else if (1 === value) {
          return '正常';
        }else if(''==value){
          return '-';
        }
      }
    }, {
      title: '公司名状态',
      dataIndex: 'supplyInfoCorrectFlag',
      key: 'supplyInfoCorrectFlag',
      render:function(value){
        if(-1 == value){
          return '不支持';
        }else if (0 === value) {
          return '异常';
        } else if (1 === value) {
          return '正常';
        }else if(2 === value){
          return '无权限'
        }else if(3 === value){
          return '无关联设置金融户'
        }else if(4 === value){
          return '手动关闭校验'
        }else if(''==value){
          return '-';
        }
      }
    }, {
      title: '收款账户状态',
      dataIndex: 'settleAccountCorrectFlag',
      key: 'settleAccountCorrectFlag',
      render:function(value){
        if(-1 == value){
          return '不支持';
        }else if (0 === value) {
          return '异常';
        } else if (1 === value) {
          return '正常';
        }else if(2 === value){
          return '无权限'
        }else if(3 === value){
          return '无关联设置金融户'
        }else if(4 === value){
          return '手动关闭校验'
        }else if(''==value){
          return '-';
        }
      }
    }, {
      title: '抓取数据状态',
      dataIndex: 'getDataSuccessFlag',
      key: 'getDataSuccessFlag',
      render:function(value,row){
        if (0 === value) {
          return <span className={styles.colorRed}>异常</span>
        } else if (1 === value) {
          return '正常';
        }else if(''==value){
          return '-';
        }
      }
    }, {
      title: '监控信息',
      dataIndex: 'memo',
      key: 'memo',
      render:function(value,row){
        var disPlay = '';
        try {
          var data = jQuery.parseJSON(value);
          if (data.exceptionScreen) {
            disPlay = '<a class="fancybox" target="_blank" href="data:image/jpeg;base64,' + data.exceptionScreen + '" ><img style="width:125px;cursor: pointer;" src="data:image/jpeg;base64,' + data.exceptionScreen + '" alt="' + data.exception + '"></a>';
          } else {
            disPlay = value;
          }
        } catch (e) {

        }
        return disPlay;
      }
    }, {
      title: '操作',
      key: '',
      width: 100,
      render:function(value,row){
        return <div>
                  <Button type="danger" icon="pay-circle" className={styles.operateBtn} onClick={()=>catchData(row.idOfPlatformUser)}> 重 新 抓 取 </Button>
                  <AppModal idOfPlatformUser={row.idOfPlatformUser} onOk={saveCookie} />
                  <span><Icon type="setting" /><a href={"/sys/jsonSchemaEditorList.html?idOfPlatformUser="+row.idOfPlatformUser}>配置参数</a></span>
              </div>
      }
    }
  ]

  return (
    <div>
      <Table
        className={styles.table}
        bordered
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        rowKey={record => record.id}
      />
    </div>
  )
}

list.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  pagination: PropTypes.any
}

export default list
