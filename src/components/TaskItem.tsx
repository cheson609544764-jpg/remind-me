import { useState, useRef, useEffect } from 'react'
import { Pencil, X } from 'lucide-react'
import { CircularProgress } from './CircularProgress'
import { TimePickerModal } from './TimePickerModal'
import { formatRemainingTime, getProgressColor } from '../utils/time'
import type { Task } from '../types'

interface TaskItemProps {
  task: Task
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const now = Date.now()
  const timeRemaining = task.deadline.getTime() - now
  const totalDuration = task.deadline.getTime() - task.createdAt.getTime()
  const safeTotal = Number.isFinite(totalDuration) && totalDuration > 0 ? totalDuration : task.duration
  const remainingRatio = Math.max(0, Math.min(1, timeRemaining / safeTotal))
  const color = getProgressColor(remainingRatio)

  const currentHours = Math.floor(task.duration / (60 * 60 * 1000))
  const currentMinutes = Math.floor((task.duration % (60 * 60 * 1000)) / (60 * 1000))

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSaveEdit = () => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== task.text) {
      onUpdate(task.id, { text: trimmed })
    } else {
      setEditText(task.text)
    }
    setIsEditing(false)
  }

  const handleTimeConfirm = (hours: number, minutes: number) => {
    const duration = (hours * 60 + minutes) * 60 * 1000
    const createdAt = new Date()
    const deadline = new Date(createdAt.getTime() + duration)
    onUpdate(task.id, { duration, createdAt, deadline })
    setShowTimePicker(false)
  }

  return (
    <>
      <div className="group flex items-start gap-3 p-4 border-b border-black/10 hover:border-black/20 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleSaveEdit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit()
                  if (e.key === 'Escape') {
                    setEditText(task.text)
                    setIsEditing(false)
                    inputRef.current?.blur()
                  }
                }}
                className="flex-1 text-black text-base font-medium bg-transparent border-b border-black/20 outline-none focus:border-black"
              />
            ) : (
              <>
                <span className="text-black text-base font-medium truncate">{task.text}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/5 rounded transition-opacity"
                  aria-label="编辑"
                >
                  <Pencil size={16} className="text-black" />
                </button>
              </>
            )}
          </div>
          <p className="text-black/40 text-sm mt-1">{formatRemainingTime(task.deadline)}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="cursor-pointer hover:opacity-80 transition-opacity">
            <CircularProgress
              remainingRatio={remainingRatio}
              color={color}
              onClick={() => setShowTimePicker(true)}
            />
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/5 rounded transition-opacity"
            aria-label="删除"
          >
            <X size={20} className="text-black" />
          </button>
        </div>
      </div>

      {showTimePicker && (
        <TimePickerModal
          initialHours={currentHours}
          initialMinutes={currentMinutes}
          onConfirm={handleTimeConfirm}
          onCancel={() => setShowTimePicker(false)}
        />
      )}
    </>
  )
}
