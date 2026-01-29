# vue-skills

Vue 3 开发的 AI 代理技能。

> 🚧 **早期实验 / 社区项目**
>
> 这个仓库是创建专门化 AI 代理技能以增强 Vue 3 开发的早期实验。技能源自真实世界的问题,但由于模型幻觉可能不完整——请提供反馈。如果有价值,我计划提议将此项目转移到 Vue 组织,以造福更广泛的社区。

## 安装

```bash
npx skills add vuejs-ai/skills
```

## 使用

为获得最可靠的结果,请在提示前加上 `use vue skill`:

```
Use vue skill, <你的提示>
```

这会明确触发技能并确保 AI 遵循文档化的模式。如果没有前缀,技能触发可能不一致,取决于你的提示与技能描述关键词的匹配程度。

## 可用技能

| 技能 | 何时使用 | 描述 |
|-------|-------------|-------------|
| **vue-best-practices** | Vue 3 + Composition API + TypeScript | 常见陷阱、响应式模式、SSR、性能 |
| **vue-options-api-best-practices** | Options API (`data()`, `methods`) | `this` 上下文、生命周期、Options API 的 TypeScript |
| **vue-router-best-practices** | Vue Router 4 | 导航守卫、路由参数、路由-组件生命周期 |
| **vue-pinia-best-practices** | Pinia 状态管理 | 存储设置、响应性、状态模式 |
| **vue-testing-best-practices** | 编写组件或 E2E 测试 | Vitest、Vue Test Utils、Playwright |
| **vue-jsx-best-practices** | Vue 中的 JSX | 与 React JSX 的语法差异 |
| **vue-development-guides** | 构建 Vue/Nuxt 项目 | 组件拆分、数据流、核心原则 |
| **create-adaptable-composable** | 创建可复用的组合式函数 | `MaybeRef`/`MaybeRefOrGetter` 输入模式 |

## 示例

### vue-development-guides

源自 [`serkodev/vue-skills`](https://github.com/serkodev/vue-skills/tree/main) 的 `vue-best-practices`

#### 示例 - Todo 应用

提示词

```
create a todo app
```

🔎 查看示例 [完整输出](./demo/todo-app)。

#### 使用技能后的变化

- 更可读的 [代码](demo/todo-app/with-skills/App.vue)
- [组件](demo/todo-app/with-skills/components) 拆分
- 将状态移至组合式函数 ([useTodos.ts](demo/todo-app/with-skills/composables/useTodos.ts))
- 对原始响应式数据使用 `shallowRef` (参见 [响应式指南](skills/vue-development-guides/references/reactivity-guide.md))

### create-adaptable-composable

源自 [`serkodev/vue-skills`](https://github.com/serkodev/vue-skills/tree/main) 的 `create-agnostic-composable`

#### 示例 - useHidden

提示词

```
create a reusable composable for controlling hidden for a element
```

🔎 查看示例 [完整输出](./demo/hidden-composable)。

#### 使用技能后的变化

- 使用 `MaybeRef` 和 `MaybeRefOrGetter` 作为输入参数以实现响应式灵活性。

```ts
export interface UseHiddenOptions {
  hidden?: MaybeRef<boolean>
  initialHidden?: MaybeRefOrGetter<boolean>
  syncAria?: boolean
}

export function useHidden(
  target?: MaybeRefOrGetter<HTMLElement | null | undefined>,
  options: UseHiddenOptions = {},
)
```

## 方法论

### 技能类型

技能分为两类:

- **能力型 (Capability)**: AI *无法*在没有技能的情况下解决问题。这些涉及版本特定的问题、未记录的行为、最新功能或 AI 训练数据之外的边缘情况。

- **效率型 (Efficiency)**: AI *可以*解决问题但效果不佳。这些提供最佳模式、最佳实践和一致的方法,从而提高解决方案质量。

### 验证流程

此仓库中的每个技能都是通过严格的、基于证据的流程创建的:

**1. 真实世界问题收集**

技能源自生产环境中遇到的实际开发者痛点。

**2. 多模型验证**

每个技能都经过系统测试:
- **基线测试**: 验证模型在*没有*技能的情况下无法解决问题
- **技能测试**: 确认模型在*有*技能的情况下正确解决问题
- **删除标准**: 如果 Sonnet 和 Haiku 都在没有技能的情况下通过,则删除该规则

**3. 模型层级验证**

| 模型 | 无技能 | 有技能 | 操作 |
|-------|--------------|------------|--------|
| Haiku | 失败 | 通过 | 保留 |
| Sonnet | 失败 | 通过 | 保留 |
| 两者 | 通过 | - | 删除 |

**接受标准**: 只有当技能使 Haiku 或 Sonnet 能够解决他们在没有技能的情况下无法解决的问题时,才会保留该技能。

## 贡献

开发在 `dev` 分支上进行。`main` 分支仅用于已发布的技能。

1. 从 `dev` 创建功能分支
2. 提交 PR 到 `dev`
3. 批准后,更改合并到 `dev`
4. 维护者准备发布时通过 GitHub Action 同步 `dev` → `main`

## 相关项目

- [vueuse/vueuse-skills](https://github.com/vueuse/vueuse-skills) - VueUse 开发的 AI 代理技能
- [onmax/nuxt-skills](https://github.com/onmax/nuxt-skills) - Nuxt 开发的 AI 代理技能

## 许可证

MIT
