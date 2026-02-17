import type { Task } from '../types'

const STORAGE_KEY = 'remind-me-tasks'

export function loadTasks(): Task[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    const parsed = JSON.parse(stored) as Array<{
      id: string
      text: string
      deadline: string
      createdAt: string
      duration: number
    }>
    return parsed.map((t) => ({
      ...t,
      deadline: new Date(t.deadline),
      createdAt: new Date(t.createdAt),
    }))
  } catch {
    return null
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // ignore
  }
}
