module.exports = {
  name: 'common',
  filename: 'mf.js',
  // Configuring this option will make HMR not work
  exposes: {
    // 指令库 全部引入
    './directives': './src/directives',
  },
  shared: {
    vue: { requiredVersion: '^2.7.0', singleton: true },
  },
}
