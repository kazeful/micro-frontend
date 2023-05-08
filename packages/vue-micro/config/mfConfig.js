module.exports = {
  name: 'micro',
  filename: 'mf.js',
  remotes: {
    '@common': 'common@/COMMON_ASSETS/mf.js',
  },
  // Configuring this option will make HMR not work
  exposes: {
    './App.vue': './src/App.vue',
  },
  shared: {
    vue: { requiredVersion: '^2.7.0', singleton: true },
  },
}
