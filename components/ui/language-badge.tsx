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
    <div
      title={langData.name}
      className="flex items-center justify-center rounded-xl border border-white/16 bg-slate-950/42 p-2 text-white shadow-[0_12px_24px_-18px_rgba(15,23,42,0.45)] backdrop-blur-sm"
    >
      <Icon size={iconSizes[size]} className="text-white" />
    </div>
  )
}
