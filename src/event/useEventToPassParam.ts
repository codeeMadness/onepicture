import { useEffect } from "react"

// Direct dispatch function - dispatches event immediately with params
export const dispatchEventWithParams = <T>(eventName: string, params: T) => {
  const customEvent = new CustomEvent(eventName, { detail: params })
  window.dispatchEvent(customEvent)
}


export const useEventToPassParams = <T>(
  eventName: string,
  handler: (params: T) => void,
  deps: React.DependencyList = []
) => {
  useEffect(() => {
    const listener = (event: CustomEvent<T>) => {
      handler(event.detail)
    }

    window.addEventListener(eventName, listener as EventListener)

    return () => {
      window.removeEventListener(eventName, listener as EventListener)
    }
  }, [eventName, ...deps])
}