"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface SkillBadgeProps {
  name: string
  icon?: string
  description?: string
  showTooltip?: boolean
}

interface TooltipPosition {
  left: number
  top: number
  placement: "top" | "bottom"
}

export function SkillBadge({ name, icon, description, showTooltip = false }: SkillBadgeProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  const updateTooltipPosition = useCallback(() => {
    if (!badgeRef.current || !showTooltip || !description) {
      return
    }

    const rect = badgeRef.current.getBoundingClientRect()
    const tooltipHalfWidthEstimate = 92
    const gap = 8
    const viewportPadding = 12
    const centerX = rect.left + rect.width / 2
    const left = Math.min(
      Math.max(centerX, viewportPadding + tooltipHalfWidthEstimate),
      window.innerWidth - viewportPadding - tooltipHalfWidthEstimate
    )
    const shouldOpenBottom = rect.top < 96

    setTooltipPosition({
      left,
      top: shouldOpenBottom ? rect.bottom + gap : rect.top - gap,
      placement: shouldOpenBottom ? "bottom" : "top",
    })
  }, [description, showTooltip])

  useEffect(() => {
    if (!isTooltipVisible) {
      return
    }

    updateTooltipPosition()

    const handleWindowUpdate = () => {
      updateTooltipPosition()
    }

    window.addEventListener("scroll", handleWindowUpdate, true)
    window.addEventListener("resize", handleWindowUpdate)

    return () => {
      window.removeEventListener("scroll", handleWindowUpdate, true)
      window.removeEventListener("resize", handleWindowUpdate)
    }
  }, [isTooltipVisible, updateTooltipPosition])

  const openTooltip = () => {
    if (!showTooltip || !description) {
      return
    }

    updateTooltipPosition()
    setIsTooltipVisible(true)
  }

  const closeTooltip = () => {
    setIsTooltipVisible(false)
  }

  return (
    <>
      <div
        ref={badgeRef}
        className="group relative"
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        onFocus={openTooltip}
        onBlur={closeTooltip}
        tabIndex={showTooltip ? 0 : undefined}
      >
        <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/78 px-3.5 py-2.5 shadow-[0_14px_30px_-28px_rgba(15,23,42,0.38)] transition-[background-color,border-color,box-shadow] duration-200 hover:border-slate-300 hover:bg-white">
          {icon ? (
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-slate-100/90">
              <img
                src={icon || "/placeholder.svg"}
                alt=""
                className="h-4 w-4 object-contain"
                aria-hidden="true"
              />
            </div>
          ) : null}
          <span className="text-sm font-medium text-slate-800">{name}</span>
        </div>
      </div>

      {showTooltip && description && isTooltipVisible && tooltipPosition
        ? createPortal(
            <div
              className="fixed z-[120] min-w-[132px] max-w-[220px]"
              style={{
                left: tooltipPosition.left,
                top: tooltipPosition.top,
                transform:
                  tooltipPosition.placement === "top"
                    ? "translate(-50%, -100%)"
                    : "translateX(-50%)",
                width: "max-content",
              }}
              role="tooltip"
              aria-hidden={!isTooltipVisible}
            >
              <div className="rounded-md border border-slate-800 bg-slate-950 px-3 py-2.5 text-left shadow-[0_20px_40px_-24px_rgba(15,23,42,0.58)]">
                <p className="text-[13px] font-semibold leading-4 text-white">{name}</p>
                <p className="mt-1 text-xs leading-[1.35rem] text-slate-300">{description}</p>
              </div>
              <div
                className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-slate-800 bg-slate-950 ${
                  tooltipPosition.placement === "top"
                    ? "-bottom-1 border-b border-r"
                    : "-top-1 border-l border-t"
                }`}
              />
            </div>,
            document.body
          )
        : null}
    </>
  )
}
