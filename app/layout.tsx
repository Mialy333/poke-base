import '@coinbase/onchainkit/styles.css'
import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'PokeBase',
  description: 'Vote for your favorite Pokemon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
