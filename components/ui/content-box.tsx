import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export interface ContentBoxProps {
  children: ReactNode
  className?: string
  title?: string
  titleClassName?: string
  headerContent?: ReactNode
  footerContent?: ReactNode
  noPadding?: boolean
  variant?: "default" | "subtle" | "outline"
  shadow?: "none" | "sm" | "md" | "lg"
}

export function ContentBox({
  children,
  className,
  title,
  titleClassName,
  headerContent,
  footerContent,
  noPadding = false,
  variant = "default",
  shadow = "sm",
}: ContentBoxProps) {
  const baseStyles =
    "relative overflow-hidden rounded-[20px] border border-border/80 backdrop-blur-sm"

  const variantStyles = {
    default: "bg-card/85 supports-[backdrop-filter]:bg-card/75",
    subtle: "bg-card/60 supports-[backdrop-filter]:bg-card/50",
    outline: "border-border bg-transparent",
  }

  const shadowStyles = {
    none: "",
    sm: "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-32px_rgba(15,23,42,0.2)]",
    md: "shadow-[0_1px_2px_rgba(15,23,42,0.05),0_24px_54px_-36px_rgba(15,23,42,0.24)]",
    lg: "shadow-[0_1px_3px_rgba(15,23,42,0.06),0_32px_70px_-40px_rgba(15,23,42,0.28)]",
  }

  return (
    <div className={cn(baseStyles, variantStyles[variant], shadowStyles[shadow], className)}>
      {(title || headerContent) && (
        <div className="relative z-[1] flex items-center justify-between gap-4 border-b border-border/70 px-6 py-4">
          {title && (
            <h3 className={cn("text-lg font-semibold text-foreground", titleClassName)}>{title}</h3>
          )}
          {headerContent}
        </div>
      )}

      <div className={cn("relative z-[1]", noPadding ? "" : "p-6")}>{children}</div>

      {footerContent && (
        <div className="relative z-[1] border-t border-border/70 px-6 py-4">{footerContent}</div>
      )}
    </div>
  )
}
