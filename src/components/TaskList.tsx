import { TaskItem } from './TaskItem'
import type { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  const sortedTasks = [...tasks].sort(
    (a, b) => a.deadline.getTime() - b.deadline.getTime()
  )

  if (sortedTasks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <p className="text-black/40 text-center text-sm">
          暂无任务，点击下方添加新任务
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
