import { cn } from '@/lib/utils'
import React from 'react'

export default function PrimaryButton({ disabled, onClick, children }) {
  return (
    <button disabled={disabled}
          className='border border-solid rounded-4xl border-black py-4 px-12 bg-blue-btn text-white text-14 lg:text-xl font-medium capitalize transition duration-300 ease-in-out flex items-center justify-center shadow-xl hover:bg-black hover:text-white hover:shadow-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none'
          onClick={onClick}
        >
          {children}
    </button>
  )
}
