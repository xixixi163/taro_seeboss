import requst from "../utils/request";

export type LoginParamsType = {
  t?: string;
  userName: string;
  password: string;
};
export function login(params: LoginParamsType) {
  return requst.post("/online/module-authorization/auth/login", params);
}
