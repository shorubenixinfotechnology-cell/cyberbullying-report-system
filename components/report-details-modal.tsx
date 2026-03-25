"use client"
import { X, Download, Printer } from "lucide-react"

interface ReportDetailsModalProps {
  report: any
  onClose: () => void
  onStatusChange: (status: string) => void
}

export function ReportDetailsModal({ report, onClose, onStatusChange }: ReportDetailsModalProps) {
  if (!report) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Report Details</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Report Title */}
          <div>
            <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Title</label>
            <p className="text-lg text-slate-900 dark:text-white">{report.title}</p>
          </div>

          {/* Report ID */}
          <div>
            <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Report ID</label>
            <p className="font-mono text-sm text-slate-900 dark:text-white break-all">{report.id}</p>
          </div>

          {/* Category */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Category</label>
              <p className="text-slate-900 dark:text-white capitalize">{report.category}</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Incident Date</label>
              <p className="text-slate-900 dark:text-white">{report.submittedDate}</p>
            </div>
          </div>

          {/* Status & Priority */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Status</label>
              <select
                value={report.status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="investigated">Investigated</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Priority</label>
              <div
                className={`px-3 py-2 rounded-lg font-bold capitalize ${report.priority === "high" ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"}`}
              >
                {report.priority}
              </div>
            </div>
          </div>

          {/* Evidence Status */}
          <div>
            <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Evidence</label>
            <div
              className={`px-4 py-3 rounded-lg ${report.evidence ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400" : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-400"}`}
            >
              {report.evidence ? "✓ Evidence Attached" : "No Evidence Attached"}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
