'use client'

import { useEffect } from 'react'

export function Tracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('tracked')) return
    sessionStorage.setItem('tracked', '1')
    fetch('/api/stats/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname }),
    }).catch(() => {})
  }, [])
  return null
}