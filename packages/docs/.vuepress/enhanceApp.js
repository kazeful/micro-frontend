import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import directives from 'vue-common/src/directives'

export default async ({ Vue }) => {
  Vue.use(ElementUI).use(directives)
}
