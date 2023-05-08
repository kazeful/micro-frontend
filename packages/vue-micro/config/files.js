const isDev = process.env.NODE_ENV === 'development'

function umd(name, version) {
  return `https://unpkg.com/${name}${version ? `@${version}` : ''}/dist/${name}${isDev ? '' : '.min'}.js`
}

const files = {
  js: [
    umd('vue', '2.7.14'),
    umd('vue-router', '3.5.3'),
    umd('vuex', '3.6.2'),
    'https://unpkg.com/element-ui/lib/index.js',
  ],
  css: [
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
  ],
}

module.exports = files
