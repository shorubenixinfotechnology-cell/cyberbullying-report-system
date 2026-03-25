import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SafeReport - Anonymous Cyberbullying Report System",
  description: "Securely report cyberbullying incidents anonymously. Your privacy is protected.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%230ea5e9"/><path d="M30,30v40h20c11.05,0,20-8.95,20-20S61.05,30,50,30H30zm4,4h16c8.84,0,16,7.16,16,16s-7.16,16-16,16H34V34z" fill="white"/><path d="M70,30v4h-8v32h8v4H50v-4h8V34h-8v-4h20z" fill="white"/></svg>',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: light)'
      },
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%230d9488"/><path d="M30,30v40h20c11.05,0,20-8.95,20-20S61.05,30,50,30H30zm4,4h16c8.84,0,16,7.16,16,16s-7.16,16-16,16H34V34z" fill="white"/><path d="M70,30v4h-8v32h8v4H50v-4h8V34h-8v-4h20z" fill="white"/></svg>',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: dark)'
      },
      {
        url: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon'
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
