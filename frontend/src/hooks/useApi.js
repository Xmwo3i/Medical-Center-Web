import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * useApi — fetch data from an API function.
 *
 * @param {Function} apiFn   — the API call e.g. () => scanApi.getAll(params)
 * @param {Array}    deps    — re-fetch when any of these change (like useEffect deps)
 *
 * Returns { data, loading, error, refetch }
 *
 * Key fix: apiFn is called directly inside the effect, not wrapped in
 * useCallback, to avoid infinite re-render loops caused by changing
 * function references.
 */
export function useApi(apiFn, deps = []) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // Keep a ref to the latest apiFn so the effect always calls the current version
  // without needing it in the dependency array
  const apiFnRef = useRef(apiFn)
  apiFnRef.current = apiFn

  const run = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFnRef.current()
      setData(res.data)
    } catch (err) {
      if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
        setError(
          err?.response?.data?.message ||
          err.message ||
          'خطایی رخ داد'
        )
      }
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    run()
  }, [run])

  return { data, loading, error, refetch: run }
}

/**
 * useMutation — for user-triggered POST/PUT/DELETE calls.
 * Returns { mutate, loading, error, data }
 */
export function useMutation(apiFn) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const mutate = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFn(...args)
      setData(res.data)
      return res.data
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        'خطایی رخ داد'
      setError(msg)
      throw new Error(msg)
    } finally {
      setLoading(false)
    }
  }, [apiFn])

  return { mutate, loading, error, data }
}
