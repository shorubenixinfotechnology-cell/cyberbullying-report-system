"use client"
import { CheckCircle2, Trash2 } from "lucide-react"

interface BulkActionsProps {
  selectedCount: number
  onMarkResolved: () => void
  onDeleteSelected: () => void
  onClearSelection: () => void
}

export function BulkActions({ selectedCount, onMarkResolved, onDeleteSelected, onClearSelection }: BulkActionsProps) {
  if (selectedCount === 0) return null

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-center justify-between mb-6">
      <p className="text-sm font-bold text-blue-900 dark:text-blue-300">{selectedCount} report(s) selected</p>
      <div className="flex gap-2">
        <button
          onClick={onMarkResolved}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-lg transition-colors flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Mark Resolved
        </button>
        <button
          onClick={onDeleteSelected}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg transition-colors flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
        <button
          onClick={onClearSelection}
          className="px-4 py-2 bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-bold text-sm rounded-lg hover:bg-slate-400 dark:hover:bg-slate-700 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
