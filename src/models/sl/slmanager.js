import { intiplatUname, querylistnamemap, queryalltbsltaskrunresulttoday, catchData, cookieSave} from '../../services/sl/slmanager'
import moment from 'moment'
import { parse } from 'qs'

export default {
  namespace: 'slmanager',
  state: {
    list: [],
    loading: false,
    queryplatformUname:[],
    listnamemap:[],
    totalPages:'',
    statDate:'',
    merchantUserId:'',
    enableFlag:'',
    platformName:'',
    catchDataStatus:'',
    cookie:'',
    idOfPlatformUser:'',
    cookieSave:{}
  },
  effects: {
    *intiplatUname ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const {data} = yield call(intiplatUname , payload)
      yield put({
        type: 'querySuccess',
        payload: {
          queryplatformUname:data.message
        }
      })
    },
    *querylistnamemap({payload},{call,put}){
      yield put({ type: 'showLoading' })
      const {data} = yield call(querylistnamemap,payload)
      const mchName=data.message;
      yield put({
        type:'querySuccess',
        payload:{
          listnamemap:mchName
        }
      })
     },
    *queryalltbsltaskrunresulttoday({payload},{call,put}){
      yield put({ type: 'showLoading' })
      const {data} = yield call(queryalltbsltaskrunresulttoday,payload)
      yield put({
        type:'querySuccess',
        payload:{
          list:data.message.items
        }
      })
    },
    *catchData({payload},{call,put}){
      yield put({ type: 'showLoading' })
      const {data} = yield call(catchData,payload)
      yield put({
        type:'querySuccess',
        payload:{
          catchDataStatus:data.message
        }
      })
    },
    *cookieSave({payload},{call,put}){
      yield put({ type: 'showLoading' })
      const {data} = yield call(cookieSave,payload)
      console.log(payload);
      yield put({
        type:'querySuccess',
        cookieSave:payload.cookie
      })
    }
  },
  reducers: {
    showLoading (state) {
      return { ...state, loading: true }
    },
    querySuccess (state, action) {
      return { ...state, ...action.payload, loading: false }
    }
  },
  subscriptions: {

    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/slmanager') {
          let date = moment(new Date(),'YYYY-MM-DD').format('YYYY-MM-DD');

          dispatch({ type: 'intiplatUname'  })
          dispatch({ type: 'querylistnamemap', payload: '' })
          dispatch({
            type: 'queryalltbsltaskrunresulttoday',
            payload: {
              statDate:date,
              merchantUserId:'',
              enableFlag:'',
              platformName:''
            }
          })
        }
      })
    }
  }
}
