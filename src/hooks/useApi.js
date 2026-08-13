import { useState, useEffect } from 'react'
import api from '../api/axios'

export function useApi(url, options = {}) {
  const { manual = false, params = null } = options
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(!manual)
  const [error, setError] = useState(null)

  const fetchData = async (overrideParams) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get(url, {
        params: overrideParams || params,
      })
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!manual) {
      fetchData()
    }
  }, [url])

  return { data, loading, error, refetch: fetchData }
}

export function usePost(url) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)

  const postData = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post(url, payload)
      setResponse(res.data)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { postData, loading, error, response }
}