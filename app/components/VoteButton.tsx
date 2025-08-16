'use client'

import { useState, useEffect } from 'react'
import {
  Transaction,
  TransactionButton,
} from '@coinbase/onchainkit/transaction'
import { createCall } from '../calls'

interface VoteButtonProps {
  pokemonId: number
  onVote?: (pokemonId: number) => Promise<void>
}
type TransactionReceipt = { transactionHash: string }
type TransactionSuccessPayload =
  | { transactionReceipts: TransactionReceipt[] }
  | { transactionHash: string }
  | unknown

export default function VoteButton({ pokemonId, onVote }: VoteButtonProps) {
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleSuccess = async (res?: TransactionSuccessPayload) => {
    if (onVote) await onVote(pokemonId)

    let hash = 'N/A'
    if (typeof res === 'object' && res !== null) {
      const r = res as {
        transactionReceipts?: Array<{ transactionHash?: string }>
        transactionHash?: string
      }

      if (
        Array.isArray(r.transactionReceipts) &&
        r.transactionReceipts.length > 0
      ) {
        hash = r.transactionReceipts[0].transactionHash ?? hash
      } else if (typeof r.transactionHash === 'string') {
        hash = r.transactionHash
      }
    }
    setToastMessage(
      `Merci d'avoir voté pour Pokémon #${pokemonId} 🎉 — Tx: ${hash}`
    )
    setToastVisible(true)
  }

  useEffect(() => {
    if (!toastVisible) return
    const t = setTimeout(() => setToastVisible(false), 8000)
    return () => clearTimeout(t)
  }, [toastVisible])

  return (
    <div className="relative">
      <Transaction
        calls={async () => createCall(pokemonId)}
        resetAfter={5000}
        onSuccess={handleSuccess}
        onError={(err: unknown) => {
          const isErrWithMessage = (e: unknown): e is { message?: string } =>
            typeof e === 'object' && e !== null && 'message' in e

          const msg = isErrWithMessage(err)
            ? (err.message as string) || 'Invalid request'
            : 'Invalid request'
          setToastMessage(msg)
          setToastVisible(true)
        }}
        className="mx-auto w-full max-w-[220px]"
      >
        <TransactionButton
          className="inline-flex items-center justify-center mx-auto px-4 py-2 rounded-full border border-purple-500 bg-white text-purple-700 hover:bg-purple-50 transition"
          text="Vote"
        />
      </Transaction>

      {/* Simple integrated toast (replaces alert) */}
      {toastVisible && (
        <div className="fixed right-4 bottom-6 z-50 w-auto max-w-sm rounded-lg bg-white/95 dark:bg-gray-900/95 border border-gray-200 dark:border-gray-700 shadow-lg p-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4"
                />
              </svg>
            </div>
            <div className="flex-1 text-sm text-gray-900 dark:text-gray-100">
              <div className="font-medium">Vote enregistré</div>
              <div className="truncate">{toastMessage}</div>
            </div>
            <button
              onClick={() => setToastVisible(false)}
              className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-300"
              aria-label="Close toast"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
