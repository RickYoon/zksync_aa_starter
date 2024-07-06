'use client'

import { useWalletClient } from 'wagmi'

export function Signer() {
  const { data } = useWalletClient()
  console.log("data signer", data)

  return (
    <div>
      {/* {data?} */}
    </div>
  )
}
