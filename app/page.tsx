"use client"

import Link from "next/link"
import { Shield, Lock, FileText, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">SafeReport</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/report"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              Submit Report
            </Link>

          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          Report Cyberbullying <span className="text-blue-600 dark:text-blue-400">Safely & Anonymously</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Your identity is protected. Your voice is heard. Report harassment, threats, and online abuse without fear of
          exposure.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/report"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Report an Incident
          </Link>
          <Link
            href="#how-it-works"
            className="px-8 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Complete Privacy", desc: "Your identity remains hidden from all parties" },
              { icon: Lock, title: "Secure Storage", desc: "Encrypted database protects sensitive data" },
              { icon: FileText, title: "Evidence Support", desc: "Upload screenshots, links, and documents" },
              { icon: CheckCircle, title: "Case Tracking", desc: "Monitor investigation status in real-time" },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 border border-blue-200 dark:border-slate-600 hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">Reporting Process</h2>
        <div className="space-y-6">
          {[
            {
              step: 1,
              title: "Submit Details",
              desc: "Provide information about the cyberbullying incident without identifying yourself",
            },
            {
              step: 2,
              title: "Categorize Incident",
              desc: "Select the type of harassment (threats, harassment, hate speech, etc.)",
            },
            {
              step: 3,
              title: "Upload Evidence",
              desc: "Attach screenshots, links, or documents supporting your report",
            },
            { step: 4, title: "Get Tracking ID", desc: "Receive a unique ID to check case status anonymously" },
          ].map((item) => (
            <div key={item.step} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-slate-600 dark:text-slate-400">
          <p>Your privacy is our priority. All reports are handled with strict confidentiality.</p>
        </div>
      </footer>
    </main>
  )
}
