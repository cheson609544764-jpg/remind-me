import { useState, useEffect, useRef } from 'react'

interface TimePickerModalProps {
  initialHours: number
  initialMinutes: number
  onConfirm: (hours: number, minutes: number) => void
  onCancel: () => void
}

export function TimePickerModal({
  initialHours,
  initialMinutes,
  onConfirm,
  onCancel,
}: TimePickerModalProps) {
  const [hours, setHours] = useState(initialHours)
  const [minutes, setMinutes] = useState(initialMinutes)
  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHours(initialHours)
    setMinutes(initialMinutes)
  }, [initialHours, initialMinutes])

  useEffect(() => {
    if (hourRef.current) {
      const el = hourRef.current.querySelector(`[data-value="${initialHours}"]`) as HTMLElement
      if (el) {
        hourRef.current.scrollTop = el.offsetTop - (hourRef.current.clientHeight - 40) / 2
      }
    }
    if (minuteRef.current) {
      const el = minuteRef.current.querySelector(`[data-value="${initialMinutes}"]`) as HTMLElement
      if (el) {
        minuteRef.current.scrollTop = el.offsetTop - (minuteRef.current.clientHeight - 40) / 2
      }
    }
  }, [])

  const hourOptions = Array.from({ length: 24 }, (_, i) => i)
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm bg-white rounded-t-2xl sm:rounded-2xl shadow-lg flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-black/10">
          <button
            onClick={onCancel}
            className="text-black/60 text-base hover:bg-black/5 px-3 py-1 rounded-lg transition-colors"
          >
            取消
          </button>
          <span className="font-medium text-black">选择时间</span>
          <button
            onClick={() => onConfirm(hours, minutes)}
            className="text-black font-medium text-base hover:bg-black/5 px-3 py-1 rounded-lg transition-colors"
          >
            确定
          </button>
        </div>

        <div className="relative flex" style={{ height: 200 }}>
          <div
            className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none z-10"
            style={{
              background:
                'linear-gradient(to bottom, white 40%, transparent 50%, transparent 50%, white 60%)',
            }}
          />
          <div
            className="absolute left-4 right-1/2 top-1/2 -translate-y-1/2 h-10 border border-black/10 rounded-lg pointer-events-none z-20"
            style={{ marginRight: 8 }}
          />
          <div
            className="absolute right-4 left-1/2 top-1/2 -translate-y-1/2 h-10 border border-black/10 rounded-lg pointer-events-none z-20"
            style={{ marginLeft: 8 }}
          />

          <div
            ref={hourRef}
            className="flex-1 overflow-y-auto scrollbar-hide py-20 px-2"
            onScroll={(e) => {
              const target = e.target as HTMLDivElement
              const itemHeight = 40
              const scrollTop = target.scrollTop
              const index = Math.round(scrollTop / itemHeight)
              setHours(Math.min(23, Math.max(0, index)))
            }}
          >
            {hourOptions.map((h) => (
              <div
                key={h}
                data-value={h}
                onClick={() => setHours(h)}
                className={`h-10 flex items-center justify-center cursor-pointer transition-all ${
                  h === hours ? 'text-xl font-semibold text-black' : 'text-base text-black/40'
                }`}
              >
                {h.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
          <div
            ref={minuteRef}
            className="flex-1 overflow-y-auto scrollbar-hide py-20 px-2 border-l border-black/10"
            onScroll={(e) => {
              const target = e.target as HTMLDivElement
              const itemHeight = 40
              const scrollTop = target.scrollTop
              const index = Math.round(scrollTop / itemHeight)
              setMinutes(Math.min(59, Math.max(0, index)))
            }}
          >
            {minuteOptions.map((m) => (
              <div
                key={m}
                data-value={m}
                onClick={() => setMinutes(m)}
                className={`h-10 flex items-center justify-center cursor-pointer transition-all ${
                  m === minutes ? 'text-xl font-semibold text-black' : 'text-base text-black/40'
                }`}
              >
                {m.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
