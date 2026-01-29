# 响应式指南

## 任务清单

- [ ] 正确声明响应式状态
- [ ] 避免直接从 `reactive()` 解构
- [ ] 如有需要,正确监听 `reactive` 状态
- [ ] 遵循 `computed()` 最佳实践
- [ ] 清理监听器的异步副作用

---

## 在 Vue.js 中正确声明响应式状态

### 基本类型值(string、number、boolean、null 等)

- 为了更好的性能,始终使用 `shallowRef()` 而不是 `ref()`。

### 对象 / 数组 / Map / Set

- `ref()`:
  - 当你经常**替换整个值**(`state.value = newObj`)并且仍然想要嵌套字段的深度响应式时使用。
- `reactive()`:
  - 当你主要**修改属性**(`state.count++`、`state.nested.x = ...`)并且完全替换不常见时使用。
- `shallowRef()`:
  - 用于**不透明/非响应式对象**(类实例、外部库、非常大的嵌套数据)。
  - 只在你替换 `state.value` 时触发更新(没有深度跟踪)。
- `shallowReactive()`:
  - 当你只想要**顶层属性是响应式的**时使用;嵌套对象保持原始状态。

错误示例:对可替换状态使用 `reactive()`。([参考](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive))

```ts
let user = reactive({ id: 1, name: 'Tom' })

async function reload() {
  // ❌ 替换代理会破坏其他地方持有的引用
  user = reactive(await fetchUser())
}
```

正确示例:对可替换对象使用 `ref()`

```ts
const user = ref<{ id: number; name: string }>()

async function reload() {
  user.value = await fetchUser()
}
```

## 避免直接从 `reactive()` 解构

错误示例:解构会破坏基本类型的响应式。

```ts
const state = reactive({ count: 0 })
const { count } = state // ❌ 与响应式断开连接
```

### 正确监听 reactive

错误示例:将非 getter 值传入 `watch()`

```ts
const state = reactive({ count: 0 })

// ❌ watch 期望 getter、ref、reactive 对象或这些的数组
watch(state.count, () => { /* ... */ })
```

正确示例:使用 `toRefs()` 保持响应式,并对 `watch()` 使用 getter

```ts
const state = reactive({ count: 0 })
const { count } = toRefs(state) // ✅ count 是一个 ref

watch(() => state.count, () => { /* ... */ }) // ✅
```

## `computed()` 最佳实践

### 保持计算属性 getter 纯净(无副作用)

计算属性 getter 应该只派生一个值。不要进行修改、API 调用、存储写入或事件发射。
([参考](https://vuejs.org/guide/essentials/computed.html#best-practices))

错误示例:computed 内部有副作用

```ts
const count = ref(0)

const doubled = computed(() => {
  // ❌ 副作用
  if (count.value > 10) console.warn('Too big!')
  return count.value * 2
})
```

正确示例:纯净的 computed + `watch()` 处理副作用

```ts
const count = ref(0)
const doubled = computed(() => count.value * 2)

watch(count, (value) => {
  if (value > 10) console.warn('Too big!')
})
```

### 优先使用 computed 而不是"存储在 ref 中的派生状态"

如果一个值完全从其他状态派生,**存储真实数据源**并计算派生值。

```ts
const firstName = ref('John')
const lastName = ref('Doe')

// ❌ 派生状态存储并手动同步
const fullName = ref('John Doe')
watch([firstName, lastName], () => {
  fullName.value = `${firstName.value} ${lastName.value}`
})

// ✅ 单一数据源 + 派生值
const fullName = computed(() => `${firstName.value} ${lastName.value}`)
```

### Computed 与模板中的函数调用

* `computed()` 基于依赖进行缓存。
* 方法/函数在组件每次渲染时都会运行。

错误示例:模板方法中的高开销工作

```vue
<script setup lang="ts">
const items = ref<number[]>([])

function expensiveFilter(values: number[]) {
  // ❌ 假设这是高开销的
  return values.filter(x => x % 2 === 0).sort((a, b) => a - b)
}
</script>

<template>
  <div>{{ expensiveFilter(items) }}</div>
</template>
```

正确示例:对高开销派生数据使用 computed

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const items = ref<number[]>([])

const filtered = computed(() => {
  return items.value
    .filter(x => x % 2 === 0)
    .sort((a, b) => a - b)
})
</script>

<template>
  <div>{{ filtered }}</div>
</template>
```

## 清理监听器的异步副作用

当响应快速变化(搜索框、过滤器)时,取消之前的请求。

正确示例

```ts
const query = ref('')
const results = ref<string[]>([])

watch(query, async (q, _prev, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())

  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
    signal: controller.signal,
  })

  results.value = await res.json()
})
```
