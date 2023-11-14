"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {NextUIProvider} from "@nextui-org/react";

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      
      <body ><NextUIProvider>{children}</NextUIProvider></body>
      
    </html>
  )
}
