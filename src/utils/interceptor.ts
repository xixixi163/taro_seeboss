import Taro from "@tarojs/taro"
import { pageToLogin } from "./utils"

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

const customInterceptor = (chain) => {
  const requestParams = chain.requestParams;
  return chain.proceed(requestParams).then(res => {
    if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      Taro.setStorageSync("Authorization", "");
      pageToLogin();
      return Promise.reject(codeMessage[res.statusCode]);
    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      Taro.setStorageSync("Authorization", "");
      pageToLogin();
      return Promise.reject(codeMessage[res.statusCode]);
    } else if (res && res.statusCode && res.statusCode !== 200) {
      const errorText = codeMessage[res.statusCode] || res.statusText;
      return Promise.reject(errorText);
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      return res;
    }
  })
}
// Taro 内置拦截器
// logInterceptor -用于打印请求的相关信息
// timeoutInterceptor -在请求超时时抛出错误
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];
export default interceptors;