import { Calendar, MapPin } from "lucide-react"

interface DateLocationDisplayProps {
  date: string
  location: string
  className?: string
  showIcons?: boolean
}

export function DateLocationDisplay({ date, location, className = "", showIcons = true }: DateLocationDisplayProps) {
  return (
    <div className={`flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-gray-500 ${className}`}>
      <div className="flex items-center">
        {showIcons && <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />}
        <span>{date}</span>
      </div>
      <div className="flex items-center">
        {showIcons && <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />}
        <span>{location}</span>
      </div>
    </div>
  )
}
