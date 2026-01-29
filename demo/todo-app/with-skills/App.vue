<script setup lang="ts">
import { computed } from 'vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import { useTodos } from './composables/useTodos'

// 解构待办事项管理组合式函数返回的状态和方法
const {
  filter,
  totalCount,
  remainingCount,
  completedCount,
  completionPercent,
  filteredTodos,
  addTodo,
  toggleTodo,
  removeTodo,
  clearCompleted,
  setFilter,
} = useTodos()

// 根据当前状态计算空状态提示消息
const emptyMessage = computed(() => {
  if (totalCount.value === 0) {
    return 'No tasks yet. Add your first one to get started.'
  }
  if (filter.value === 'active') {
    return 'No active tasks. You are all caught up.'
  }
  if (filter.value === 'completed') {
    return 'No completed tasks yet.'
  }
  return 'No tasks to show.'
})
</script>

<template>
  <div class="page">
    <header class="app-header">
      <div class="badge">Studio List</div>
      <h1 class="app-title">Craft a calmer to-do day.</h1>
      <p class="app-subtitle">
        Keep your focus on a small set of purposeful tasks. Capture ideas,
        triage what matters, and ship with clarity.
      </p>
    </header>

    <main class="app-card">
      <section class="app-progress">
        <div>
          <p class="progress-label">Daily momentum</p>
          <p class="progress-value">{{ completionPercent }}% complete</p>
        </div>
        <div
          class="progress-track"
          role="progressbar"
          :aria-valuenow="completionPercent"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span
            class="progress-fill"
            :style="{ width: `${completionPercent}%` }"
          ></span>
        </div>
      </section>

      <TodoInput @add="addTodo" />

      <TodoFilters
        :filter="filter"
        :remaining="remainingCount"
        :completed="completedCount"
        :total="totalCount"
        @set-filter="setFilter"
        @clear-completed="clearCompleted"
      />

      <TodoList
        :todos="filteredTodos"
        :empty-message="emptyMessage"
        @toggle="toggleTodo"
        @remove="removeTodo"
      />
    </main>

    <footer class="app-footer">
      <p>Tip: add 3 small wins to keep today light.</p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: clamp(24px, 6vw, 64px);
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 5vw, 44px);
}

.app-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.badge {
  display: inline-block;
  margin: 0 auto;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(31, 42, 42, 0.14);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), #f9f9f9);
  color: var(--color-ink);
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.06em;
  box-shadow: 0 6px 14px rgba(31, 42, 42, 0.08);
}

.app-title {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.2;
  color: var(--color-ink);
}

.app-subtitle {
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  color: var(--color-ink-soft);
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.5;
}

.app-card {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(31, 42, 42, 0.08);
  border-radius: var(--radius-lg);
  padding: clamp(20px, 5vw, 32px);
  box-shadow: 0 26px 56px rgba(24, 36, 35, 0.1);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 4vw, 28px);
}

.app-progress {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-label {
  margin: 0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 700;
  color: var(--color-ink-soft);
}

.progress-value {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-ink);
}

.progress-track {
  height: 10px;
  background: rgba(31, 42, 42, 0.08);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, #2a8077, #38a89e);
  border-radius: 999px;
  transition: width 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.app-footer {
  text-align: center;
  color: var(--color-ink-soft);
  font-size: 0.9rem;
}

.app-footer p {
  margin: 0;
}
</style>
