interface CircularProgressProps {
  remainingRatio: number
  color: string
  size?: number
  strokeWidth?: number
  onClick?: () => void
}

export function CircularProgress({
  remainingRatio,
  color,
  size = 48,
  strokeWidth = 4,
  onClick,
}: CircularProgressProps) {
  const progress = Math.max(0, Math.min(1, remainingRatio))
  const r = 42
  const circumference = 2 * Math.PI * r
  const dashOffset = circumference * (1 - progress)
  const sw = (strokeWidth / size) * 100

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth={sw}
      />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={dashOffset}
        transform="rotate(-90 50 50)"
        style={{
          transition: 'stroke-dashoffset 1s linear, stroke 0.2s ease',
          WebkitTransition: 'stroke-dashoffset 1s linear, stroke 0.2s ease',
        }}
      />
    </svg>
  )
}
