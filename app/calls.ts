import type { Abi } from 'viem'

export const counterContractAddress = process.env
  .NEXT_PUBLIC_COUNTER_ADDRESS as `0x${string}`

export const counterContractAbi = [
  {
    type: 'function',
    name: 'vote',
    inputs: [{ name: 'pokemonId', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'votes',
    inputs: [{ name: 'pokemonId', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const satisfies Abi

export function createCall(pokemonId: number) {
  if (!counterContractAddress) {
    throw new Error(
      'Missing environment variable NEXT_PUBLIC_COUNTER_ADDRESS. Please set it in your .env (NEXT_PUBLIC_COUNTER_ADDRESS=0x...)'
    )
  }

  return [
    {
      to: counterContractAddress,
      abi: counterContractAbi,
      functionName: 'vote',
      args: [pokemonId],
    },
  ]
}
