import dva from 'dva';
import {browserHistory} from 'dva/router';
import {message} from 'antd';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
  // history: browserHistory,
  onError(e) {
    if (e.message === 'unauthorized') {
      message.info('请重新登录', 5);
    } else {
      message.error(e.message, 5);
    }
  }
});

// 2. Plugins
app.use(createLoading());

app.model(require('./models/app'));
app.model(require('./models/dashboard'));
app.model(require('./models/users'));
app.model(require('./models/sl/slmanager'));
app.model(require('./models/sl/queryAllSlLoanBalance'));
app.model(require('./models/sl/slLoanSearch'));
app.model(require('./models/sl/sllivelistmanager'));
app.model(require('./models/sl/slrepayment'));
app.model(require('./models/sl/sldelayapply'));
app.model(require('./models/sl/paltformcheck'));
app.model(require('./models/sl/slcatchdata'));
app.model(require('./models/sl/SupplyChainLoan'));
app.model(require('./models/sl/DetermineAmount'));
app.model(require('./models/sl/RepaymentRecord'));
app.model(require('./models/sl/slschedule'));
app.model(require('./models/sl/slloanrepayment'));
app.model(require('./models/sl/adjustedinterest'));
app.model(require('./models/sl/supplyChainStatement'));
app.model(require('./models/sl/slloantransfertasklist'));
app.model(require('./models/sl/slloantransferdetails'));
app.model(require('./models/sl/balanceDaily'));
app.model(require('./models/sl/contractreviewMonitor'));
app.model(require('./models/sl/contractRenewAudit'));
app.model(require('./models/sl/contractReviewAuditTwo'));
app.model(require('./models/sl/sldelayexamine'));
app.model(require('./models/sl/slplatform'))
app.model(require('./models/df/t+1'))
app.model(require('./models/df/t1loanfirsttrial_szqh'))

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
