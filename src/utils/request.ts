import getBaseUrl from "../config";
import interceptors from "./interceptor";
import Taro from "@tarojs/taro";

interceptors.forEach(interceptorsItem => Taro.addInterceptor(interceptorsItem));

type optionType = {
  url: string;
  data?: object | string;
  method?: any;
  header: object;
};

class httpRequest {
  baseOptions(params: any, method: any = "GET") {
    let { url, data } = params;
    const BASE_URL = getBaseUrl(url);
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option: optionType = {
      url: BASE_URL + url,
      data,
      method,
      header: {
        "content-type": contentType,
        Authorization: Taro.getStorageSync("Authorization")
      }
    };
    return Taro.request(option);
  }
  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }
  post(url, data) {
    let params = { url, data };
    return this.baseOptions(params, "POST");
  }
  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }
  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }
}
export default new httpRequest();
