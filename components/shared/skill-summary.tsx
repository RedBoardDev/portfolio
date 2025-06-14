import { Diamond } from "lucide-react"

interface SkillSummaryProps {
  skills: string[]
  className?: string
  maxDisplay?: number
}

export default function SkillSummary({
  skills,
  className = "",
  maxDisplay = 2,
}: SkillSummaryProps) {
  if (!skills || skills.length === 0) return null

  const displayedSkills = skills.slice(0, maxDisplay)
  const remainingCount = skills.length - maxDisplay

  return (
    <div className={`flex items-center gap-2 text-gray-600 ${className}`}>
      <Diamond className="w-4 h-4 text-gray-500 flex-shrink-0" />
      <span className="text-sm">
        {displayedSkills.join(", ")}
        {remainingCount > 0 &&
          ` et ${remainingCount} compétence${remainingCount > 1 ? "s" : ""} de plus`}
      </span>
    </div>
  )
}
