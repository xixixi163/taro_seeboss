export default {
  pages: [
    "pages/index/index",
    "pages/orders/orders",
    "pages/goods/index",
    "pages/user/user"
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
    borderStyle: "0 solid #d6e4ef",
    list: [
      {
        pagePath: "pages/index/index",
        text: "报表",
        iconPath: "./assets/images/chart.png",
        selectedIconPath: "./assets/images/chart-selected.png"
      },
      {
        pagePath: "pages/goods/index",
        text: "商品",
        iconPath: "./assets/images/goods.png",
        selectedIconPath: "./assets/images/goods-selected.png"
      }
    ]
  }
};
