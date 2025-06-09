import type { ReactNode } from "react"

interface TimelineItemProps {
  children: ReactNode
  isLast?: boolean
  className?: string
}

export function TimelineItem({ children, isLast = false, className = "" }: TimelineItemProps) {
  return (
    <div className={`relative pl-8 pb-6 last:pb-0 ${className}`}>
      {/* Timeline dot and line */}
      <div className="absolute left-[7px] top-2 w-1.5 h-1.5 rounded-full bg-gray-300" />
      {!isLast && <div className="absolute left-2 top-3 w-[1px] h-[calc(100%-12px)] bg-gray-200" />}
      {children}
    </div>
  )
}
