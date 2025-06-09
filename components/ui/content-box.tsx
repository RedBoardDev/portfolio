import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface ContentBoxProps {
  children: ReactNode
  className?: string
  title?: string
  titleClassName?: string
  headerContent?: ReactNode
  footerContent?: ReactNode
  noPadding?: boolean
  variant?: "default" | "subtle" | "outline"
  borderAccent?: "none" | "left" | "top" | "bottom" | "right"
  borderAccentColor?: string
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
  borderAccent = "none",
  borderAccentColor = "bg-primary",
  shadow = "sm",
}: ContentBoxProps) {
  // Styles de base pour toutes les variantes
  const baseStyles = "rounded-xl border border-gray-100"

  // Styles spécifiques à chaque variante
  const variantStyles = {
    default: "bg-white",
    subtle: "bg-gray-50/80",
    outline: "bg-transparent border-gray-200",
  }

  // Styles pour l'accent de bordure
  const borderAccentStyles = {
    none: "",
    left: "relative",
    top: "relative",
    bottom: "relative",
    right: "relative",
  }

  // Styles pour les ombres
  const shadowStyles = {
    none: "",
    sm: "shadow-sm hover:shadow transition-shadow duration-200",
    md: "shadow hover:shadow-md transition-shadow duration-200",
    lg: "shadow-md hover:shadow-lg transition-shadow duration-200",
  }

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        borderAccentStyles[borderAccent],
        shadowStyles[shadow],
        className,
      )}
    >
      {/* Header avec titre optionnel */}
      {(title || headerContent) && (
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          {title && <h3 className={cn("text-lg font-semibold text-gray-900", titleClassName)}>{title}</h3>}
          {headerContent}
        </div>
      )}

      {/* Contenu principal */}
      <div className={noPadding ? "" : "p-6"}>{children}</div>

      {/* Footer optionnel */}
      {footerContent && <div className="px-6 py-4 border-t border-gray-100">{footerContent}</div>}
    </div>
  )
}
