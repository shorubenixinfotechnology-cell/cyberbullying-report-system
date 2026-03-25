"use client"

import type React from "react"

import { useState } from "react"
import { Shield, LogOut, Search, Filter, Eye, Trash2, BarChart3, Users, AlertTriangle } from "lucide-react"

interface Report {
  id: string
  title: string
  category: string
  status: "new" | "reviewing" | "investigated" | "resolved"
  submittedDate: string
  priority: "low" | "medium" | "high"
  evidence: boolean
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [reports, setReports] = useState<Report[]>([
    {
      id: "SR-1701234567890-ABC123XY",
      title: "Harassment on social platform",
      category: "harassment",
      status: "reviewing",
      submittedDate: "2025-12-05",
      priority: "high",
      evidence: true,
    },
    {
      id: "SR-1701234567891-DEF456YZ",
      title: "Threatening messages received",
      category: "threats/violence",
      status: "new",
      submittedDate: "2025-12-04",
      priority: "high",
      evidence: true,
    },
    {
      id: "SR-1701234567892-GHI789AB",
      title: "Hate speech in comments",
      category: "hate speech",
      status: "investigated",
      submittedDate: "2025-12-03",
      priority: "medium",
      evidence: false,
    },
  ])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      setAuthenticated(true)
      setPassword("")
    } else {
      alert("Invalid password")
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    setPassword("")
  }

  const updateReportStatus = (id: string, newStatus: Report["status"]) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, status: newStatus } : r)))
  }

  const deleteReport = (id: string) => {
    setReports(reports.filter((r) => r.id !== id))
    setSelectedReport(null)
  }

  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.includes(searchQuery)
    const matchesFilter = filterStatus === "all" || r.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const statusColors = {
    new: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
    reviewing: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
    investigated: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
    resolved: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  }

  const priorityColors = {
    low: "text-slate-600 dark:text-slate-400",
    medium: "text-orange-600 dark:text-orange-400 font-bold",
    high: "text-red-600 dark:text-red-400 font-bold",
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex justify-center mb-6">
              <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-6">Admin Portal</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Demo password: admin123</p>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">Admin Dashboard</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Reports Management</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            {
              label: "Total Reports",
              value: reports.length,
              icon: BarChart3,
              color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
            },
            {
              label: "New",
              value: reports.filter((r) => r.status === "new").length,
              icon: AlertTriangle,
              color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
            },
            {
              label: "High Priority",
              value: reports.filter((r) => r.priority === "high").length,
              icon: AlertTriangle,
              color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
            },
            {
              label: "Resolved",
              value: reports.filter((r) => r.status === "resolved").length,
              icon: Users,
              color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
            },
          ].map((stat, i) => {
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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Reports List - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by title or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-slate-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="investigated">Investigated</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reports List */}
            <div className="space-y-3">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedReport?.id === report.id
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white">{report.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                        {report.id.slice(0, 25)}...
                      </p>
                      <div className="flex gap-2 mt-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[report.status]}`}>
                          {report.status}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[report.priority]}`}>
                          {report.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredReports.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400">No reports found</p>
                </div>
              )}
            </div>
          </div>

          {/* Report Details - Right Side */}
          {selectedReport ? (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 sticky top-20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Details</h2>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Status Update */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">Status</label>
                    <select
                      value={selectedReport.status}
                      onChange={(e) => {
                        updateReportStatus(selectedReport.id, e.target.value as Report["status"])
                        setSelectedReport({
                          ...selectedReport,
                          status: e.target.value as Report["status"],
                        })
                      }}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-bold border-0 focus:ring-2 focus:ring-blue-500 ${statusColors[selectedReport.status]}`}
                    >
                      <option value="new">New</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="investigated">Investigated</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">Category</label>
                    <p className="text-sm text-slate-900 dark:text-white capitalize">{selectedReport.category}</p>
                  </div>

                  {/* Submitted Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">Submitted</label>
                    <p className="text-sm text-slate-900 dark:text-white">{selectedReport.submittedDate}</p>
                  </div>

                  {/* Evidence */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">Evidence</label>
                    <p className="text-sm">
                      {selectedReport.evidence ? (
                        <span className="text-green-600 dark:text-green-400 font-bold">✓ Attached</span>
                      ) : (
                        <span className="text-slate-600 dark:text-slate-400">None</span>
                      )}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button className="flex-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="flex-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-1">
              <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 p-8 flex items-center justify-center text-center">
                <p className="text-slate-600 dark:text-slate-400">Select a report to view details</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
