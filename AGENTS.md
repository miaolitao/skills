# Vue Skills 开发指南

## 分支策略

> **重要:永远不要在 `main` 分支上开发!**
>
> - `main` 是**发布分支** — 仅包含已发布的 skills
> - `dev` 是**开发分支** — 所有工作都在这里进行
> - 使用 "Sync to Main" GitHub Action 将更改从 `dev` 发布到 `main`

| 分支 | 用途 | 直接提交 |
|--------|---------|----------------|
| `main` | 发布(`npx skills add vuejs-ai/skills`) | 禁止 |
| `dev` | 开发、测试、实验 | 仅通过 PR |

## Skill 范围

| Skill | 范围 |
|-------|-------|
| **vue-best-practices** | Vue 3 与 Composition API、`<script setup lang="ts">`、TypeScript、SSR。包括模板无法处理需求时的渲染函数。 |
| **vue-options-api-best-practices** | Vue 3 Options API 风格(`data()`、`methods`、`this` 上下文)。每条规则仅展示 Options API 解决方案。 |
| **vue-jsx-best-practices** | Vue 中的 JSX 语法(例如 `class` vs `className`、JSX 插件配置)。 |
| **vue-testing-best-practices** | 使用 Vitest、Vue Test Utils 进行测试,以及使用 Playwright 进行 E2E 测试。 |
| **vue-router-best-practices** | Vue Router 4 模式、导航守卫、路由参数以及路由组件生命周期交互。 |
| **vue-pinia-best-practices** | Pinia stores、状态管理模式、store 设置以及 stores 的响应式。 |

## 常见陷阱与最佳实践

- **仅限 Vue 特定内容:** 参考文件必须涵盖 Vue 模式和陷阱,而不是通用的 web/JS 知识。
- **不包含边缘情况:** 避免小众场景、工具特定的怪癖以及显而易见/众所周知的实践。
- **必需的结构:** 每个参考文件需要标题、影响级别、任务清单以及错误/正确的代码示例。
- **SKILL.md 是为编码代理设计的:** 遵循[官方最佳实践](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices):保持简洁(上下文窗口是公共资源),假设编码代理很聪明(只添加它不知道的内容),不要硬编码计数或历史背景。使用渐进式披露 — SKILL.md 是概览,指向参考文件。

## 有效 Skills 的清单

在分享 Skill 之前,请验证:

### 核心质量
- [ ] 描述具体且包含关键术语
- [ ] 描述包括 Skill 的作用和使用时机
- [ ] SKILL.md 正文少于 500 行
- [ ] 额外细节在单独的文件中(如需要)
- [ ] 没有时效性信息(或在"旧模式"部分)
- [ ] 全文术语一致
- [ ] 示例具体,非抽象
- [ ] 文件引用深度为一级
- [ ] 适当使用渐进式披露
- [ ] 工作流程有清晰的步骤

### 代码和脚本
- [ ] 脚本解决问题而不是推给 Claude
- [ ] 错误处理明确且有帮助
- [ ] 没有"魔法常量"(所有值都有依据)
- [ ] 所需包在说明中列出并验证可用
- [ ] 脚本有清晰的文档
- [ ] 没有 Windows 风格的路径(全部使用正斜杠)
- [ ] 关键操作的验证/核实步骤
- [ ] 质量关键任务包含反馈循环
