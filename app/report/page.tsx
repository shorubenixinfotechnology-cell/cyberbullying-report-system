"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Shield, Upload, Check, AlertCircle } from "lucide-react"
import { FileUpload } from "@/components/ui/file-upload"

export default function ReportPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "harassment",
    incidentDate: "",
    location: "online",
    evidence: null as File | null,
    contactEmail: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [trackingId, setTrackingId] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate submission - generate a unique tracking ID
    const id = `SR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    setTrackingId(id)
    setSubmitted(true)

    // Reset form
    setTimeout(() => {
      setFormData({
        title: "",
        description: "",
        category: "harassment",
        incidentDate: "",
        location: "online",
        evidence: null,
        contactEmail: "",
      })
    }, 2000)
  }

  const categories = [
    "Harassment",
    "Threats/Violence",
    "Hate Speech",
    "Impersonation",
    "Sexual Harassment",
    "Doxxing",
    "Other",
  ]

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-green-200 dark:border-green-900 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Report Submitted Successfully</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Thank you for your report. Your identity is completely protected.
            </p>
            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Your Tracking ID:</p>
              <p className="font-mono font-bold text-lg text-slate-900 dark:text-white break-all">{trackingId}</p>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Save this ID to check your report status. Our team will investigate within 48 hours.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

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

      {/* Form Section */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Report an Incident</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          Your anonymity is guaranteed. No personal information will be revealed.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Privacy Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 dark:text-blue-300">
              This form does not collect your IP address, location, or device ID. You remain completely anonymous.
            </p>
          </div>

          {/* Incident Title */}
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Incident Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Brief description of the incident"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Type of Incident</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Incident Date */}
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">When Did This Happen?</label>
            <input
              type="date"
              required
              value={formData.incidentDate}
              onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Detailed Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what happened, including any relevant details..."
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Where Did This Occur?</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="online">Online Platform</option>
              <option value="school">School</option>
              <option value="workplace">Workplace</option>
              <option value="social">Social Media</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Evidence Upload */}
          <FileUpload
            value={formData.evidence}
            onChange={(file) => setFormData({ ...formData, evidence: file })}
            maxSizeMB={10}
          />

          {/* Contact Email (Optional) */}
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Email for Updates (Optional & Anonymous)
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              placeholder="You can use a temporary/anonymous email address"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
            >
              Submit Report
            </button>
            <Link
              href="/"
              className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}
