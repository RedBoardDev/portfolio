"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  blurDataURL?: string
  aspectRatio?: number
  wrapperClassName?: string
}

export function OptimizedImage({
  src,
  alt,
  fill,
  width,
  height,
  blurDataURL,
  aspectRatio,
  className,
  wrapperClassName,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  // Générer un placeholder blur si non fourni
  const placeholderBlur =
    blurDataURL ||
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDI9IjAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2YzZjRmNiIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4="

  // Calculer la hauteur en fonction du ratio d'aspect si nécessaire
  const calculatedHeight = aspectRatio && width && !height ? Math.round(Number(width) / aspectRatio) : height

  // Convertir l'URL en WebP si c'est une URL d'image standard et non déjà en WebP
  const optimizedSrc =
    typeof src === "string" &&
    !src.includes("webp") &&
    !src.includes("svg") &&
    !src.includes("data:") &&
    !src.includes("blob:")
      ? `${src}?format=webp`
      : src

  return (
    <div
      className={cn("overflow-hidden relative", fill ? "w-full h-full" : "", wrapperClassName)}
      style={
        !fill && aspectRatio
          ? {
              aspectRatio: String(aspectRatio),
              width: width ? `${width}px` : "100%",
              height: calculatedHeight ? `${calculatedHeight}px` : "auto",
            }
          : {}
      }
    >
      <Image
        src={isError ? "/placeholder.svg" : optimizedSrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? calculatedHeight : undefined}
        className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
        placeholder="blur"
        blurDataURL={placeholderBlur}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        loading={priority ? "eager" : "lazy"}
        sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        {...props}
      />

      {/* Placeholder pendant le chargement */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-100 animate-pulse"
          style={aspectRatio ? { aspectRatio: String(aspectRatio) } : {}}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
