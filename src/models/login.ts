import type { Reducer } from 'redux';
import { login } from "../services/login"
import Taro from "@tarojs/taro";

export type LoginStateType = {
  status?: 'error' | 'ok' | undefined;
  tipMsg?: string;
}

type LoginModelType = {
  namespace: string;
  state: LoginStateType;
  effects: {},
  reducer: {
    changeLoginStatus: Reducer<LoginStateType>;
  }
}
const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {
    status: undefined,
    tipMsg: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        yield call(login, payload);        
      } catch (err) {        
        Taro.showModal({content: err})        
        yield put({ type: 'changeLoginStatus', payload: { status: 'error', tipMsg: err } })
        return
      }
      yield put({ type: 'changeLoginStatus',payload:{status:'ok' }})
      Taro.switchTab({ url: '/pages/goods/index' })      
    }
  },
  reducer: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        tipMsg:payload.tipMsg,
      };
    }
  }
}
export default LoginModel;