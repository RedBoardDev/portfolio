"use client"

import { useEffect } from "react"

// Types pour les métriques Web Vitals
interface WebVitalMetric {
  name: string
  id: string
  value: number
  delta: number
}

// Analytics endpoint (remplacez par le vôtre)
const analyticsEndpoint = "https://analytics.example.com/vitals"
const DEBUG = process.env.NODE_ENV === "development"

export function WebVitalsReporter() {
  useEffect(() => {
    // Ne s'exécute qu'en production ou en mode debug
    if (process.env.NODE_ENV !== "production" && !DEBUG) return

    const reportVital = async (metric: WebVitalMetric) => {
      try {
        if (DEBUG) {
          console.log(`Web Vital: ${metric.name}`, {
            id: metric.id,
            value: metric.value,
            delta: metric.delta,
          })
          return
        }

        // Envoyer vers analytics
        await fetch(analyticsEndpoint, {
          method: "POST",
          body: JSON.stringify(metric),
          headers: { "Content-Type": "application/json" },
          keepalive: true,
        })
      } catch (error) {
        console.error("Error reporting web vital:", error)
      }
    }

    // Import dynamique de web-vitals pour éviter les erreurs SSR
    import("web-vitals")
      .then(({ onCLS, onLCP, onINP, onFCP, onTTFB }) => {
        onCLS(reportVital)
        onLCP(reportVital)
        onINP(reportVital)
        onFCP(reportVital)
        onTTFB(reportVital)
      })
      .catch((error) => {
        console.error("Failed to load web-vitals:", error)
      })
  }, [])

  return null
}
