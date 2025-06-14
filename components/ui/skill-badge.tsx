"use client"

import { useState } from "react"

interface SkillBadgeProps {
  name: string
  icon?: string
  description?: string
  showTooltip?: boolean
}

export function SkillBadge({ name, icon, description, showTooltip = false }: SkillBadgeProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  return (
    <div
      className="group relative"
      onMouseEnter={() => showTooltip && setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      onFocus={() => showTooltip && setIsTooltipVisible(true)}
      onBlur={() => setIsTooltipVisible(false)}
    >
      <div className="flex items-center bg-white hover:bg-gray-50 rounded-md border border-gray-100 px-3 py-1.5 transition-colors gap-2">
        {icon && (
          <div className="w-5 h-5 flex-shrink-0">
            <img
              src={icon || "/placeholder.svg"}
              alt=""
              className="w-full h-full object-contain"
              aria-hidden="true"
            />
          </div>
        )}
        <span className="text-sm font-medium text-gray-700">{name}</span>
      </div>

      {/* Tooltip - only shown if showTooltip is true and description exists */}
      {showTooltip && description && isTooltipVisible && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10"
          role="tooltip"
          aria-hidden={!isTooltipVisible}
        >
          <div className="text-center">
            <p className="font-semibold mb-1">{name}</p>
            <p className="text-gray-300 text-xs">{description}</p>
          </div>
          <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 bg-gray-800"></div>
        </div>
      )}
    </div>
  )
}
