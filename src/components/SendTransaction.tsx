'use client'

import { parseEther } from 'viem'
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import styled from 'styled-components'

import { stringify } from '../utils/stringify'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export function SendTransaction() {
  const { sendTransaction } = useSendTransaction()

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransactionReceipt()

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const address = formData.get('address') as string
          const value = formData.get('value') as `${number}`
          sendTransaction({
            to: address,
            value: parseEther(value),
          })
        }}
      >
        <div>Send ETH</div>
        <Input name="address" placeholder="Address" />
        <Input name="value" placeholder="Value (Ether)" />
        <Button type="submit">Send</Button>
      </Form>
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
    </>
  )
}
