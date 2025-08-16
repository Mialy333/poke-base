'use client'

import { ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { WagmiProvider, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OnchainKitProvider } from '@coinbase/onchainkit'

const queryClient = new QueryClient()

const config = getDefaultConfig({
  appName: 'PokeBase',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL!),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL!),
  },
  ssr: false,
})

export function Providers({ children }: { children: ReactNode }) {
  const chain = process.env.NEXT_PUBLIC_CHAIN === 'base' ? base : baseSepolia

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" {...config}>
          <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            chain={chain}
            config={{ appearance: { mode: 'auto' } }}
          >
            {children}
          </OnchainKitProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
