import { BarChart3, AlertTriangle, Users } from "lucide-react"

interface ReportStatsProps {
  total: number
  newCount: number
  highPriority: number
  resolved: number
}

export function ReportStats({ total, newCount, highPriority, resolved }: ReportStatsProps) {
  const stats = [
    {
      label: "Total Reports",
      value: total,
      icon: BarChart3,
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      label: "New Reports",
      value: newCount,
      icon: AlertTriangle,
      color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
    },
    {
      label: "High Priority",
      value: highPriority,
      icon: AlertTriangle,
      color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    },
    {
      label: "Resolved",
      value: resolved,
      icon: Users,
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <div key={i} className={`p-6 rounded-lg border border-slate-200 dark:border-slate-700 ${stat.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium opacity-75">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <Icon className="w-6 h-6 opacity-50" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
