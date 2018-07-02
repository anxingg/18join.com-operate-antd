module.exports = [
  {
    key: 'dashboard',
    name: '工作区',
    icon: 'laptop'
  },
  {
    key: 'users',
    name: '用户管理',
    icon: 'user'
  },
  {
    key: 'slmanager',
    name: '抓取任务执行情况',
    icon: 'user'
  },
  {
    key: 'slLoanSearch',
    name: '供应链贷申请审核',
    icon: 'user'
  },
  {
    key: 'queryAllSlLoanBalance',
    name: '融资情况总览',
    icon: 'user'
  },
  {
    key: 'sllivelistmanager',
    name: '供应链贷款授信管理',
    icon: 'user',
    child:[
      {
        key:'slplatform',
        name:'供应链贷电商信息',
        icon:'user'
      }
    ]
  },
  {
    key: 'slrepayment',
    name: '手动还款',
    icon: 'user'
  },
  {
    key:'sldelayapply',
    name:'供应链展期审核',
    icon:'user',
    child:[
      {
        key:'sldelayexamine',
        name:'展期审核详情',
        icon:'user'
      }
    ]
  },
  {
    key:'paltformcheck',
    name:'供应链电商平台用户管理',
    icon:'user'
  },
  {
    key:'slcatchdata',
    name:'供应链电商平台抓取数据',
    icon:'user'
  },
  {
    key:'SupplyChainLoan',
    name:'融资补录',
    icon:'user',
    child:[
      {
        key:'DetermineAmount',
        name:'确认放款',
        icon:'user'
      }
    ]
  },
  {
    key:'RepaymentRecord',
    name:'还款补录',
    icon:'user',
    child:[
      {
        key:'slschedule',
        name:'还款明细',
        icon:'user'
      },
      {
        key:'slloanrepayment',
        name:'确认还款',
        icon:'user'
      },
    ]
  },

  {
    key:'adjustedinterest',
    name:'调息',
    icon:'user'
  },
  {
    key:'supplyChainStatement',
    name:'财务对账',
    icon:'user'
  },
  {
    key:'slloantransfertasklist',
    name:'转账待处理任务',
    icon:'user',
    child:[
      {
        key:'slloantransferdetails',
        name:'转账待处理任务详情',
        icon:'user'
      }
    ]
  },
  {
    key:'contractreviewMonitor',
    name:'风控信息监控',
    icon:'user'
  },
  {
    key:'balanceDaily',
    name:'融资余额日报',
    icon:'user'
  },
  {
    key:'contractRenewAudit',
    name:'合同续签审核',
    icon:'user'
  },
  {
    key:'contractReviewAuditTwo',
    name:'保理合同审核',
    icon:'user'
  },
  {
    key:'admin/t+1',
    name:'垫付业务申请审核',
    icon:'user'
  },
  {
    key:'t1loanfirsttrial_szqh',
    name:'垫付业务放款初审(深圳前海)',
    icon:'user'
  },
  // {
  //   key:'sldelayapply/sldelayexamine',
  //   name:'展期审核详情',
  //   icon:'user'
  // },
  {
    key: 'ui',
    name: 'UI组件',
    icon: 'camera-o',
    clickable: false,
    child: [
      {
        key: 'ico',
        name: 'Ico 图标'
      },
      {
        key: 'search',
        name: 'Search 搜索'
      }
    ]
  },
  {
    key: 'main',
    name: '产品',
    child: [
      {
        key: 'user',
        name: '用户管理'
      },
      {
        key: 'menu',
        name: '业务'
      }
    ]
  }
]
