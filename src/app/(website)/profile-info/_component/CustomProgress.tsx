import type * as React from "react"
import { cn } from "@/lib/utils"

interface CustomProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max: number
  direction?: "horizontal" | "vertical"
  fillColor?: string
  emptyColor?: string
}

export function CustomProgress({
  value,
  max,
  direction = "horizontal",
  fillColor = "bg-primary",
  emptyColor = "bg-secondary",
  className,
  ...props
}: CustomProgressProps) {
  const percentage = (value / max) * 100

  if (direction === "vertical") {
    return (
      <div className={cn("relative h-full w-full overflow-hidden rounded-md", emptyColor, className)} {...props}>
        <div
          className={cn("absolute bottom-0 w-full transition-all", fillColor)}
          style={{ height: `${percentage}%` }}
        />
      </div>
    )
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-md", emptyColor, className)} {...props}>
      <div className={cn("absolute h-full transition-all", fillColor)} style={{ width: `${percentage}%` }} />
    </div>
  )
}
