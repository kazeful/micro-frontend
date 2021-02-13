import NTable from './NTable'

const components = {
  NTable,
}

export default {
  install(Vue) {
    Object.values(components).forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
