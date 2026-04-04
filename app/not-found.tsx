"use client"

import { Trans, useLingui } from "@lingui/react/macro"
import Link from "next/link"
import { useEffect } from "react"

export default function NotFound() {
  const { t } = useLingui()

  useEffect(() => {
    document.title = t`Page not found | Thomas OTT`

    const metaDescription = document.querySelector('meta[name="description"]')
    const descriptionText = t`The page you are looking for does not exist or has been moved.`

    if (metaDescription) {
      metaDescription.setAttribute("content", descriptionText)
    } else {
      const newMeta = document.createElement("meta")
      newMeta.name = "description"
      newMeta.content = descriptionText
      document.head.appendChild(newMeta)
    }
  }, [t])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          <Trans>404</Trans>
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          <Trans>Page not found</Trans>
        </h2>
        <p className="text-gray-600 mb-8">
          <Trans>The page you are looking for does not exist or has been moved.</Trans>
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Trans>Back home</Trans>
        </Link>
      </div>
    </div>
  )
}
