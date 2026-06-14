import { getLanguage } from "@/lib/programming-languages"
import { cn } from "@/lib/utils"

interface LanguageBadgeProps {
  language: string
  size?: "sm" | "md" | "lg"
}

export function LanguageBadge({ language, size = "md" }: LanguageBadgeProps) {
  const langData = getLanguage(language)

  const dotSizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  }
  const textSizes = {
    sm: "text-[0.72rem]",
    md: "text-xs",
    lg: "text-sm",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-2.5 py-1 font-medium text-foreground/75",
        textSizes[size]
      )}
    >
      <span
        className={cn("shrink-0 rounded-full", dotSizes[size])}
        style={{ backgroundColor: langData.color }}
        aria-hidden="true"
      />
      {langData.name}
    </span>
  )
}
