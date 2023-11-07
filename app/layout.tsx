import type { Metadata } from 'next'
import React from 'react';


export const metadata: Metadata = {
  title: 'Projects - Moses Surumen',
  description: 'Projects - Moses Surumen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' data-bs-theme='light'>
      <body className='bg-body-tertiary'>{children}</body>
    </html>
  )
}
