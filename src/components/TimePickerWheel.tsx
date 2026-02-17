import { useState, useEffect, useRef } from 'react'

interface TimePickerWheelProps {
  hours: number
  minutes: number
  onChange: (hours: number, minutes: number) => void
}

export function TimePickerWheel({
  hours,
  minutes,
  onChange,
}: TimePickerWheelProps) {
  const [localHours, setLocalHours] = useState(hours)
  const [localMinutes, setLocalMinutes] = useState(minutes)
  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLocalHours(hours)
    setLocalMinutes(minutes)
  }, [hours, minutes])

  const updateHours = (h: number) => {
    setLocalHours(h)
    onChange(h, localMinutes)
  }
  const updateMinutes = (m: number) => {
    setLocalMinutes(m)
    onChange(localHours, m)
  }

  useEffect(() => {
    const syncScroll = () => {
      if (hourRef.current) {
        const el = hourRef.current.querySelector(`[data-value="${localHours}"]`) as HTMLElement
        if (el) {
          hourRef.current.scrollTop = el.offsetTop - (hourRef.current.clientHeight - 40) / 2
        }
      }
      if (minuteRef.current) {
        const el = minuteRef.current.querySelector(`[data-value="${localMinutes}"]`) as HTMLElement
        if (el) {
          minuteRef.current.scrollTop = el.offsetTop - (minuteRef.current.clientHeight - 40) / 2
        }
      }
    }
    syncScroll()
  }, [])

  const hourOptions = Array.from({ length: 24 }, (_, i) => i)
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i)

  return (
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
          updateHours(Math.min(23, Math.max(0, index)))
        }}
      >
        {hourOptions.map((h) => (
          <div
            key={h}
            data-value={h}
            onClick={() => updateHours(h)}
            className={`h-10 flex items-center justify-center cursor-pointer transition-all ${
              h === localHours ? 'text-xl font-semibold text-black' : 'text-base text-black/40'
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
          updateMinutes(Math.min(59, Math.max(0, index)))
        }}
      >
        {minuteOptions.map((m) => (
          <div
            key={m}
            data-value={m}
            onClick={() => updateMinutes(m)}
            className={`h-10 flex items-center justify-center cursor-pointer transition-all ${
              m === localMinutes ? 'text-xl font-semibold text-black' : 'text-base text-black/40'
            }`}
          >
            {m.toString().padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  )
}
