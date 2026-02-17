import { useState, useEffect } from 'react'
import { TimePickerWheel } from './TimePickerWheel'

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

  useEffect(() => {
    setHours(initialHours)
    setMinutes(initialMinutes)
  }, [initialHours, initialMinutes])

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

        <TimePickerWheel
          hours={hours}
          minutes={minutes}
          onChange={(h, m) => {
            setHours(h)
            setMinutes(m)
          }}
        />
      </div>
    </div>
  )
}
