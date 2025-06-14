"use client"

import { ExternalLink } from "lucide-react"
import Image from "next/image"

interface ImageWithExternalLinkProps {
  src: string
  alt: string
  url?: string
  width: number
  height: number
  className?: string
  containerClassName?: string
  buttonTitle?: string
  buttonAriaLabel?: string
}

export function ImageWithExternalLink({
  src,
  alt,
  url,
  width,
  height,
  className = "",
  containerClassName = "",
  buttonTitle,
  buttonAriaLabel,
}: ImageWithExternalLinkProps) {
  return (
    <div className={`relative ${containerClassName}`}>
      <div
        className={`rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0 ${className}`}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="object-cover w-full h-full"
        />
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full backdrop-blur-md bg-white/80 hover:bg-white/90 transition-all duration-200 border border-white/30 shadow-lg hover:shadow-xl hover:scale-105"
          title={buttonTitle}
          aria-label={buttonAriaLabel}
        >
          <ExternalLink size={12} className="text-primary/80" />
        </a>
      )}
    </div>
  )
}
