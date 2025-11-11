import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Peak Point Africa | Enterprise BPO Solutions",
  description:
    "Transform your business with Peak Point Africa - Leading BPO provider offering admin support, finance & accounting, healthcare RCM, AI intelligence, and customer support services across Africa.",
  keywords:
    "BPO, Business Process Outsourcing, Africa, Peak Point, Admin Support, Finance, Healthcare RCM, AI Intelligence, Customer Support",
  openGraph: {
    title: "Peak Point Africa | Enterprise BPO Solutions",
    description: "Outsource smarter. Operate leaner. Grow faster.",
    type: "website",
    url: "https://peakpoint.africa",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased`}>{children}</body>
    </html>
  )
}
