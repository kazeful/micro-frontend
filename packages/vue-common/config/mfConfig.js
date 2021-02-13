module.exports = {
  name: 'common',
  filename: 'mf.js',
  exposes: {
    // 组件库 全部引入
    './components': './src/components',
    // 组件库 按需引入
    './components/NTable': './src/components/NTable',
    // 指令库 全部引入
    './directives': './src/directives',
    // 指令库 按需引入
    './directives/spring': './src/directives/spring',
    './directives/waves': './src/directives/waves',
    // pages
    './pages/401': './src/pages/error/401',
    './pages/404': './src/pages/error/404',
    './pages/500': './src/pages/error/500',
    // 工具库 按需引入
    './utils/http': './src/utils/http',
  },
  shared: {
    vue: { requiredVersion: '^2.7.0', singleton: true },
  },
}
