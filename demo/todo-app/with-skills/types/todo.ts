// 待办事项筛选类型:全部、未完成、已完成
export type Filter = 'all' | 'active' | 'completed'

// 待办事项数据结构
export type Todo = {
  // 唯一标识符
  id: string
  // 待办事项标题
  title: string
  // 是否已完成
  completed: boolean
  // 创建时间戳
  createdAt: number
}
