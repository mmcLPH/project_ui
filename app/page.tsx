'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()
  return (
    <div>
      <h1>this is home page</h1>
      <div>
        <button onClick={() => {
          router.push('./login')
        }}>
          login page
        </button>
      </div>
      <div>
        <button onClick={() => {
          router.push('./councildashboard')
        }}>
          council dashboard page
        </button>
      </div>
      <div>
        <button onClick={() => {
          router.push('./councildashboard/binmanage')
        }}>
          bin manage page
        </button>
      </div>
    </div>
  )
}

export default Home