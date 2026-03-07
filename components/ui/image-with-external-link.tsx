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
        className={`flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm ${className}`}
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
          className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/30 bg-white/90 shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-white"
          title={buttonTitle}
          aria-label={buttonAriaLabel}
        >
          <ExternalLink size={11} className="text-primary" />
        </a>
      )}
    </div>
  )
}
