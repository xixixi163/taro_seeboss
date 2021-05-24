// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }]
  ],
  plugins: [
    ["import", {
        libraryName: "taro-ui",
        libraryDirectory: `lib/components`,
        customName: function (name) {
          let component = name[0].toLowerCase() + name.substr(1);
          component = component.replace(/at-/, '').replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
          return `taro-ui/lib/components/${component}`
        },
        customStyleName: function (name) {
          const component = name.replace(/at-/, '')
          if (component === 'tabs-pane') {
            return `taro-ui/dist/style/components/tabs.scss`
          } 
          if (component === 'list-item') {
            return `taro-ui/dist/style/components/list.scss`
          }
            return `taro-ui/dist/style/components/${component}.scss`
        }
      },"taro-ui"]
  ]
}
