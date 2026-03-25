"use client"

interface StatusTimelineProps {
  currentStatus: "new" | "reviewing" | "investigated" | "resolved"
  submittedDate: string
  lastUpdateDate?: string
}

export function StatusTimeline({ currentStatus, submittedDate, lastUpdateDate }: StatusTimelineProps) {
  const stages = [
    { stage: "new", label: "Submitted", icon: "📝", description: "Report received and documented" },
    { stage: "reviewing", label: "Under Review", icon: "🔍", description: "Initial assessment in progress" },
    { stage: "investigated", label: "Investigated", icon: "✓", description: "Full investigation completed" },
    { stage: "resolved", label: "Resolved", icon: "✓", description: "Action taken or case closed" },
  ]

  const currentIndex = stages.findIndex((s) => s.stage === currentStatus)

  return (
    <div className="space-y-6">
      {stages.map((stage, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const isUpcoming = index > currentIndex

        return (
          <div key={stage.stage} className="flex gap-4">
            {/* Timeline Dot */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 ${
                  isCompleted
                    ? "bg-green-500 border-green-600 text-white"
                    : isCurrent
                      ? "bg-blue-500 border-blue-600 text-white ring-4 ring-blue-200"
                      : "bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400"
                }`}
              >
                {stage.icon}
              </div>
              {index < stages.length - 1 && (
                <div className={`w-1 h-16 my-2 ${isUpcoming ? "bg-slate-300 dark:bg-slate-600" : "bg-green-500"}`} />
              )}
            </div>

            {/* Timeline Content */}
            <div className="flex-1 pt-2">
              <h3
                className={`font-bold text-lg ${
                  isCurrent
                    ? "text-blue-600 dark:text-blue-400"
                    : isCompleted
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {stage.label}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stage.description}</p>
              {isCurrent && (
                <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-2">Currently in this stage</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
