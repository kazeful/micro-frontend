const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

const devServer = require('./config/devServer')
const files = require('./config/files')
const externals = require('./config/externals')
const mfConfig = require('./config/mfConfig')

module.exports = defineConfig({
  publicPath: 'auto',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer,
  chainWebpack(config) {
    // html-webpack-plugin
    config.plugin('html').tap((args) => {
      args[0].files = files
      return args
    })
    // To fix the vue-base issue: caught (in promise) ScriptExternalLoadError: Loading script failed.
    config.optimization.delete('splitChunks')
    // This will allow HMR to take effect again, but vue-base will have the above problem again.
    // config.optimization.runtimeChunk('single')
    // To use HMR, you can use it, or comment the ModuleFederationPlugin exposes option.
    // And then restore it when you pack it.
  },
  configureWebpack() {
    return {
      externals,
      plugins: [new ModuleFederationPlugin(mfConfig)],
    }
  },
})
