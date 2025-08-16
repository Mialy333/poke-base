'use client'

import Image from 'next/image'
import { useCallback } from 'react'
import { useContractRead } from 'wagmi'
import type { Address } from 'viem'
import VoteButton from './VoteButton'
import { counterContractAbi, counterContractAddress } from '../calls'

interface PokemonCardProps {
  id: number
  name: string
  image: string
}

export default function PokemonCard({ id, name, image }: PokemonCardProps) {
  const { data: votesData, refetch } = useContractRead({
    address: counterContractAddress as Address,
    abi: counterContractAbi,
    functionName: 'votes',
    args: [BigInt(id)],
  })

  const votes = votesData ? Number(votesData as unknown as bigint) : 0

  const onVote = useCallback(async () => {
    // after a successful vote, refetch the votes count
    try {
      await refetch()
    } catch (e) {
      console.error('Failed to refetch votes after vote', e)
    }
  }, [refetch])

  return (
    <div className="bg-gradient-to-tr from-yellow-400 via-purple-400 to-indigo-500 rounded-xl p-4 flex flex-col items-center shadow-lg hover:scale-105 transition-transform duration-300 max-w-[220px] mx-auto">
      <div className="w-48 h-48 relative mb-2">
        <Image
          src={image}
          alt={name}
          width={256}
          height={256}
          style={{ objectFit: 'contain' }}
          quality={100}
        />
      </div>
      <h3 className="text-lg font-semibold capitalize mb-2 drop-shadow-md">
        {name}
      </h3>
      <div className="text-sm text-gray-800 dark:text-gray-200 mb-2">
        Votes: {votes}
      </div>
      <VoteButton pokemonId={id} onVote={onVote} />
    </div>
  )
}
