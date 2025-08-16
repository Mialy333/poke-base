'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import PokemonGrid, { Pokemon } from '../components/PokemonGrid'
// import MiniAppSDK from '@farcaster/miniapp-sdk' // Décommenter si SDK installé

export default function VotePage() {
  const router = useRouter()
  const { isConnected, address } = useAccount()
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  // Redirection si wallet non connecté
  useEffect(() => {
    if (!isConnected) router.push('/')
  }, [isConnected, router])

  // Fetch Pokémon
  useEffect(() => {
    type PokeApiResult = { name: string; url: string }

    async function fetchPokemons() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      const data = await res.json()
      const formatted = data.results.map((p: PokeApiResult, index: number) => ({
        id: index + 1,
        name: p.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          index + 1
        }.png`,
      }))
      setPokemons(formatted)
    }
    fetchPokemons()
  }, [])

  // Fonction Farcaster ou backend
  const handleFarcasterVote = async (pokemonId: number) => {
    if (!address) return
    try {
      // Décommenter et configurer si Farcaster installé
      // await miniApp.createPost({ text: `User ${address} voted for Pokémon #${pokemonId}` })
      console.log(`User ${address} voted for Pokémon #${pokemonId}`)
    } catch (err) {
      console.error('Erreur Farcaster:', err)
    }
  }

  if (!isConnected) return null

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-indigo-100 dark:bg-gradient-to-b dark:from-purple-900 dark:via-yellow-600 dark:to-indigo-900 text-black dark:text-white">
      <header className="w-full p-4 flex justify-between items-center">
        <ConnectButton />
      </header>

      <main className="flex flex-col flex-grow items-center justify-start p-4 gap-6">
        <h1 className="text-4xl mb-2 drop-shadow-md">
          Vote for your favorite Pokémon
        </h1>

        <PokemonGrid pokemonList={pokemons} onVote={handleFarcasterVote} />
      </main>
    </div>
  )
}
