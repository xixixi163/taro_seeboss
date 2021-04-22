export default {
  pages: ["pages/index/index", "pages/orders/orders"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    color: "#333",
    selectedColor: "blue",
    backgroundColor: "#f5f5f5",
    borderStyle: "black",
    position: "bottom",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "static/tab/shouyea.png",
        selectedIconPath: "static/tab/shouyeb.png"
      },
      {
        pagePath: "pages/orders/orders",
        text: "订单",
        iconPath: "static/tab/dingdana.png",
        selectedIconPath: "static/tab/dingdanb.png"
      }
    ]
  }
};
