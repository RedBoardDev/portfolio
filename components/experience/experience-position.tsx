import type { Position } from "@/data/experiences"
import { TimelineItem } from "@/components/ui/timeline-item"
import { DateLocationDisplay } from "@/components/ui/date-location-display"
import { ListItem } from "@/components/shared/list-item"

interface ExperiencePositionProps {
  position: Position
  isLast: boolean
}

export function ExperiencePosition({ position, isLast }: ExperiencePositionProps) {
  return (
    <TimelineItem isLast={isLast}>
      <div>
        <h4 className="text-base font-semibold text-gray-900">{position.title}</h4>
        <p className="text-gray-600 text-sm">{position.type}</p>

        <DateLocationDisplay
          date={`${position.period} · ${position.duration}`}
          location={position.location}
          className="mt-1"
        />

        {/* Description (optionnel) */}
        {position.description && position.description.length > 0 && (
          <ul className="mt-2 space-y-1 text-gray-700 text-sm">
            {position.description.map((item, idx) => (
              <ListItem key={idx}>{item}</ListItem>
            ))}
          </ul>
        )}
      </div>
    </TimelineItem>
  )
}
