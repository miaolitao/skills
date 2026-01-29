# Vue 单文件组件指南

## 任务清单

- [ ] 正确使用 `v-for` 和 `v-if`
- [ ] 遵循插槽最佳实践
- [ ] 正确访问 DOM / 组件引用
- [ ] 如有需要,正确处理透传属性(`$attrs`)
- [ ] 适当使用组件作用域样式

---

## `v-for` 最佳实践

### 始终提供稳定的 `:key`

* 优先使用基本类型键(`string | number`)。
* 避免使用对象作为键。

正确示例

```vue
<li v-for="item in items" :key="item.id">
  <input v-model="item.text" />
</li>
```

### 避免在同一元素上使用 `v-if` 和 `v-for`

这会导致意图不清晰和不必要的工作。
([参考](https://vuejs.org/guide/essentials/list.html#v-for-with-v-if))

**过滤项目**
错误示例

```vue
<li v-for="user in users" v-if="user.active" :key="user.id">
  {{ user.name }}
</li>
```

正确示例:在 computed 中过滤

```vue
<script setup lang="ts">
import { computed } from 'vue'

const activeUsers = computed(() => users.value.filter(u => u.active))
</script>

<template>
  <li v-for="user in activeUsers" :key="user.id">
    {{ user.name }}
  </li>
</template>
```

**条件显示/隐藏整个列表**
正确示例:将 `v-if` 移到容器元素或 `<template>` 上

```vue
<ul v-if="shouldShowUsers">
  <li v-for="user in users" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

## 插槽最佳实践

### 命名插槽的简写语法

错误示例:使用冗长语法
```vue
<MyComponent>
  <template v-slot:header> ... </template>
</MyComponent>
```

正确示例:使用简写语法
```vue
<MyComponent>
  <template #header> ... </template>
</MyComponent>
```

[参考](https://vuejs.org/guide/components/slots.html#named-slots)

## 访问 DOM / 组件引用

对于 Vue 3.5+:使用 `useTemplateRef()` 访问模板引用。

正确示例

```vue
<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'

const inputRef = useTemplateRef<HTMLInputElement>('input')

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

## 透传属性(`$attrs`)

透传属性让消费者可以默认将 `class`、`id`、`aria-*` 和监听器传递到组件的根元素上。

当你需要控制时:

* 禁用继承
* 将 `$attrs` 转发到真正的目标

正确示例:禁用继承 + 转发 `$attrs`

```vue
<script setup lang="ts">
// Vue 3.3+ 宏
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="wrapper">
    <BaseInput v-bind="$attrs" />
  </div>
</template>
```

## 优先使用组件作用域样式

* 对属于组件的样式使用 `<style scoped>`。
* 将**全局 CSS** 保存在专用文件中(例如 `src/assets/main.css`),用于重置、排版、令牌等。
* 谨慎使用 `:deep()`(仅用于边缘情况)。

错误示例:随机组件内的全局样式

```vue
<style>
/* ❌ 泄漏到任何地方 */
button { border-radius: 999px; }
</style>
```

正确示例:默认使用 scoped

```vue
<style scoped>
.button { border-radius: 999px; }
</style>
```

正确示例:全局 CSS 属于全局入口

```css
/* src/assets/main.css */
/* ✅ 重置、令牌、排版、应用级规则 */
:root { --radius: 999px; }
```
