export type Priority = 'high' | 'medium' | 'low'

export interface Task {
  id: string
  title: string
  description?: string
  subject: string
  priority: Priority
  dueDate?: Date
  completed: boolean
  createdAt: Date
}

export interface TaskFormData {
  title: string
  description?: string
  subject: string
  priority: Priority
  dueDate?: Date
}