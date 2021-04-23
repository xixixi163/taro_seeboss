import Taro from "@tarojs/taro";
/**
 * @description 获取当前页url
 */
export const currentPages = () => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  return url;
};

export const pageToLogin = () => {
  let path = currentPages();
  if (!path.includes("login")) {
    Taro.navigateTo({
      url: "/pages/login/login"
    });
  }
};

/**
 * @description 生成时间戳
 */
export function getTimestamp() {
  return new Date().getTime() + "";
}
