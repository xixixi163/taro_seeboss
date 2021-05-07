export default {
  pages: [
    "pages/login/login",
    "pages/form/index",
    "pages/index/index",
    "pages/orders/orders",
    "pages/goods/index",
    "pages/login/login",
    "pages/user/user",
    "pages/details/details"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    color: "#626567",
    selectedColor: "#2A8CE5",
    backgroundColor: "#FFFFFF",
    // borderStyle: "0 solid #d6e4ef",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "基础信息",
        iconPath: "./assets/images/base-info.png",
        selectedIconPath: "./assets/images/goods-selected.png"
      },
      {
        pagePath: "pages/goods/index",
        text: "报表",
        iconPath: "./assets/images/chart.png",
        selectedIconPath: "./assets/images/chart-selected.png"
      }
    ]
  }
};
