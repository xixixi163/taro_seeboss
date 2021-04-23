import { LoginStateType } from "./login";
export type Loading = {
  effects: Record<string, boolean | undefined>;
  models: {
    login?: boolean;
  };
};
export type ConnectState = {
  loading: Loading;
  login: LoginStateType;
};
