// directive https://v2.cn.vuejs.org/v2/guide/custom-directive.html

// 在钩子之间共享数据 el.setAttribute('data-src', val) <===> val = el.dataset.src
import * as NaiveDirectives from 'naive-directives'

export default {
  install(Vue) {
    Object.entries(NaiveDirectives).forEach(([key, value]) => {
      Vue.directive(key, value)
    })
  },
}
