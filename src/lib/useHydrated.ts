import { useEffect, useState } from 'react'

/**
 * Returns true only after the component has mounted on the client.
 * Use this to gate any rendering that reads from persisted Zustand state
 * to avoid SSR hydration mismatches.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    setHydrated(true)
  }, [])
  return hydrated
}
