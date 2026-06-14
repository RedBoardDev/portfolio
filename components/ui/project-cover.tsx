import { OptimizedImage } from "@/components/ui/optimized-image"
import { getLanguage } from "@/lib/programming-languages"

interface ProjectCoverProps {
  image?: string
  primaryLanguage: string
  alt: string
}

export function ProjectCover({ image, primaryLanguage, alt }: ProjectCoverProps) {
  if (image) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-muted">
        <OptimizedImage src={image} alt={alt} fill className="object-cover" />
      </div>
    )
  }

  const lang = getLanguage(primaryLanguage)
  const Icon = lang.icon

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-secondary/50"
      style={{
        backgroundImage: `radial-gradient(110% 110% at 28% 18%, ${lang.color}26, transparent 60%), radial-gradient(120% 120% at 82% 100%, ${lang.color}1a, transparent 55%)`,
      }}
    >
      <div className="relative flex items-center gap-2.5">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-sm"
          style={{
            borderColor: `${lang.color}40`,
            backgroundColor: `${lang.color}1f`,
            color: lang.color,
          }}
        >
          <Icon size={18} aria-hidden="true" />
        </span>
        <span
          className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em]"
          style={{ color: lang.color }}
        >
          {lang.name}
        </span>
      </div>
    </div>
  )
}
