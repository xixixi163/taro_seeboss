import type { Reducer } from 'redux';
import {login} from "../services/login"
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
    *login({ payload},{call,put}) {
      const response = yield call(login, payload);
      console.log(response);
      if (response.userId) {
        yield put({
          type: 'changeLoginStatus',
          payload:{status:'ok'},
        })
      } else {
        console.log(response.message);
        
        yield put({
          type: 'changeLoginStatus',
          payload:{status:'error',tipMsg:response.message},
        })
      }
    }
  },
  reducer: {
    changeLoginStatus(state, { payload }) {
      console.log(payload);
      
      return {
        ...state,
        status: payload.status,
        tipMsg:payload.tipMsg,
      };
    }
  }
}
export default LoginModel;