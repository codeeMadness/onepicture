import { useEffect } from 'react'

export const useEventToTriggerAction = ({
  events,
  triggerFn,
}: {
  events: string[],
  triggerFn(): void
}) => {
  useEffect(() => {
    events.forEach(event => {
      window.addEventListener(event, triggerFn)
    })

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, triggerFn)
      })
    }
  }, [triggerFn])
}

export const describeEvents = (events: Event[]) => {
  events.forEach(event => {
    window.dispatchEvent(event)
  })
}