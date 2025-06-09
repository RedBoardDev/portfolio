import Image from "next/image"
import type { ReactNode } from "react"

interface ProfileImageProps {
  src: string
  alt: string
  size?: "sm" | "md" | "lg"
  shape?: "square" | "rounded" | "circle"
  className?: string
  fallback?: ReactNode
}

export function ProfileImage({
  src,
  alt,
  size = "md",
  shape = "rounded",
  className = "",
  fallback,
}: ProfileImageProps) {
  // Définir les tailles
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  }

  // Définir les formes
  const shapeClasses = {
    square: "rounded-none",
    rounded: "rounded-md",
    circle: "rounded-full",
  }

  return (
    <div
      className={`
      overflow-hidden bg-white border border-gray-200 
      ${sizeClasses[size]} 
      ${shapeClasses[shape]} 
      ${className}
      flex items-center justify-center
    `}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={size === "lg" ? 56 : size === "md" ? 48 : 40}
        height={size === "lg" ? 56 : size === "md" ? 48 : 40}
        className="object-cover"
      />
    </div>
  )
}
