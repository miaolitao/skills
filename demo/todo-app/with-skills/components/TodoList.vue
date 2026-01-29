<script setup lang="ts">
import type { Todo } from '../types/todo'

// 组件属性
const { todos, emptyMessage } = defineProps<{
  todos: Todo[]
  emptyMessage: string
}>()

// 定义组件事件
const emit = defineEmits<{
  toggle: [id: string]
  remove: [id: string]
}>()
</script>

<template>
  <section class="todo-list" aria-live="polite">
    <div v-if="todos.length === 0" class="empty-state">
      <p>{{ emptyMessage }}</p>
    </div>

    <ul v-else class="todo-items">
      <li
        v-for="(todo, index) in todos"
        :key="todo.id"
        class="todo-item"
        :class="{ 'is-complete': todo.completed }"
        :style="{ '--delay': index }"
      >
        <label class="todo-toggle">
          <input
            type="checkbox"
            :checked="todo.completed"
            :aria-label="
              todo.completed
                ? `Mark ${todo.title} as not done`
                : `Mark ${todo.title} as done`
            "
            @change="emit('toggle', todo.id)"
          />
          <span></span>
        </label>
        <span class="todo-title">{{ todo.title }}</span>
        <button
          type="button"
          class="remove-button"
          aria-label="Remove task"
          @click="emit('remove', todo.id)"
        >
          Remove
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-state {
  padding: 24px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.7);
  border: 1px dashed rgba(31, 42, 42, 0.2);
  color: var(--color-ink-soft);
  text-align: center;
}

.todo-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.todo-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(31, 42, 42, 0.08);
  box-shadow: 0 16px 32px rgba(24, 36, 35, 0.12);
  animation: item-in 500ms ease forwards;
  animation-delay: calc(var(--delay) * 70ms);
  opacity: 0;
  transform: translateY(8px);
}

.todo-item.is-complete {
  opacity: 0.7;
}

.todo-toggle {
  position: relative;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

.todo-toggle input {
  opacity: 0;
  width: 28px;
  height: 28px;
  cursor: pointer;
  margin: 0;
}

.todo-toggle span {
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  border: 2px solid rgba(31, 42, 42, 0.3);
  border-radius: 50%;
  pointer-events: none;
  transition: background 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

.todo-toggle input:checked + span {
  background: linear-gradient(135deg, #2a8077, #38a89e);
  border-color: #2a8077;
  box-shadow: 0 4px 12px rgba(42, 128, 119, 0.4);
}

.todo-toggle input:checked + span::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%) rotate(45deg);
  width: 6px;
  height: 10px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
}

.todo-title {
  color: var(--color-ink);
  font-size: 1rem;
  word-break: break-word;
  transition: text-decoration 200ms ease, color 200ms ease;
}

.todo-item.is-complete .todo-title {
  text-decoration: line-through;
  color: var(--color-ink-soft);
}

.remove-button {
  border: none;
  background: transparent;
  color: rgba(214, 107, 77, 0.85);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 200ms ease, color 200ms ease;
}

.remove-button:hover {
  background: rgba(214, 107, 77, 0.12);
  color: #d66b4d;
}

@keyframes item-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
