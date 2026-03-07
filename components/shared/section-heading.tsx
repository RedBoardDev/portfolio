import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-[0.72rem] font-medium uppercase tracking-[0.24em] text-slate-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="inline-block max-w-2xl text-3xl font-semibold leading-[0.95] text-slate-950 sm:text-4xl lg:text-[2.8rem]">
        {title}
        <span className="mt-3 block h-[3px] w-1/2 bg-primary/90" aria-hidden="true" />
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
