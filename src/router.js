import React from 'react'
import {Router} from 'dva/router'
import App from './routes/app'

export default function ({history, app}) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          cb(null, {component: require('./routes/dashboard')});
        })
      },
      childRoutes: [
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/dashboard'));
            })
          }
        },
        {
          path: 'users',
          name: 'users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/users'));
            })
          }
        },
        {
          path: 'main/menu',
          name: 'main/menu',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/main'));
            })
          }
        },
        {
          path: 'ui/ico',
          name: 'ui/ico',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/ico'));
            })
          }
        },
        {
          path: 'ui/search',
          name: 'ui/search',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/search'));
            })
          }
        },
        {
          path: '/slmanager',    //抓取任务执行情况
          name: '/slmanager',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/sl/slmanager'));
            })
          }
        },
        {
          path:'queryAllSlLoanBalance',   //融资情况总览
          name:'queryAllSlLoanBalance',
          getComponent(nextState,cb){
            require.ensure([],require => {
              cb(null,require('./routes/sl/queryAllSlLoanBalance'));
            })
          }
        },
        {
          path:'slLoanSearch',    //供应链贷申请审核
          name:'slLoanSearch',
          getComponent(nextState,cb){
            require.ensure([],require => {
              cb(null,require('./routes/sl/slLoanSearch'));
            })
          }
        },
        {
          path:'sllivelistmanager',   //供应链贷款授信管理
          name:'sllivelistmanager',
          getComponent(nextState,cb){
            require.ensure([],require => {
              cb(null,require('./routes/sl/sllivelistmanager'));
            })
          }
        },
        {
          path:'/sllivelistmanager/slplatform',
          name:'/sllivelistmanager/slplatform',
          getComponent(nextState,cb){
            require.ensure([],require => {
              cb(null,require('./routes/sl/slplatform'));
            })
          }
        },
        {
          path:'slrepayment',   //手动还款
          name:'slrepayment',
          getComponent(nextState,cb){
            require.ensure([],require => {
              cb(null,require('./routes/sl/slrepayment'));
            })
          }
        },
        {
          path:'sldelayapply',  //供应链展期审核
          name:'sldelayapply',
          getComponent(nextState,cb){
            require.ensure([],require =>{
              cb(null,require('./routes/sl/sldelayapply'));
            })
          }
        },
        {
          path:'paltformcheck',  //供应链电商平台用户管理
          name:'paltformcheck',
          getComponent(nextState,cb){
            require.ensure([],require =>{
              cb(null,require('./routes/sl/paltformcheck'));
            })
          }
        },
        {
          path:'slcatchdata',   //供应链电商平台抓取数据
          name:'slcatchdata',
          getComponent(nextState,cb){
            require.ensure([],require =>{
              cb(null,require('./routes/sl/slcatchdata'));
            })
          }
        },
        {
          path:'SupplyChainLoan',   //融资补录
          name:'SupplyChainLoan',
          getComponent(nextState,cb){
            require.ensure([],require =>{
              cb(null,require('./routes/sl/SupplyChainLoan'));
            })
          }
        },
        {
          path:'SupplyChainLoan/DetermineAmount',   //确认放款
          name:'SupplyChainLoan/DetermineAmount',
          getComponent(nextState,cb){
            require.ensure([],require =>{
              cb(null,require('./routes/sl/DetermineAmount'));
            })
          }
        },
        {
          path:'RepaymentRecord',   //还款补录
          name:'RepaymentRecord',
          getComponent(nextState,cb){
            require.ensure([],require =>{
              cb(null,require('./routes/sl/RepaymentRecord'));
            })
          }
        },
        {
          path:'RepaymentRecord/slschedule',   //还款明细
          name:'RepaymentRecord/slschedule',
          getComponent(nextState,cb){
            require.ensure([],require =>{
              cb(null,require('./routes/sl/slschedule'));
            })
          }
        },
        {
          path:'RepaymentRecord/slloanrepayment', //确认还款
          name:'RepaymentRecord/slloanrepayment',
          getComponent(nextState,cb){
            require.ensure([],require=>{
              cb(null,require('./routes/sl/slloanrepayment'));
            })
          }
        },
        {
          path:'adjustedinterest', //调息
          name:'adjustedinterest',
          getComponent(nextState,cb){
            require.ensure([],require=>{
              cb(null,require('./routes/sl/adjustedinterest'));
            })
          }
        },
        {
          path:'supplyChainStatement', //财务对账
          name:'supplyChainStatement',
          getComponent(nextState,cb){
            require.ensure([],require=>{
              cb(null,require('./routes/sl/supplyChainStatement'));
            })
          }
        },
        {
          path:'slloantransfertasklist',  //转账待处理任务
          name:'slloantransfertasklist',
          getComponent(nextState,cb){
            require.ensure([],require=>{
              cb(null,require('./routes/sl/slloantransfertasklist'));
            })
          }
        },
        {
          path: 'slloantransfertasklist/slloantransferdetails',   //转账待处理任务详情
          name: 'slloantransfertasklist/slloantransferdetails',
          getComponent(nextState, cb){
            require.ensure([], require=> {
              cb(null, require('./routes/sl/slloantransferdetails'));
            })
          }
        },
        {
          path:'balanceDaily',  //融资余额日报
          name:'balanceDaily',
          getComponent(nextState,cb){
            require.ensure([],require=>{
              cb(null, require('./routes/sl/balanceDaily'))
            })
          }
        },
        {
          path:'contractreviewMonitor', //风控信息监控
          name:'contractreviewMonitor',
          getComponent(nextState,cb){
            require.ensure([],require=>{
              cb(null,require('./routes/sl/contractreviewMonitor'))
            })
          }
        },
        {
          path:'contractRenewAudit',  //合同续签审核
          name:'contractRenewAudit',
          getComponent(nextState,cb){
            require.ensure([],require=>{
              cb(null,require('./routes/sl/contractRenewAudit'))
            })
          }
        },
        {
          path:'contractReviewAuditTwo',  //保理合同审核
          name:'contractReviewAuditTwo',
          getComponent(nextState,cb){
            require.ensure([],require=>{
              cb(null,require('./routes/sl/contractReviewAuditTwo'))
            })
          }
        },
        {
          path:'sldelayapply/sldelayexamine',
          name:'sldelayapply/sldelayexamine',
          getComponent(nextState,cb){
            require.ensure([],require=>{
              cb(null,require('./routes/sl/sldelayexamine'))
            })
          }
        },
        {
          path:'admin/t+1',  //垫付业务申请审核
          name:'t+1',
          getComponent(nextState,cb){
            require.ensure([],require=>{
              cb(null,require('./routes/df/t+1'))
            })
          }
        },{
          path:'t1loanfirsttrial_szqh',  //垫付业务放款初始 - 深圳前海
          name:'t1loanfirsttrial_szqh',
          getComponent(nextState,cb){
            require.ensure([],require=>{
              cb(null,require('./routes/df/t1loanfirsttrial_szqh'))
            })
          }
        },
        {
          path: '*',
          name: 'error',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error'));
            })
          }
        }
      ]
    }
  ]

  return <Router history={history} routes={routes} />
}
