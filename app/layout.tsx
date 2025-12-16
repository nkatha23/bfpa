import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Bitcoin for Professionals Africa | BFPA Academy",
  description:
    "Building the Future Workforce for a Bitcoinized Economy. Empowering African professionals to thrive in the Bitcoin economy through industry-specific education.",
  keywords: ["Bitcoin", "Africa", "Professional Development", "Cryptocurrency", "Education", "Finance"],
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
