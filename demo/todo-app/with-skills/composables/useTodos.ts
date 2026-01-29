import { computed, ref, shallowRef, watch } from 'vue'
import type { Filter, Todo } from '../types/todo'

// 本地存储的键名
const storageKey = 'todo-atlas-v1'

// 生成唯一ID
function createId(): string {
  // 优先使用浏览器的 crypto.randomUUID API
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  // 降级方案:使用时间戳和随机数组合
  return `todo-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

// 从本地存储加载待办事项列表
function loadTodos(): Todo[] {
  // 检查是否支持 localStorage
  if (typeof localStorage === 'undefined') return []
  const raw = localStorage.getItem(storageKey)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (item): item is Record<string, unknown> =>
          Boolean(item) && typeof item === 'object',
      )
      .map((item) => {
        const title = typeof item.title === 'string' ? item.title.trim() : ''
        return {
          id: typeof item.id === 'string' ? item.id : createId(),
          title,
          completed: Boolean(item.completed),
          createdAt:
            typeof item.createdAt === 'number' ? item.createdAt : Date.now(),
        }
      })
      .filter((item) => item.title.length > 0)
  } catch {
    // 解析失败时返回空数组
    return []
  }
}

// 将待办事项列表保存到本地存储
function saveTodos(value: Todo[]) {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(storageKey, JSON.stringify(value))
  } catch {
    // 静默处理存储错误
    return
  }
}

// 待办事项管理组合式函数
export function useTodos() {
  // 待办事项列表
  const todos = ref<Todo[]>(loadTodos())
  // 当前筛选条件
  const filter = shallowRef<Filter>('all')

  // 计算属性:待办事项总数
  const totalCount = computed(() => todos.value.length)
  // 计算属性:未完成事项数量
  const remainingCount = computed(
    () => todos.value.filter((todo) => !todo.completed).length,
  )
  // 计算属性:已完成事项数量
  const completedCount = computed(
    () => totalCount.value - remainingCount.value,
  )
  // 计算属性:完成百分比
  const completionPercent = computed(() => {
    if (totalCount.value === 0) return 0
    return Math.round((completedCount.value / totalCount.value) * 100)
  })

  // 计算属性:根据筛选条件过滤后的待办事项
  const filteredTodos = computed(() => {
    if (filter.value === 'active') {
      return todos.value.filter((todo) => !todo.completed)
    }
    if (filter.value === 'completed') {
      return todos.value.filter((todo) => todo.completed)
    }
    return todos.value
  })

  // 添加新的待办事项
  function addTodo(title: string) {
    const trimmed = title.trim()
    if (!trimmed) return
    const newTodo: Todo = {
      id: createId(),
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
    }
    // 将新事项添加到列表开头
    todos.value = [newTodo, ...todos.value]
  }

  // 切换待办事项的完成状态
  function toggleTodo(id: string) {
    todos.value = todos.value.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    )
  }

  // 删除指定的待办事项
  function removeTodo(id: string) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  // 清除所有已完成的待办事项
  function clearCompleted() {
    todos.value = todos.value.filter((todo) => !todo.completed)
  }

  // 设置筛选条件
  function setFilter(next: Filter) {
    filter.value = next
  }

  // 监听待办事项变化,自动保存到本地存储
  watch(todos, (value) => saveTodos(value))

  return {
    filter,
    totalCount,
    remainingCount,
    completedCount,
    completionPercent,
    filteredTodos,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
    setFilter,
  }
}
