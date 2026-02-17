import { useState, useEffect, useRef } from 'react'
import { Plus } from 'lucide-react'
import { TaskList } from './components/TaskList'
import { ManualAddModal } from './components/ManualAddModal'
import type { Task } from './types'
import { loadTasks, saveTasks } from './utils/storage'
import { requestNotificationPermission, checkAndNotify } from './utils/notifications'
import './App.css'

function createTask(
  text: string,
  durationMs: number,
  id?: string
): Task {
  const now = new Date()
  const deadline = new Date(now.getTime() + durationMs)
  return {
    id: id ?? crypto.randomUUID(),
    text,
    deadline,
    createdAt: now,
    duration: durationMs,
  }
}

function App() {
  const [showManualAdd, setShowManualAdd] = useState(false)
  const permissionRequested = useRef(false)
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks() ?? [])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  useEffect(() => {
    if (tasks.length === 0) return
    const run = async () => {
      if (!permissionRequested.current) {
        permissionRequested.current = true
        await requestNotificationPermission()
      }
      const now = Date.now()
      tasks.forEach((task) => {
        const timeRemaining = task.deadline.getTime() - now
        const remainingRatio = timeRemaining / task.duration
        checkAndNotify(task.id, task.text, remainingRatio)
      })
    }
    run()
  }, [tasks])

  useEffect(() => {
    const tick = () => setTasks((prev) => [...prev])
    let intervalId: ReturnType<typeof setInterval> | null = null
    const startInterval = () => {
      if (!intervalId) intervalId = setInterval(tick, 1000)
    }
    const stopInterval = () => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }
    const handleVisibility = () => {
      if (document.hidden) stopInterval()
      else {
        tick()
        startInterval()
      }
    }
    if (!document.hidden) startInterval()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      stopInterval()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  const handleAddTask = (text: string, durationMinutes: number) => {
    const durationMs = durationMinutes * 60 * 1000
    const task = createTask(text, durationMs)
    setTasks((prev) => [...prev, task])
  }

  const handleUpdate = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...updates,
              deadline:
                updates.deadline ??
                (updates.duration && updates.createdAt
                  ? new Date(updates.createdAt.getTime() + updates.duration)
                  : t.deadline),
            }
          : t
      )
    )
  }

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex-shrink-0 py-6 text-center">
        <h1 className="text-black text-2xl font-bold">提醒我</h1>
      </header>

      <main className="flex-1 overflow-y-auto scrollbar-hide min-h-0">
        <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
      </main>

      <footer className="flex-shrink-0 py-6 px-4 border-t border-black/10">
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setShowManualAdd(true)}
            className="w-20 h-20 rounded-full border-2 border-black flex items-center justify-center text-black hover:bg-black/5 transition-all active:scale-95 bg-white"
            aria-label="添加新任务"
          >
            <Plus size={32} />
          </button>
          <p className="text-black/40 text-sm">添加新任务</p>
        </div>
      </footer>
      {showManualAdd && (
        <ManualAddModal
          onAdd={handleAddTask}
          onClose={() => setShowManualAdd(false)}
        />
      )}
    </div>
  )
}

export default App
