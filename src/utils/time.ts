export function formatRemainingTime(deadline: Date): string {
  const now = Date.now()
  const remaining = deadline.getTime() - now

  if (remaining < 0) return '已超时'
  if (remaining >= 24 * 60 * 60 * 1000) {
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000))
    return `${days}天`
  }
  if (remaining >= 60 * 60 * 1000) {
    const hours = Math.floor(remaining / (60 * 60 * 1000))
    const mins = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000))
    return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`
  }
  const mins = Math.floor(remaining / (60 * 1000))
  const secs = Math.floor((remaining % (60 * 1000)) / 1000)
  if (mins === 0) return secs > 0 ? `${secs}秒` : '已超时'
  return secs > 0 ? `${mins}分钟${secs}秒` : `${mins}分钟`
}

export function getProgressColor(ratio: number): string {
  if (ratio > 0.5) return '#22c55e'
  if (ratio > 0.25) return '#f97316'
  return '#ef4444'
}
