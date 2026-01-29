---
name: vue-pinia-best-practices
description: "Pinia 存储、状态管理模式、存储设置以及存储的响应性。"
version: 1.0.0
license: MIT
author: github.com/vuejs-ai
---

Pinia 最佳实践、常见陷阱和状态管理模式。

### 存储设置
- 启动时出现"getActivePinia was called"错误 → 参见 [pinia-no-active-pinia-error](reference/pinia-no-active-pinia-error.md)
- Setup 存储在 DevTools 或 SSR 中缺少状态 → 参见 [pinia-setup-store-return-all-state](reference/pinia-setup-store-return-all-state.md)

### 响应式
- 存储解构导致 UI 停止响应式更新 → 参见 [pinia-store-destructuring-breaks-reactivity](reference/pinia-store-destructuring-breaks-reactivity.md)
- 存储方法在模板调用中丢失上下文 → 参见 [store-method-binding-parentheses](reference/store-method-binding-parentheses.md)

### 状态模式
- 刷新时过滤器重置或无法共享 → 参见 [state-url-for-ephemeral-filters](reference/state-url-for-ephemeral-filters.md)
- 构建生产环境应用时没有 DevTools 或约定 → 参见 [state-use-pinia-for-large-apps](reference/state-use-pinia-for-large-apps.md)
