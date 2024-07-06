'use client'

import { BaseError } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

import { daiContractConfig } from './contracts'
import { stringify } from '../utils/stringify'

export function WriteContract() {
  // random address for testing, replace with contract address that you want to allow to spend your tokens
  const spender = "0x358De5535f6B85F18afc2908aEB4f7EEf6376aE0"

  const { write, data, error, isLoading, isError } = useContractWrite({
    ...daiContractConfig,
    functionName: 'approve',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <>
      <h3>Approve allowance</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const amount = formData.get('amount') as string
          write({
            args: [spender, BigInt(amount)],
          })
        }}
      >
        <input name="amount" type="number" placeholder="allowance amount" />
        <button disabled={isLoading} type="submit">
          Approve
        </button>
      </form>

      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  )
}
