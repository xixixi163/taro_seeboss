import getBaseUrl from "../config";
import interceptors from "./interceptor";
import Taro from "@tarojs/taro";
import { IResponse } from "../res-req";

interceptors.forEach(interceptorsItem => Taro.addInterceptor(interceptorsItem));

interface OptionType {
  url: string;
  data?: object | string;
  method?: any;
  header: object;
}

class httpRequest {
  baseOptions(params: any, method: any = "GET"): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      let { url, data } = params;
      const BASE_URL = getBaseUrl(url);
      let contentType = "application/json";
      contentType = params.contentType || contentType;
      const option: Taro.request.Option = {
        url: BASE_URL + url,
        data,
        method,
        header: {
          "content-type": contentType,
          // Authorization: Taro.getStorageSync("Authorization"),
          "WEB-TOKEN": Taro.getStorageSync("token")
        }
      };
      Taro.request(option)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }
  post(url, data?) {
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
