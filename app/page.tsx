'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

export default function Home() {
  const router = useRouter()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) router.push('/vote')
  }, [isConnected, router])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-indigo-100 dark:bg-gradient-to-b dark:from-purple-900 dark:via-yellow-600 dark:to-indigo-900 text-black dark:text-white">
      <header className="w-full p-4 flex justify-between items-center">
        <ConnectButton />
      </header>

      <main className="flex flex-col flex-grow items-center justify-center p-4 gap-6">
        <h1 className="text-4xl mb-2 drop-shadow-md">PokeBase</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-md">
          Connectez votre wallet pour commencer à voter pour votre Pokémon
          préféré.
        </p>
      </main>
    </div>
  )
}
