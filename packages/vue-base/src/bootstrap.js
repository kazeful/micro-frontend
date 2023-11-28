import Vue from 'vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import directives from '@common/directives'
import App from './App'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 }).use(directives)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
