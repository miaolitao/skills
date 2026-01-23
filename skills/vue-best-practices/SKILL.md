---
name: vue-best-practices
description: Vue 3 and Vue.js best practices for TypeScript, vue-tsc, and Volar. This skill should be used when writing, reviewing, or refactoring Vue components to ensure correct typing patterns. Triggers on tasks involving Vue components, props extraction, wrapper components, template type checking, or Volar configuration.
license: MIT
metadata:
  author: hyf0
  version: "9.0.0"
---

## Rules by Category

### core (Vue API)

| Rule | Keywords | Description |
|------|----------|-------------|
| [define-model-update-event](rules/define-model-update-event.md) | defineModel, update event, undefined | Fix model update errors |
| [deep-watch-numeric](rules/deep-watch-numeric.md) | watch, deep, array, Vue 3.5 | Efficient array watching |

### pattern (Code Structure)

| Rule | Keywords | Description |
|------|----------|-------------|
| [script-setup-jsdoc](rules/script-setup-jsdoc.md) | jsdoc, documentation, component | Document script setup components |

### typescript (Type-Safe Patterns)

| Rule | Keywords | Description |
|------|----------|-------------|
| [extract-component-props](rules/extract-component-props.md) | get props type, wrapper component, extend props, inherit props, ComponentProps | Extract types from .vue components |
| [vue-tsc-strict-templates](rules/vue-tsc-strict-templates.md) | undefined component, template error, strictTemplates | Catch undefined components in templates |
| [fallthrough-attributes](rules/fallthrough-attributes.md) | fallthrough, $attrs, wrapper component | Type-check fallthrough attributes |
| [strict-css-modules](rules/strict-css-modules.md) | css modules, $style, typo | Catch CSS module class typos |
| [data-attributes-config](rules/data-attributes-config.md) | data-*, strictTemplates, attribute | Allow data-* attributes |
| [volar-3-breaking-changes](rules/volar-3-breaking-changes.md) | volar, vue-language-server, editor | Fix Volar 3.0 upgrade issues |
| [module-resolution-bundler](rules/module-resolution-bundler.md) | cannot find module, @vue/tsconfig, moduleResolution | Fix module resolution errors |
| [with-defaults-union-types](rules/with-defaults-union-types.md) | withDefaults, union type, default | Fix union type defaults |
| [vue-directive-comments](rules/vue-directive-comments.md) | @vue-ignore, @vue-skip, template | Control template type checking |
| [codeactions-save-performance](rules/codeactions-save-performance.md) | slow save, performance, volar | Fix slow save times |

---

## Pending Migration (Out of Scope)

These rules should move to separate skill packages:

| Rule | Target Skill | Reason |
|------|--------------|--------|
| [vue-router-typed-params](rules/vue-router-typed-params.md) | vue-router-skills | Router-specific |
| [pinia-store-mocking](rules/pinia-store-mocking.md) | vue-pinia-skills | Pinia-specific |
| [hmr-vue-ssr](rules/hmr-vue-ssr.md) | vue-vite-skills | Vite SSR/HMR |
| [duplicate-plugin-detection](rules/duplicate-plugin-detection.md) | vue-vite-skills | Vite plugin issue |

---

## Reference

- [Vue Language Tools](https://github.com/vuejs/language-tools)
- [vue-component-type-helpers](https://github.com/vuejs/language-tools/tree/master/packages/component-type-helpers)
- [Vue 3 Documentation](https://vuejs.org/)
