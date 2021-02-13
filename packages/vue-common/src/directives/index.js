// directive https://v2.cn.vuejs.org/v2/guide/custom-directive.html

// 在钩子之间共享数据 el.setAttribute('data-src', val) <===> val = el.dataset.src
import spring from './spring'
import waves from './waves'

const directives = {
  spring,
  waves,
}

export default {
  install(Vue) {
    Object.entries(directives).forEach(([key, value]) => {
      Vue.directive(key, value)
    })
  },
}
