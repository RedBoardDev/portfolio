import type { ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  children?: ReactNode
  className?: string
}

export function SectionHeader({ title, children, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex justify-between items-center mb-6 ${className}`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  )
}
