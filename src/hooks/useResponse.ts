import { useCallback,useState } from 'react'

export const Response = {
  NotRequest: 0,
  Success: 1,
  Error: 2,
} as const

const useResponse = () => {
  const [response, setResponse] = useState<number>(Response.NotRequest)
  const setSuccess = useCallback(() => setResponse(Response.Success), [])
  const setError = useCallback(() => setResponse(Response.Error), [])
  const reset = useCallback(() => setResponse(Response.NotRequest), [])
  return [response, setSuccess, setError, reset] as const
}

export default useResponse