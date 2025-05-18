"use client"

import { useEffect, useState, useRef } from "react"

interface NumberCounterProps {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function NumberCounter({
  end,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: NumberCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<number>(0)
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    // Reset when end value changes
    countRef.current = 0
    startTimeRef.current = null
    setCount(0)

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      const percentage = Math.min(progress / duration, 1)

      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4)

      const nextCount = easeOutQuart * end
      countRef.current = nextCount
      setCount(nextCount)

      if (percentage < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        // Ensure we end exactly at the target value
        countRef.current = end
        setCount(end)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [end, duration])

  // Format the number with the specified number of decimal places
  const formattedCount = count.toFixed(decimals)

  return (
    <span className={className}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  )
}
