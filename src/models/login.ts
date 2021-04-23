import type { Reducer } from 'redux';
import {login} from "../services/login"
export type LoginStateType = {
  status?: 'error' | 'ok' | undefined;
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
    status:undefined,
  },
  effects: {
    *login({ payload},{call,put}) {
      const response = yield call(login, payload);
      console.log(response);
      if (response) {
        yield put({
          type: 'changeLoginStatus',
          payload:{status:'ok'},
        })
      }
    }
  },
  reducer: {
    changeLoginStatus(state,{payload}) {
      return {
        ...state,
        status: payload.status,
      };
    }
  }
}
export default LoginModel;