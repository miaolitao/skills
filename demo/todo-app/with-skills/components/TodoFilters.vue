<script setup lang="ts">
import type { Filter } from '../types/todo'

// 组件属性
const { filter, remaining, completed, total } = defineProps<{
  filter: Filter
  remaining: number
  completed: number
  total: number
}>()

// 定义组件事件
const emit = defineEmits<{
  setFilter: [filter: Filter]
  clearCompleted: []
}>()

// 筛选选项数组
const filters = ['all', 'active', 'completed'] as const

// 筛选选项的显示标签
const filterLabels: Record<Filter, string> = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
}
</script>

<template>
  <section class="filters">
    <div class="filter-group" aria-label="Filter tasks">
      <button
        v-for="option in filters"
        :key="option"
        type="button"
        class="filter-button"
        :class="{ 'is-active': option === filter }"
        :aria-pressed="option === filter"
        @click="emit('setFilter', option)"
      >
        {{ filterLabels[option] }}
      </button>
    </div>

    <div class="stats" aria-live="polite">
      <span>{{ remaining }} left</span>
      <span>{{ completed }} done</span>
      <span>{{ total }} total</span>
    </div>

    <button
      v-if="completed > 0"
      type="button"
      class="clear-button"
      @click="emit('clearCompleted')"
    >
      Clear done
    </button>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
}

.filter-group {
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.7);
  padding: 6px;
  border-radius: 999px;
  border: 1px solid rgba(31, 42, 42, 0.08);
}

.filter-button {
  border: none;
  background: transparent;
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 600;
  color: var(--color-ink-soft);
  transition: background 200ms ease, color 200ms ease, box-shadow 200ms ease;
}

.filter-button.is-active {
  background: #2a8077;
  color: #fff;
  box-shadow: 0 8px 18px rgba(42, 128, 119, 0.28);
}

.stats {
  display: flex;
  gap: 12px;
  font-size: 0.9rem;
  color: var(--color-ink-soft);
}

.clear-button {
  border: 1px solid rgba(214, 107, 77, 0.4);
  background: rgba(214, 107, 77, 0.05);
  color: #d66b4d;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

.clear-button:hover {
  background: rgba(214, 107, 77, 0.12);
  border-color: rgba(214, 107, 77, 0.6);
  box-shadow: 0 6px 14px rgba(214, 107, 77, 0.2);
}
</style>
