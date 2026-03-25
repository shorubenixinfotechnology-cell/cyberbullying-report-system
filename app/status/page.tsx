"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Shield, Search, AlertCircle, Clock } from "lucide-react"

export default function StatusPage() {
  const [trackingId, setTrackingId] = useState("")
  const [searchResults, setSearchResults] = useState<any>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!trackingId.trim()) {
      alert("Please enter a tracking ID")
      return
    }

    // Simulate API call
    setSearchResults({
      id: trackingId,
      title: "Report Found",
      category: "harassment",
      status: "reviewing",
      submittedDate: "2025-12-05",
      priority: "medium",
      nextUpdate: "2025-12-07",
    })
    setSearched(true)
  }

  const statusStages = [
    { stage: "new", label: "Submitted", icon: "📝" },
    { stage: "reviewing", label: "Under Review", icon: "🔍" },
    { stage: "investigated", label: "Investigated", icon: "✓" },
    { stage: "resolved", label: "Resolved", icon: "✓" },
  ]

  const currentStageIndex = searchResults ? statusStages.findIndex((s) => s.stage === searchResults.status) : -1

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">SafeReport</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Check Report Status</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          Enter your tracking ID to monitor the investigation status of your report.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your tracking ID (e.g., SR-1701234567890-ABC123XY)"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {searched && searchResults ? (
          <div className="space-y-8">
            {/* Status Timeline */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Investigation Timeline</h2>

              <div className="space-y-6">
                {statusStages.map((stage, index) => {
                  const isCompleted = index <= currentStageIndex
                  const isCurrent = index === currentStageIndex

                  return (
                    <div key={stage.stage} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : isCurrent
                                ? "bg-blue-500 text-white"
                                : "bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          {stage.icon}
                        </div>
                        {index < statusStages.length - 1 && (
                          <div
                            className={`w-1 h-16 ${isCompleted ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"}`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <p
                          className={`font-bold ${
                            isCurrent
                              ? "text-blue-600 dark:text-blue-400"
                              : isCompleted
                                ? "text-green-600 dark:text-green-400"
                                : "text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {stage.label}
                        </p>
                        {isCurrent && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            Your report is currently in this stage
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Report Details */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Report Details</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Tracking ID:</span>
                  <span className="font-mono text-sm text-slate-900 dark:text-white">{searchResults.id}</span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
                <div className="flex justify-between items-start">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Category:</span>
                  <span className="text-slate-900 dark:text-white capitalize">{searchResults.category}</span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
                <div className="flex justify-between items-start">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Submitted:</span>
                  <span className="text-slate-900 dark:text-white">{searchResults.submittedDate}</span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
                <div className="flex justify-between items-start">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Priority Level:</span>
                  <span
                    className={`font-bold capitalize ${
                      searchResults.priority === "high"
                        ? "text-red-600 dark:text-red-400"
                        : "text-orange-600 dark:text-orange-400"
                    }`}
                  >
                    {searchResults.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Update */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 flex gap-4">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-blue-900 dark:text-blue-300">Next Update Expected</p>
                <p className="text-sm text-blue-800 dark:text-blue-400">{searchResults.nextUpdate}</p>
              </div>
            </div>
          </div>
        ) : searched ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 flex gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
            <p className="text-yellow-900 dark:text-yellow-300">Report not found. Please check your tracking ID.</p>
          </div>
        ) : null}

        <Link
          href="/"
          className="inline-block mt-8 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  )
}
