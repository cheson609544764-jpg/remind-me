const NOTIFIED_KEY = 'remind-me-notified'

function loadNotifiedIds(): Set<string> {
  try {
    const stored = localStorage.getItem(NOTIFIED_KEY)
    if (!stored) return new Set()
    const arr = JSON.parse(stored) as string[]
    return new Set(arr)
  } catch {
    return new Set()
  }
}

function saveNotifiedIds(ids: Set<string>): void {
  try {
    localStorage.setItem(NOTIFIED_KEY, JSON.stringify([...ids]))
  } catch {
    // ignore
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  const result = await Notification.requestPermission()
  return result === 'granted'
}

export function checkAndNotify(
  taskId: string,
  taskText: string,
  remainingRatio: number
): void {
  if (remainingRatio > 0.25 || remainingRatio <= 0) return
  const notified = loadNotifiedIds()
  if (notified.has(taskId)) return
  if (!('Notification' in window) || Notification.permission !== 'granted') return

  try {
    new Notification('提醒我', {
      body: `「${taskText}」剩余时间不足 25%，请抓紧完成`,
      icon: '/vite.svg',
    })
    notified.add(taskId)
    saveNotifiedIds(notified)
  } catch {
    // ignore
  }
}

export function clearNotifiedForTask(taskId: string): void {
  const notified = loadNotifiedIds()
  notified.delete(taskId)
  saveNotifiedIds(notified)
}
