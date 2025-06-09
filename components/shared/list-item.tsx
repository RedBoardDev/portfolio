import type { ReactNode } from "react"

interface ListItemProps {
  children: ReactNode
  className?: string
}

export function ListItem({ children, className = "" }: ListItemProps) {
  return (
    <li
      className={`relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-gray-400 ${className}`}
    >
      {children}
    </li>
  )
}
