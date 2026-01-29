# 数据流指南

本指南对于在 Vue.js 应用中维护清晰且可预测的数据流**极其重要**。在组件之间传递和接收数据时,请遵循这些最佳实践。

## 任务清单

- [ ] 遵循 Props Down / Events Up 原则
- [ ] 使用 `defineProps` 时,遵循最佳实践
- [ ] 使用 `defineEmits` 时,遵循最佳实践
- [ ] 使用 `v-model` 时,遵循最佳实践
- [ ] 使用 provide/inject 来避免 props 钻取(超过 3 层时)

---

## 核心原则: Props Down / Events Up

Vue.js 中数据流的核心原则是 **Props Down / Events Up**(属性向下 / 事件向上),这是最易维护的默认方式。单向数据流具有良好的可扩展性。([参考文档](https://vuejs.org/guide/components/props.html#one-way-data-flow))

❌ **不好的做法**: 子组件直接修改父组件状态(紧耦合)

```ts
// ❌ 例如:跨组件修改或使用全局单例对象
parentState.count++
```

✅ **好的做法**: 显式约定

```vue
<!-- 父组件 -->
<Counter :count="count" @increment="count++" />
```

```vue
<!-- 子组件 -->
<script setup lang="ts">
defineProps<{ count: number }>()
defineEmits<{ (e: 'increment'): void }>()
</script>

<template>
  <button @click="$emit('increment')">{{ count }}</button>
</template>
```

---

## `defineProps` 最佳实践

* 将 props 视为你的**公共 API**: 小巧、稳定、类型良好
* 避免"上帝 prop"(一个 prop 配置所有内容)
* 永远不要修改 props(它们是只读的)

### 优先使用带默认值的 props 解构 (Vue 3.5+)

在 Vue 3.5+ 中,从 `defineProps()` 解构的值保持响应性,并且可以使用原生 JS 默认值。

```ts
const { size = 'md' } = defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()
```

---

## `defineEmits` 最佳实践

✅ **好的做法**: 优先使用元组语法定义事件载荷

```ts
const emit = defineEmits<{
  change: [id: number] // 命名元组语法
  update: [value: string]
}>()
```

## `v-model` 最佳实践

✅ **好的做法**: 优先使用 `defineModel()` 实现组件的 `v-model`

```vue
<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <input v-model="model" />
</template>
```

---

## Provide / Inject

使用 provide/inject 来避免 props 钻取(超过 3 层时)。

适用于共享上下文的场景:

* 表单(验证上下文)
* 主题 / 设计令牌
* 父子组件协调 API
