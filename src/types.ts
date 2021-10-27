export type Filters = 'all' | 'active' | 'completed'

export interface Todo {
  id: string
  status: "completed" | 'active'
  description: string
}