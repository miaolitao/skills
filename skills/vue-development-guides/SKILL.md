---
name: vue-development-guides
description: 使用 Vue.js 开发应用程序的最佳实践和技巧集合。在开发、重构或审查 Vue.js 或 Nuxt 项目时必须应用此技能。
license: MIT
metadata:
    author: SerKo <https://github.com/serkodev>
    version: "0.1"
compatibility: 需要 Vue 3(或更高版本)或 Nuxt 3(或更高版本)项目
---

# Vue.js 开发指南

## 任务清单

- [ ] 遵循核心原则
- [ ] 遵循默认设置,除非有充分的理由不这样做
- [ ] 遵循响应式最佳实践
- [ ] 遵循组件最佳实践
  - [ ] 遵循 Vue SFC 最佳实践
  - [ ] 保持组件专注
    - [ ] 需要时将大型组件拆分为更小的组件
    - [ ] 如果适用,将状态/副作用移至组合式函数
  - [ ] 遵循数据流最佳实践

---

## 核心原则
- **保持状态可预测:** 单一数据源,派生其他所有内容。
- **使数据流显式化:** 大多数情况下使用 Props 向下,Events 向上。
- **偏好小而专注的组件:** 更易于测试、复用和维护。
- **避免不必要的重新渲染:** 明智地使用计算属性和侦听器。
- **可读性很重要:** 编写清晰、自文档化的代码。

## 默认设置(除非用户另有说明)

- 优先使用 **Composition API** 而不是 Options API。

## 响应式

重要提示: 在创建或更新组件或组合式函数时,必须遵循 `references/reactivity-guide.md` 进行响应式状态管理。

## 组件

重要提示: 在使用 Vue SFC 时,必须遵循 `references/sfc-guide.md` 的最佳实践。

- 默认优先使用 Vue 单文件组件(SFC),使用 **`<script setup lang="ts">`**(TypeScript)。
- 在 Vue SFC 中,按以下顺序保持各个部分: `<script>` → `<template>` → `<style>`。

### 保持组件专注

当组件具有**多个明确职责**时拆分组件(例如数据编排 + UI,或多个独立的 UI 部分)。

- 优先使用**更小的组件 + 组合式函数**而不是一个"超大组件"
- 将 **UI 部分**移至子组件(props 传入,events 传出)。
- 将**状态/副作用**移至组合式函数(`useXxx()`)。

注意: 默认情况下,此规则也适用于 Vue / Nuxt 项目中的入口组件(例如 App.vue)。

### 数据流

重要提示: 必须遵循 `references/data-flow-guide.md` 使用以下方式在组件之间传递和接收数据:
- Props
- Emits
- `v-model`
- provide/inject

要在应用程序之间共享数据,请遵循 `references/state-management-guide.md` 并考虑使用 Store 作为状态管理解决方案。
