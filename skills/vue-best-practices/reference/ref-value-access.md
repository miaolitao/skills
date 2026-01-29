---
title: 在 JavaScript 中访问 ref() 时始终使用 .value
impact: HIGH
impactDescription: 忘记 .value 会导致静默失败以及响应式状态更新中的错误
type: capability
tags: [vue3, reactivity, ref, composition-api]
---

# 在 JavaScript 中访问 ref() 时始终使用 .value

**影响: 高** - 忘记 `.value` 会导致静默失败,状态更新不会触发响应性,从而导致难以调试的问题。

在 Vue 3 的 Composition API 中使用 `ref()` 时,响应式值被包装在一个对象中,必须通过 `.value` 在 JavaScript 代码中访问。但是,在模板中,Vue 会自动解包 ref,因此不需要 `.value`。这种不一致性是错误的常见来源。

## 任务清单

- [ ] 在 `<script>` 或 `.js`/`.ts` 文件中读取或写入 ref 值时始终使用 `.value`
- [ ] 在 `<template>` 中永远不要使用 `.value` - Vue 会自动解包 ref
- [ ] 将 ref 传递给函数时,决定是传递 ref 对象还是 `.value`
- [ ] 使用 IDE/TypeScript 尽早捕获缺少 `.value` 的错误

**错误示例:**
```javascript
import { ref } from 'vue'

const count = ref(0)

// 这些不会按预期工作
count++           // 试图递增 ref 对象,而不是值
count = 5         // 重新赋值变量,失去响应性
console.log(count) // 输出 "[object Object]",而不是数字

const items = ref([1, 2, 3])
items.push(4)     // 错误: push is not a function
```

**正确示例:**
```javascript
import { ref } from 'vue'

const count = ref(0)

// 在 JavaScript 中始终使用 .value
count.value++           // 正确递增到 1
count.value = 5         // 正确设置值为 5
console.log(count.value) // 输出 "5"

const items = ref([1, 2, 3])
items.value.push(4)     // 正确将 4 添加到数组
```

```vue
<template>
  <!-- 在模板中,不需要 .value - Vue 会自动解包 -->
  <p>{{ count }}</p>
  <button @click="count++">递增</button>
</template>
```

## 参考资料
- [Vue.js 响应式基础 - ref()](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#ref)
