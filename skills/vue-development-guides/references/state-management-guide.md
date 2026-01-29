# 状态管理指南(Store)

## 任务清单

- [ ] 如适用,选择合适的 store 方法
  - [ ] 遵循 store 使用的最佳实践

---

## 选择 store 方法

### 选项 1:Store 模式 composable(单例 composable)

* 适用于 Vue SPA 和**非 SSR** 应用
* 适合小型应用
* 无依赖

示例

```ts
// useMyStore.ts
import { ref, readonly } from 'vue'

let _state: ReturnType<typeof createState> | null = null

function createState() {
  const state = ref<Record<string, boolean>>({})

  async function load() {
    state.value = await fetchData()
  }

  return {
    state: readonly(state),
    load,
  }
}

export function useMyStore() {
  if (!_state) _state = createState()
  return _state
}
```

### 选项 2:VueUse [`createGlobalState`](https://vueuse.org/shared/createGlobalState/)

* 适用于 Vue SPA 和**非 SSR** 应用
* 适合小到中型应用
* 需要 VueUse

### 选项 3:[Pinia](https://pinia.vuejs.org/)

* **强烈推荐**用于 Nuxt 和 SSR 应用
* 当你需要 DevTools 支持、持久化插件或操作追踪时理想选择
* 适合大型应用
* 需要 Pinia
