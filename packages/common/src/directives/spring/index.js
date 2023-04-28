import './spring.css'

export default {
  inserted: (el, binding) => {
    const eventType = binding.modifiers.dblclick ? 'dblclick' : 'click'
    el.addEventListener(eventType, handler)
    function handler() {
      if (el.__springTimer__)
        return
      el.classList.add('scale-down-center')
      el.__springTimer__ = setTimeout(() => {
        const className = Array.prototype.at.call(el.classList, -1)
        el.classList.remove(className)
        el.__springTimer__ = null
      }, 400)
    }
  },
}
