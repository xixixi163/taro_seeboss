const getBaseUrl = (url: string) => {
  let BASE_URL = "";
  if (process.env.NODE_ENV === "development") {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    if (url.includes("/login")) {
      BASE_URL = "http://124.70.94.24";
    } else {
      // BASE_URL = "http://124.70.94.24/online/erp";
      return "http://localhost:3721/api";
    }

    // if (url.includes("/online/")) {
    //   BASE_URL = "http://124.70.94.24";
    // } else if (url.includes("/iatadatabase/")) {
    //   BASE_URL = "http://124.70.94.24";
    // } else {
    //   BASE_URL = "http://124.70.94.24";
    // }
  } else {
    // 生产环境
    if (url.includes("/api/")) {
      BASE_URL = "";
    } else if (url.includes("/iatadatabase/")) {
      BASE_URL = "";
    }
  }
  return BASE_URL;
};

export default getBaseUrl;
