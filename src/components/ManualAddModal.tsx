import { useState, useRef, useEffect } from 'react'

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
        className="w-full max-w-sm bg-white rounded-t-2xl sm:rounded-2xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
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
            <div className="flex gap-2">
              <input
                type="number"
                min={0}
                max={23}
                value={hours}
                onChange={(e) => setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                className="flex-1 px-3 py-2 border border-black/10 rounded-lg text-black focus:outline-none focus:border-black/30"
              />
              <span className="flex items-center text-black/60">小时</span>
              <input
                type="number"
                min={0}
                max={59}
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="flex-1 px-3 py-2 border border-black/10 rounded-lg text-black focus:outline-none focus:border-black/30"
              />
              <span className="flex items-center text-black/60">分钟</span>
            </div>
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
  )
}
