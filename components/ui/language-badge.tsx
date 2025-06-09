import { getLanguage } from "@/lib/programming-languages"

interface LanguageBadgeProps {
  language: string
  size?: "sm" | "md" | "lg"
}

export function LanguageBadge({ language, size = "md" }: LanguageBadgeProps) {
  const langData = getLanguage(language)
  const Icon = langData.icon

  // Tailles différentes selon la prop size
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  }

  return (
    <div title={langData.name}>
      <Icon size={iconSizes[size]} className="text-white" />
    </div>
  )
}
