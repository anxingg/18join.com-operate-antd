import {login, userInfo, logout,userMenu} from '../services/app'
import {parse} from 'qs'
import { routerRedux } from 'dva/router'
import RSAUtils from '../utils/RSA'


export default {
  namespace: 'app',
  state: {
    login: false,
    loading: false,
    user: {
      name: '未登录'
    },
    menus:[],
    currentMenu:{
      href:''
    },
    errorMsg:null,
    RSAKey:{},
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769
  },
  subscriptions: {
    setup ({dispatch}) {
      dispatch({type: 'queryUser'})
      window.onresize = function () {
        dispatch({type: 'changeNavbar'})
      }
    }
  },
  effects: {
    *login ({
      payload
    }, {call, put, select}) {
      yield put({type: 'showLoginButtonLoading'})
      const RSAKey = yield select(state => state.app.RSAKey);
      payload.loginType = 'factor';
      payload.password = RSAUtils.encryptedString(RSAKey, payload.password);
      const {data} = yield call(login, parse(payload))
      if (data.status==='OK'||data.message==='AlreadyOnLine') {
        const {data:menu}=yield call(userMenu,payload)
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: payload.username
            },
            menus:menu.message
          }})
        yield put(routerRedux.push('/dashboard'));
      } else {
          yield put({
            type: 'loginFail',
            payload: {
              errorMsg:data.message
            }
          })
      }
    },
    *queryUser ({
      payload
    }, {call, put}) {
      yield put({type: 'showLoading'})
      const {data} = yield call(userInfo, parse(payload))
      const RSAKey=RSAUtils.getKeyPair(data.exponent, '', data.modulus)
      yield put({
        type: 'initSuccess',
        payload: {
          ...RSAKey
        }
      })
      if (data.loginUser) {
        const {data:menu}=yield call(userMenu,payload)
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: data.loginUser.loginName
            },
            menus:menu.message
          }
        })
        yield put(routerRedux.push('/dashboard'));
      }
      yield put({type: 'hideLoading'})
    },
    *logout ({
      payload
    }, {call, put}) {
      const {data} = yield call(logout, parse(payload))
      if (data.status==='OK') {
        yield put({
          type: 'logoutSuccess'
        })
      }
    },
    *switchSider ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchSider'
      })
    },
    *changeTheme ({
      payload
    }, {put}) {
      yield put({
        type: 'handleChangeTheme'
      })
    },
    *changeNavbar ({
      payload
    }, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
    },
    *switchMenuPopver ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchMenuPopver'
      })
    },
    *switchSubMenu ({
      payload
    }, {put,select}) {
      const menus = yield select(state => state.app.menus);
      const selectedMenu=menus.filter(x =>x.id==payload.key)[0];
      yield put({
        type: 'handleSwitchSubMenu',
        payload:{
          ...selectedMenu
        }
      })
    }
  },
  reducers: {
    initSuccess (state, action) {
      return {
        ...state,
        RSAKey:action.payload,
      }
    },
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false
      }
    },
    loginFail (state,action) {
      return {
        ...state,
        ...action.payload,
        login: false,
        loginButtonLoading: false
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true
      }
    },
    showLoading (state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false
      }
    },
    handleSwitchSubMenu (state,action) {
      return {
        ...state,
        currentMenu: action.payload
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    }
  }
}
