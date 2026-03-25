"use client"
import { Plus } from "lucide-react"
import { useState } from "react"

interface InvestigationNote {
  date: string
  author: string
  content: string
  type: "update" | "evidence" | "action"
}

interface InvestigationNotesProps {
  notes: InvestigationNote[]
  onAddNote: (note: InvestigationNote) => void
}

export function InvestigationNotes({ notes, onAddNote }: InvestigationNotesProps) {
  const [showForm, setShowForm] = useState(false)
  const [newNote, setNewNote] = useState("")

  const typeColors = {
    update: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    evidence: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    action: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Investigation Notes</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note about this investigation..."
            className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 mb-3"
            rows={3}
          />
          <button
            onClick={() => {
              if (newNote.trim()) {
                onAddNote({
                  date: new Date().toISOString().split("T")[0],
                  author: "Admin",
                  content: newNote,
                  type: "update",
                })
                setNewNote("")
                setShowForm(false)
              }
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors text-sm"
          >
            Add Note
          </button>
        </div>
      )}

      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center py-6">No notes yet</p>
        ) : (
          notes.map((note, i) => (
            <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${typeColors[note.type]}`}>{note.type}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{note.date}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-1">{note.author}</p>
              <p className="text-sm text-slate-900 dark:text-white">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
