import { shallowRef } from 'vue'

// 管理元素显示/隐藏状态的组合式函数
export function useHidden(initial = false) {
  // 隐藏状态
  const hidden = shallowRef(initial)

  // 显示元素
  function show() {
    hidden.value = false
  }

  // 隐藏元素
  function hide() {
    hidden.value = true
  }

  // 切换显示/隐藏状态
  function toggle() {
    hidden.value = !hidden.value
  }

  return {
    hidden,
    show,
    hide,
    toggle,
  }
}
