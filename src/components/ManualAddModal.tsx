import { useState, useRef, useEffect } from 'react'
import { TimePickerWheel } from './TimePickerWheel'

interface ManualAddModalProps {
  onAdd: (text: string, durationMinutes: number) => void
  onClose: () => void
}

export function ManualAddModal({ onAdd, onClose }: ManualAddModalProps) {
  const [text, setText] = useState('')
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(30)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    const durationMinutes = hours * 60 + minutes
    if (durationMinutes <= 0) return
    onAdd(trimmed, durationMinutes)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-t-2xl sm:rounded-2xl shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-black mb-4">添加新任务</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-black/60 mb-1">任务名称</label>
              <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="例如：回复客户邮件"
                className="w-full px-3 py-2 border border-black/10 rounded-lg text-black placeholder:text-black/30 focus:outline-none focus:border-black/30"
              />
            </div>
            <div>
              <label className="block text-sm text-black/60 mb-1">时长</label>
              <TimePickerWheel
                hours={hours}
                minutes={minutes}
                onChange={(h, m) => {
                  setHours(h)
                  setMinutes(m)
                }}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 border border-black/10 rounded-lg text-black hover:bg-black/5 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={!text.trim()}
                className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                添加
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
