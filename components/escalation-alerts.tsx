"use client"
import { AlertTriangle, Clock, TrendingUp } from "lucide-react"

interface EscalationAlertsProps {
  highPriorityCount: number
  overdueCount: number
  escalationTrend: "increasing" | "stable" | "decreasing"
}

export function EscalationAlerts({ highPriorityCount, overdueCount, escalationTrend }: EscalationAlertsProps) {
  return (
    <div className="space-y-3">
      {/* High Priority Alert */}
      {highPriorityCount > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-900 dark:text-red-300">{highPriorityCount} High Priority Reports</p>
            <p className="text-sm text-red-800 dark:text-red-400">Immediate attention required</p>
          </div>
        </div>
      )}

      {/* Overdue Alert */}
      {overdueCount > 0 && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 flex gap-3">
          <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-orange-900 dark:text-orange-300">{overdueCount} Overdue Cases</p>
            <p className="text-sm text-orange-800 dark:text-orange-400">Investigation deadline passed</p>
          </div>
        </div>
      )}

      {/* Trend Alert */}
      {escalationTrend === "increasing" && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex gap-3">
          <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-yellow-900 dark:text-yellow-300">Reports Increasing</p>
            <p className="text-sm text-yellow-800 dark:text-yellow-400">Upward trend detected this week</p>
          </div>
        </div>
      )}
    </div>
  )
}
