---
name: create-adaptable-composable
description: 创建库级别的 Vue 组合式函数,接受可能是响应式的输入(MaybeRef / MaybeRefOrGetter),以便调用者可以传递普通值、ref 或 getter。在响应式效果(watch/watchEffect)内部使用 toValue()/toRef() 规范化输入,以保持行为可预测和响应式。当用户要求创建可适配或可复用的组合式函数时使用此技能。
license: MIT
metadata:
    author: SerKo <https://github.com/serkodev>
    version: "0.1"
compatibility: 需要 Vue 3(或更高版本)或 Nuxt 3(或更高版本)项目
---

# 创建可适配的组合式函数

可适配的组合式函数是可以接受响应式和非响应式输入的可复用函数。这允许开发者在各种上下文中使用组合式函数,而无需担心输入的响应性。

在 Vue.js 中设计可适配组合式函数的步骤:
1. 确认组合式函数的目的、API 设计以及预期的输入/输出
2. 识别应该是响应式的输入参数(MaybeRef / MaybeRefOrGetter)
3. 在响应式效果内部使用 `toValue()` 或 `toRef()` 来规范化输入
4. 使用 Vue 的响应式 API 实现组合式函数的核心逻辑

## 核心类型概念

### 类型工具

```ts
/**
 * 值或可写的 ref (value/ref/shallowRef/writable computed)
 */
export type MaybeRef<T = any> = T | Ref<T> | ShallowRef<T> | WritableComputedRef<T>;

/**
 * MaybeRef<T> + ComputedRef<T> + () => T
 */
export type MaybeRefOrGetter<T = any> = MaybeRef<T> | ComputedRef<T> | (() => T);
```

### 策略和规则

- 只读、兼容 computed 的输入: 使用 `MaybeRefOrGetter`
- 需要可写 / 双向输入: 使用 `MaybeRef`
- 参数可能是函数值(回调/谓词/比较器): 不要使用 `MaybeRefOrGetter`,否则可能会意外将其作为 getter 调用
- DOM/Element 目标: 如果需要 computed/派生目标,使用 `MaybeRefOrGetter`

当使用 `MaybeRefOrGetter` 或 `MaybeRef` 时: 
- 使用 `toRef()` 解析响应式值(例如 watcher 源)
- 使用 `toValue()` 解析非响应式值

### 示例

可适配的 `useDocumentTitle` 组合式函数: 只读 title 参数

```ts
import { watch, toRef } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export function useDocumentTitle(title: MaybeRefOrGetter<string>) {
  watch(toRef(title), (t) => {
    document.title = t
  }, { immediate: true })
}
```

可适配的 `useCounter` 组合式函数: 双向可写 count 参数

```ts
import { watch, toRef } from 'vue'
import type { MaybeRef } from 'vue'

function useCounter(count: MaybeRef<number>) {
  const countRef = toRef(count)
  function add() {
    countRef.value++
  }
  return { add }
}
```
