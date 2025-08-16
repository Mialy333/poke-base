'use client'

import Image from 'next/image'
import VoteButton from './VoteButton'

export interface Pokemon {
  id: number
  name: string
  image: string
}

interface PokemonGridProps {
  pokemonList: Pokemon[]
  onVote?: (pokemonId: number) => Promise<void>
}

export default function PokemonGrid({ pokemonList, onVote }: PokemonGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemonList.map((pokemon) => (
        <div
          key={pokemon.id}
          className="flex flex-col items-center gap-4 bg-white/50 dark:bg-black/50 rounded-xl p-4"
        >
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={256}
            height={256}
            className="rounded-xl"
          />
          <p className="capitalize font-bold text-lg">{pokemon.name}</p>
          <VoteButton pokemonId={pokemon.id} onVote={onVote} />
        </div>
      ))}
    </div>
  )
}
