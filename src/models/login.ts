import type { Reducer } from 'redux';
import { login } from "../services/login"
import Taro, { setStorage, setStorageSync } from "@tarojs/taro";

export type LoginStateType = {
  status?: 'error' | 'ok' | undefined;
  tipMsg?: string;
}

type LoginModelType = {
  namespace: string;
  state: LoginStateType;
  effects: {
  },
  reducers: {
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
        const res = yield call(login, payload);
        Taro.setStorageSync("token", res.token);
        
      } catch (err) {                
        yield put({ type: 'changeLoginStatus', payload: { status: 'error', tipMsg: err } })
        return
      }
      yield put({ type: 'changeLoginStatus',payload:{status:'ok' }})
      Taro.switchTab({ url: '/pages/goods/index' })      
    }
  },
  reducers: {
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