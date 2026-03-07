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
    "relative overflow-hidden rounded-[20px] border border-white/70 backdrop-blur-md"

  const variantStyles = {
    default:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.74))] supports-[backdrop-filter]:bg-white/72",
    subtle:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(255,255,255,0.56))] supports-[backdrop-filter]:bg-white/56",
    outline: "bg-transparent border-slate-300/70",
  }

  const shadowStyles = {
    none: "",
    sm: "shadow-[0_24px_58px_-40px_rgba(15,23,42,0.28)]",
    md: "shadow-[0_28px_68px_-42px_rgba(15,23,42,0.32)]",
    lg: "shadow-[0_34px_78px_-46px_rgba(15,23,42,0.36)]",
  }

  return (
    <div className={cn(baseStyles, variantStyles[variant], shadowStyles[shadow], className)}>
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />

      {(title || headerContent) && (
        <div className="relative z-[1] flex items-center justify-between border-b border-slate-200/80 px-6 py-4">
          {title && (
            <h3 className={cn("text-lg font-semibold text-gray-900", titleClassName)}>{title}</h3>
          )}
          {headerContent}
        </div>
      )}

      <div className={cn("relative z-[1]", noPadding ? "" : "p-6")}>{children}</div>

      {footerContent && (
        <div className="relative z-[1] border-t border-slate-200/80 px-6 py-4">{footerContent}</div>
      )}
    </div>
  )
}
